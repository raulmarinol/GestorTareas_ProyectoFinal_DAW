import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../user';
import { UserService } from '../user.service';
import {  MessageService, MenuItem  } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-gestionar-list-alumno-tutor',
  templateUrl: './gestionar-list-alumno-tutor.component.html',
  styleUrls: ['./gestionar-list-alumno-tutor.component.css']
})
export class GestionarListAlumnoTutorComponent implements OnInit {

  usuarios: User[]=[];
  cols: any[] = [];
  items: MenuItem[] =[];

  selectedUser?: User;

  jwt: JwtHelperService = new JwtHelperService();

  mostrar:boolean=false;
  constructor(private usuarioService: UserService, private router: Router,  private messageService: MessageService) { }

  ngOnInit(): void {

    this.usuarioService.getUserByTutor(this.findIdUser()).subscribe({

      next:(usuarios)=>{
        console.log(this.findIdUser())
        this.usuarios=usuarios;
        this.mostrar=true;
      }
    });

    this.cols = [
      {field: "name", header: "Nombre"},
      {field: "surName", header: "Apellido"},
      {field: "phone", header: "Teléfono"},
      {field: "email", header: "email"},
      {field: "rol", header: "Rol"},

    ]

    this.items = [
      {
        label: "Ver Tareas",
        icon: "pi pi-book",
        //command: () =>   Cambiar que te lleve a ver las tareas del alumno
      },


    ]

  }

  findIdUser(): number {
    let token = sessionStorage.getItem('token')!;

    return this.jwt.decodeToken(token).id;
  }


  crearEditarUsuario(editar: boolean) {

    if (editar) {
      if(this.selectedUser?.id != null) {

        this.router.navigateByUrl('/users/form/' + this.selectedUser?.id)
      } else {

        this.messageService.add({severity: 'warning', summary: "Advertencia", detail: 'Seleccione un registro'})
        return;
      }

    } else {

      this.router.navigateByUrl('users/form');
    }
  }

  darBajaUsuario() {

    if (this.selectedUser == undefined) {
      return;
    }

    this.delete(this.selectedUser)

  }


  delete(usuario: User): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Puedes volverlo a desactivar desde el menú de usuarios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.usuarioService.delete(usuario).subscribe(
            response => {
              this.usuarios=this.usuarios.filter(usr=> usr !== usuario)
            }
          )
          Swal.fire(
            'Usuario Activado',
          )
      }
    })
  }

}
