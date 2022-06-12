import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { EmpresaService} from '../../empresas/empresa.service';
import { Empresa } from '../../empresas/empresa';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-formulario-users',
  templateUrl: './formulario-users.component.html',
  styleUrls: ['./formulario-users.component.css']
})
export class FormularioUsersComponent implements OnInit {

  usuario!: User;

  titulo:string= "Crear Usuario"
  titulo2:string= "Editar Usuario"

  errores:string[]=[];


  constructor(private usuarioService: UserService,private empresaService: EmpresaService , private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.usuario=new User();
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      console.log(id+" esta es id");
      if (id){
        this.usuarioService.getUser(id).subscribe({
          next: usuario => {
            this.usuario=usuario
       }
      })
      }
    })
  }

  create(): void{;
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

        this.router.navigate(['/users'])
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
