import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Tarea } from './tarea';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TareaService {

  private urlEndPoint:string = 'http://localhost:8080/tareas';
  private httpHeaders=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');
  private header=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');
  jwt: JwtHelperService = new JwtHelperService();

constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

getTareas(): Observable<Tarea[]>{
  return this.http.get<Tarea[]>(this.urlEndPoint,{headers: this.httpHeaders});
}

create(tarea: Tarea): Observable<Tarea>{
   //Obtengo el usuario de session 
   let token = sessionStorage.getItem('token')!;
   let idUsuario= this.jwt.decodeToken(token).id; 
   
   return this.http.put<Tarea>(`${this.urlEndPoint}/?idUser=${idUsuario}`, tarea, {headers:this.header}).pipe(
 
    map((response:any) => response.tarea as Tarea ),
    catchError(e=>{
      if(e.status==400){
        return throwError(()=>e);
      }
      this.router.navigate(['/tareas']);
      console.error(e.error.mensaje);
      Swal.fire('Error al crear',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
}

getTareaByUser(id:number): Observable<Tarea[]>{

  let path = this.urlEndPoint + "/user/" + id;

    return this.http.get<Tarea[]>(path,{headers:this.header});
}

getTarea(id: number): Observable<Tarea>{
  return this.http.get<Tarea>(`${this.urlEndPoint}/${id}`,{headers:this.header}).pipe(
  catchError(e=>{
    this.router.navigate(['/tareas']);
    console.error(e.error.mensaje);
    Swal.fire('Error al editar',e.error.mensaje, 'error');
    return throwError(()=>e);
  })
  );
}

update(tarea: Tarea): Observable<Tarea>{

  

  return this.http.put<Tarea>(`${this.urlEndPoint}/${tarea.id}`,tarea, {headers: this.httpHeaders}).pipe(
    catchError(e=>{
      if(e.status==400){
        return throwError(()=>e);
      }
      this.router.navigate(['/tareas']);
      console.error(e.error.mensaje);
      Swal.fire('Error al actualizar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
}

delete(id: number): Observable<Tarea>{
  return this.http.delete<Tarea>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
    catchError(e=>{
      this.router.navigate(['/tareas']);
      console.error(e.error.mensaje);
      Swal.fire('Error al borrar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
}
}
