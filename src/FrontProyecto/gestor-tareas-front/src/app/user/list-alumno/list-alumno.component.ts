import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../user';
import { UserService } from '../user.service';
import {  MessageService, MenuItem  } from 'primeng/api';

@Component({
  selector: 'app-list-alumno',
  templateUrl: './list-alumno.component.html',
  styleUrls: ['./list-alumno.component.css']
})
export class ListAlumnoComponent implements OnInit {

  usuarios: User[]=[];
  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];

  selectedUser?: User;

  mostrar:boolean=false;
  constructor(private usuarioService: UserService, private router: Router,  private messageService: MessageService) { }

  ngOnInit(): void {
    this.usuarioService.getUsersbyRol("ALUMNO").subscribe({
      next:(usuarios)=>{
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
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearEditarUsuario(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-user-edit",
        command: () => this.crearEditarUsuario(true)
      },
      {
        label: "Dar de baja",
        icon: "pi pi-trash",
        command: () => this.darBajaUsuario()
      },
      {
        label: "Ver Tareas",
        icon: "pi pi-book",
        command: () =>   this.getUserTareas()
      },
      {
        label: "Asignar Profesor",
        icon: "pi pi-user-edit",
        command: () => this.addProfesor(true)
      },
      {
        label: "Asignar Tutor",
        icon: "pi pi-user-plus",
        command: () => this.addTutor(true)
      },
      {
        label: "Asignar Empresa",
        icon: "pi pi-shopping-bag",
        command: () => this.addEmpresa(true)
      },


    ]
    this.items2 = [
      {
        label: "Usuarios de baja",
        icon: "pi pi-user-minus",
        command: () => this.router.navigateByUrl('/users/unactive')
      }
    ]
  }

  addTutor(editar: boolean){
    if (editar) {
      if(this.selectedUser?.id != null) {

        this.router.navigateByUrl('/users/addTutor/' + this.selectedUser?.id)
      } else {

        this.messageService.add({severity: 'warning', summary: "Advertencia", detail: 'Seleccione un registro'})
        return;
      }

    }
  }

  addEmpresa(editar: boolean){

    if (editar) {
      if(this.selectedUser?.id != null) {

        this.router.navigateByUrl('/users/addEmpresa/' + this.selectedUser?.id)
      } else {

        this.messageService.add({severity: 'warning', summary: "Advertencia", detail: 'Seleccione un registro'})
        return;
      }

    }
  }

  addProfesor(editar: boolean){

    if (editar) {
      if(this.selectedUser?.id != null) {

        this.router.navigateByUrl('/users/addProfesor/' + this.selectedUser?.id)
      } else {

        this.messageService.add({severity: 'warning', summary: "Advertencia", detail: 'Seleccione un registro'})
        return;
      }

    }
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

  getUserTareas() {

    if(this.selectedUser?.id != null) {

      this.router.navigateByUrl('tareas/user/' + this.selectedUser?.id)
    } else {

      this.messageService.add({severity: 'warning', summary: "Advertencia", detail: 'Seleccione un registro'})
      return;
    }

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
