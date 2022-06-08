import { Component, OnInit } from '@angular/core';
import { Empresa } from '../empresa';
import { EmpresaService } from '../empresa.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-empresa',
  templateUrl: './formulario-empresa.component.html',
  styleUrls: ['./formulario-empresa.component.css']
})
export class FormularioEmpresaComponent implements OnInit {

  empresa!: Empresa;

  titulo:string= "Editar Empresa"
  titulo2:string= "Crear Empresa"

  errores:string[]=[];

  constructor(private empresaService: EmpresaService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit():void {
    this.cargarEmpresa()
    this.empresa=new Empresa();
  }

  cargarEmpresa(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      if (id){
        this.empresaService.getEmpresa(id).subscribe({
          next: empresa => {
            this.empresa=empresa
       }
      })
      }
    })
  }

  create(): void{
    this.empresaService.create(this.empresa).subscribe({
      next: empresa =>{
        this.router.navigate(['/empresas'])
        Swal.fire('Nueva Empresa', `Empresa ${this.empresa.nombre} creado con éxito!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);

      }
    }
    )
  }

  update(): void{

    this.empresaService.update(this.empresa).subscribe({
      next: empresa=>{

        this.router.navigate(['/empresas'])
        Swal.fire('Empresa Actualizado', `Empresa ${this.empresa.nombre}  actualizado con éxtio!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }
    }

    )
  }


}
