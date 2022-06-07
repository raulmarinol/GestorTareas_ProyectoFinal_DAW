import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addProfesor',
  templateUrl: './addProfesor.component.html',
  styleUrls: ['./addProfesor.component.css']
})
export class AddProfesorComponent implements OnInit {

  usuario!: User;
  listaProfesor: User[]=[];

  titulo:string= "Cambiar profesor asignado"
  titulo2:string= "Cambiar profesor asignado"

  errores:string[]=[];

  contrasena!: string;


  constructor(private usuarioService: UserService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario()
    this.usuario=new User();
    this.cargarListaProfesores();
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

  cargarListaProfesores(){
    this.usuarioService.getUsersbyRol("PROFESOR").subscribe({
      next:(listaProfesor)=>{
        this.listaProfesor=listaProfesor;
        console.log(listaProfesor);
        
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

  compararContrasenia(): boolean{
    if (this.usuario.password==this.usuario.password2){
      return true;
    }else{
      return false;
    }
  }


}
