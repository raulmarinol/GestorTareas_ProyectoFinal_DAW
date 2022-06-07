import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addTutorAlumno',
  templateUrl: './addTutorAlumno.component.html',
  styleUrls: ['./addTutorAlumno.component.css']
})
export class AddTutorAlumnoComponent implements OnInit {

  usuario!: User;
  listaTutor: User[]=[];

  titulo:string= "Cambiar Tutor asignado"
  titulo2:string= "Cambiar Tutor asignado"

  errores:string[]=[];

  contrasena!: string;


  constructor(private usuarioService: UserService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario()
    this.usuario=new User();
    this.cargarListaTutores();
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      if (id){
        this.usuarioService.getUser(id).subscribe({
          next: usuario => {
            this.usuario=usuario
            console.log(usuario);
            
       }
      })
      }
    })
  }

  cargarListaTutores(){
    this.usuarioService.getUsersbyRol("TUTOR").subscribe({
      next:(listaTutor)=>{
        this.listaTutor=listaTutor;
        console.log(listaTutor);
        
      }
    });
  }

  create(): void{
    this.usuarioService.create(this.usuario).subscribe({
      next: usuario =>{
        this.router.navigate(['/users'])
        Swal.fire('Nuevo usuario', `Usuario ${this.usuario.name} ${this.usuario.surName} creado con éxito! Consulte su email para obtener su contraseña y poder acceder a su cuenta!!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);

      }
    }
    )
  }

  update(): void{

    this.usuarioService.update(this.usuario).subscribe({
      next: usuario=>{

        this.router.navigate(['/users/listaAlumnos'])
        Swal.fire('Usuario Actualizado', `Usuario ${this.usuario.name} ${this.usuario.surName}  actualizado con éxtio!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }


    }

    )
  }

  


}
