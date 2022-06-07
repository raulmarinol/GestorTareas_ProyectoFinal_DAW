import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users: User[] = [];
  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];
  displayStyle = "none";


  selectedUser?: User;
  archivo!: File;

  constructor(private userService: UserService, private router: Router,  private messageService: MessageService) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe( users => this.users = users )
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
        //command: () =>   Cambiar que te lleve a ver las tareas del alumno
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
    text: "Daras de baja a este usuario!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  }).then((result) => {
    if (result.isConfirmed) {
        this.userService.delete(usuario).subscribe({
          next: response => {
            this.selectedUser = response;
          }
        })
        Swal.fire(
          'Usuario Borrado',

        )
        window.location.reload()
    }
  })
}

 capturarFile(event: any): any {

  const archivoCapturado = event.target.files[0]

  this.archivo = archivoCapturado
}

  subirExcel(){

    this.userService.fileUpload(this.archivo).subscribe({
      next: response => {

        this.router.navigate(['/users'])
        Swal.fire('Insertado', 'Los usuarios han sido insertado con exito', 'success');
        window.location.reload()
      }
    });

  }


}
