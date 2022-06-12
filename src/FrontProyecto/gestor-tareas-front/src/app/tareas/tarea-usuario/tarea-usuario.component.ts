import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Tarea } from '../tarea';
import { TareaService } from '../tarea.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarea-usuario',
  templateUrl: './tarea-usuario.component.html',
  styleUrls: ['./tarea-usuario.component.css']
})
export class TareaUsuarioComponent implements OnInit {

  items2: MenuItem[] =[];
  tarea: Tarea = new Tarea();

  errores:string[]=[];
  jwt: JwtHelperService = new JwtHelperService();

  constructor(private formBuilder: FormBuilder
    , private tareaService: TareaService, private router:Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.getTarea();
      this.tarea = new Tarea();

    }

      formulario: FormGroup = this.formBuilder.group({
      respuesta: [, [ Validators.required] ]
    })

    update() {

      this.tareaService.update(this.tarea).subscribe({
        next: resp => {
          Swal.fire('Respuesta modificada', 'Su respuesta fue modificada con éxito', 'success')
        }
      })

    }

    getTarea() {

        this.tareaService.getTarea(this.findIdUser()).subscribe({
          next: resp => {
            this.tarea = resp

            console.log(this.tarea);

          }
        })
    }

    findIdUser():number {

      return this.jwt.decodeToken(sessionStorage.getItem('token')!).id;
    }



  }
