import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Empresa } from './empresa';
;

@Injectable()
export class EmpresaService {

  private urlEndPoint:string = 'http://localhost:8080/empresas';
  private httpHeaders=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');

constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

getEmpresas(): Observable<Empresa[]>{
  return this.http.get<Empresa[]>(this.urlEndPoint,{headers: this.httpHeaders});
}

create(empresa: Empresa): Observable<Empresa>{

    return this.http.post(this.urlEndPoint, empresa, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.empresa as Empresa ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/empresa/list']);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  getEmpresa(id: number): Observable<Empresa>{
    return this.http.get<Empresa>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e=>{
      this.router.navigate(['/empresas']);
      console.error(e.error.mensaje);
      Swal.fire('Error al editar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
  }

  update(empresa: Empresa): Observable<Empresa>{
    return this.http.put<Empresa>(`${this.urlEndPoint}/${empresa.id}`,empresa, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/empresas']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  delete(id: number): Observable<Empresa>{
    return this.http.delete<Empresa>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        this.router.navigate(['/empresas']);
        console.error(e.error.mensaje);
        Swal.fire('Error al borrar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }
  

}
