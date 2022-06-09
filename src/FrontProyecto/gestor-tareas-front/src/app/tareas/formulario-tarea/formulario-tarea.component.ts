import { Component, OnInit } from '@angular/core';
import { Tarea } from '../tarea';
import { TareaService } from '../tarea.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.css']
})
export class FormularioTareaComponent implements OnInit {

  tarea!: Tarea;

  titulo:string= "Editar Tarea"
  titulo2:string= "Crear Tarea"

  errores:string[]=[];

  constructor(private tareaService: TareaService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarTarea()
    this.tarea=new Tarea();
  }

  cargarTarea(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      if (id){
        this.tareaService.getTarea(id).subscribe({
          next: tarea => {
            this.tarea=tarea
       }
      })
      }
    })
  }

  create(): void{
    this.tareaService.create(this.tarea).subscribe({
      next: tarea =>{
        this.router.navigate(['/tareas'])
        Swal.fire('Nueva Tarea', `Tarea con ${this.tarea.id} creada con éxito!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);

      }
    }
    )
  }

  update(): void{

    this.tareaService.update(this.tarea).subscribe({
      next: empresa=>{

        this.router.navigate(['/tareas'])
        Swal.fire('Tarea Actualizada', `Tarea ${this.tarea.id}  actualizado con éxtio!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }
    }

    )
  }


}
