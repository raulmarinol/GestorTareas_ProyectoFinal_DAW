import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Empresa } from '../../empresas/empresa';
import { EmpresaService} from '../../empresas/empresa.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addEmpresa',
  templateUrl: './addEmpresa.component.html',
  styleUrls: ['./addEmpresa.component.css']
})
export class AddEmpresaComponent implements OnInit {

  usuario!: User;
  listaEmpresas: Empresa[]=[];

  titulo:string= "Cambiar empresa asignado"
  titulo2:string= "Cambiar empresa asignado"

  errores:string[]=[];

  constructor(private usuarioService: UserService,private empresaService: EmpresaService ,private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.usuario=new User();
    this.cargarListaEmpresas();
    console.log(this.cargarListaEmpresas()+"aqui toi");
    console.log("aqui toi");
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      if (id){
        this.usuarioService.getUser(id).subscribe({
          next: usuario => {
            this.usuario=usuario

       }
      })
      }
    })
  }

  cargarListaEmpresas(){
    this.empresaService.getEmpresas().subscribe({
      next:(listaEmpresas)=>{
        this.listaEmpresas=listaEmpresas;
        console.log(listaEmpresas);
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
    //let idempresa=this.usuario.empresa

    this.usuarioService.updateEmpresa(this.usuario).subscribe({
      next: usuario=>{

        this.router.navigate(['/users/listaAlumnos'])
        Swal.fire('Usuario Actualizado', `Usuario ${this.usuario.name} ${this.usuario.surName}  actualizado con éxtio!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);
      }


    }

    )
  }


}
