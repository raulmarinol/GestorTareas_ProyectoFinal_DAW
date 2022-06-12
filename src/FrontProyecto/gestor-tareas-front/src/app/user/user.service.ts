import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {ResponseEntity} from './responseentity';
import { AuthService } from '../login/auth.service';
import { Empresa } from '../empresas/empresa';

@Injectable()
export class UserService {

  private urlEndPoint:string = 'http://localhost:8080/users';
  private urlEndPointEmpresa:string = 'http://localhost:8080/usersEmpresa';
  private urlEndPointInactivos:string ='http://localhost:8080/users/unactive'
  private urlEndPointDeactivated:string ='http://localhost:8080/users/deac'
  private header=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  uploadPhoto(archivo: File, id: any) {
    let path = "http://localhost:8080/users/upload";

    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    return this.http.post(path, formData, {headers: this.header}).pipe(
      map((response:any) => response.user as User ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    )

  }

  fileUpload(file: File){

    let path = "http://localhost:8080/upload"

    const body = new FormData();
    body.append("file", file);

    return this.http.post(path, body, {headers: this.header});
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.urlEndPoint,{headers:this.header});
  }
  getUsersUnActive(): Observable<User[]>{
    return this.http.get<User[]>(this.urlEndPointInactivos,{headers:this.header});
  }

  getUsersbyRol(rol:string): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlEndPoint}/roles?rol=${rol}`,{headers:this.header});
  }

  getUserByProfesor(id:number): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlEndPoint}/profesor?id=${id}`,{headers:this.header});
  }

  getUserByTutor(id:number): Observable<User[]>{
    return this.http.get<User[]>(`${this.urlEndPoint}/tutor?id=${id}`,{headers:this.header});
  }

  getUserByEmpresaID(id:number): Observable<User[]>{

    let path = this.urlEndPoint + "/empresa/" + id;

    return this.http.get<User[]>(path,{headers:this.header});
  }

  create(user: User): Observable<User>{
    return this.http.post(this.urlEndPoint, user, {headers:this.header}).pipe(
      map((response:any) => response.user as User ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.urlEndPoint}/${id}`,{headers:this.header}).pipe(
    catchError(e=>{
      this.router.navigate(['/users']);
      console.error(e.error.mensaje);
      Swal.fire('Error al editar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
  }

  find(id:number): Observable<User>{
    return this.http.get<User>(`${this.urlEndPoint}/${id}`,{headers:this.header})
  }


  update(user: User): Observable<User>{


    return this.http.put<User>(`${this.urlEndPoint}/${user.id}`, user, {headers:this.header}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  updateEmpresa(user: User): Observable<User>{

    return this.http.put<User>(`${this.urlEndPointEmpresa}/${user.id}?idEmpresa=${user.empresa}`, user, {headers:this.header}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  delete(user:User): Observable<User>{
    let payload=this.authService.getDataToken(this.authService.token);

    return this.http.put<User>(`${this.urlEndPointDeactivated}/${user.id}`, user, {headers:this.header}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al borrar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }






}
