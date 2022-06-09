import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Tarea } from './tarea';

@Injectable()
export class TareaService {

  private urlEndPoint:string = 'http://localhost:8080/tareas';
  private httpHeaders=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');
  private header=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');

constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

getTareas(): Observable<Tarea[]>{
  return this.http.get<Tarea[]>(this.urlEndPoint,{headers: this.httpHeaders});
}

create(tarea: Tarea): Observable<Tarea>{

  return this.http.post(this.urlEndPoint, tarea, {headers: this.httpHeaders}).pipe(
    map((response:any) => response.tarea as Tarea ),
    catchError(e=>{
      if(e.status==400){
        return throwError(()=>e);
      }
      this.router.navigate(['/tareas/list']);
      console.error(e.error.mensaje);
      Swal.fire('Error al crear',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
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
