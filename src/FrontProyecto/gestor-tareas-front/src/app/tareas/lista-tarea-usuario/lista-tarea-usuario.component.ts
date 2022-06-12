import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { Tarea } from '../tarea';
import { TareaService } from '../tarea.service';
import Swal from 'sweetalert2';
import { MessageService, MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lista-tarea-usuario',
  templateUrl: './lista-tarea-usuario.component.html',
  styleUrls: ['./lista-tarea-usuario.component.css']
})
export class ListaTareaUsuarioComponent implements OnInit {

  tarea: Tarea[] = [];
  cols: any[] = [];
  items: MenuItem[] =[];

  selectedTarea?: Tarea;
  archivo!: File;
  jwt: JwtHelperService = new JwtHelperService();

  constructor(private tareaService: TareaService, private router: Router,  private messageService: MessageService) { }

  ngOnInit(): void {

    this.tareaService.getTareaByUser(this.findIdUser()).subscribe( tarea => this.tarea = tarea );
    console.log(this.findIdUser());

    this.tarea.forEach(
      tarea => (tarea.registDate = new Date(tarea.registDate))
    )
    this.cols = [
      {field: "id", header: "Id de la Tarea"},
      {field: "registDate", header: "Fecha"},
      {field: "tiempoTarea", header: "Tiempo"},
      {field: "tareaDesarrollada", header: "Descripcción"},

    ]



    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearEditarTarea(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-user-edit",
        command: () => this.crearEditarTarea(true)
      },
      {
        label: "Borrar",
        icon: "pi pi-trash",
        command: () => this.eliminarTarea()
      },


    ]

  }
/**
 * Método para  crear/editar las tareas
 * @param editar es boolean para saber si esta la id o no
 * @returns
 */
  crearEditarTarea(editar: boolean) {

    if (editar) {
      if(this.selectedTarea?.id != null) {

        this.router.navigateByUrl('/tareas/form/' + this.selectedTarea?.id)
      } else {

        this.messageService.add({severity: 'warning', summary: "Advertencia", detail: 'Seleccione un registro'})
        return;
      }

    } else {

      this.router.navigateByUrl('/tareas/form');
    }
  }

  findIdUser(): number {
    let token = sessionStorage.getItem('token')!;

    return this.jwt.decodeToken(token).id;
  }

 /**
 * Método para borrar una empresa que llama al metodo delete
 * @param
 * @returns
 */
  eliminarTarea() {
    this.delete(this.selectedTarea!);
  }

   /**
 * Método para borrar una tarea
 * @param tarea
 * @returns
 */
  delete(tarea: Tarea): void {
    Swal.fire({
      title: '¿Estas seguro de que quieres borrar esta tarea?',
      text: "Este cambio es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {

          this.tareaService.delete(tarea.id).subscribe(
            response => {
              this.tarea=this.tarea.filter(response=> response !== tarea)
            }
          )
          Swal.fire(
            'Tarea borrada',
          )
      }
    })
  }

}
