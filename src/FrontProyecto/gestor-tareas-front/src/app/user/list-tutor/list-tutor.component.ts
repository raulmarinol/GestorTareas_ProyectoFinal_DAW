import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../user';
import { UserService } from '../user.service';
import {  MessageService, MenuItem  } from 'primeng/api';

@Component({
  selector: 'app-list-tutor',
  templateUrl: './list-tutor.component.html',
  styleUrls: ['./list-tutor.component.css']
})
export class ListTutorComponent implements OnInit {

  
  usuarios: User[]=[];
  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];

  selectedUser?: User;

  mostrar:boolean=false;
  constructor(private usuarioService: UserService, private router: Router,  private messageService: MessageService) { }

  ngOnInit(): void {
    this.usuarioService.getUsersbyRol("TUTOR").subscribe({
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

      
    ]
    this.items2 = [
      {
        label: "Usuarios de baja",
        icon: "pi pi-user-minus",
        command: () => this.router.navigateByUrl('/users/unactive')
      }
    ]
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
