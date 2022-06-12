import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../user';
import { UserService } from '../user.service';
import {  MessageService, MenuItem  } from 'primeng/api';

@Component({
  selector: 'app-list-alumno-empresa',
  templateUrl: './list-alumno-empresa.component.html',
  styleUrls: ['./list-alumno-empresa.component.css']
})
export class ListAlumnoEmpresaComponent implements OnInit {

  usuarios: User[]=[];
  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];

  selectedUser?: User;

  mostrar:boolean=false;

  constructor(private usuarioService: UserService, private router: Router,  private messageService: MessageService,private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.cargarUsuarios();

    this.cols = [
      {field: "name", header: "Nombre"},
      {field: "surName", header: "Apellido"},
      {field: "phone", header: "Teléfono"},
      {field: "email", header: "email"},
      {field: "rol", header: "Rol"},

    ]

  }

  cargarUsuarios(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      console.log(id+" esta es id");
      if (id){
        this.usuarioService.getUserByEmpresaID(id).subscribe({
          next: usuarios => {
            this.usuarios=usuarios
       }
      })
      }
    })
  }

}

