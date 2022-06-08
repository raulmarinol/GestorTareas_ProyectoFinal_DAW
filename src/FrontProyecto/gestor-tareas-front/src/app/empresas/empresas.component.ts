import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresa: Empresa[] = [];
  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];

  selectedEmpresa?: Empresa;
  archivo!: File;

  constructor(private empresaService: EmpresaService, private router: Router,  private messageService: MessageService) { }

  ngOnInit(): void {

    this.empresaService.getEmpresas().subscribe( empresa => this.empresa = empresa )
    this.cols = [

      {field: "id", header: "Id de la Empresa"},
      {field: "nombre", header: "Nombre"},
      {field: "dirrecion", header: "Dirrecion"},
      {field: "telefono", header: "Teléfono"},

    ]
    let table=

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearEditarEmpresa(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-user-edit",
        command: () => this.crearEditarEmpresa(true)
      },
      {
        label: "Borrar",
        icon: "pi pi-trash",
        command: () => this.crearEditarEmpresa(true)
      },
      {
        label: "Ver Alumnos Asignados",
        icon: "pi pi-users",
        //command: () => this.crearEditarEmpresa(true)
      },

    ]

  }

  crearEditarEmpresa(editar: boolean) {

    if (editar) {
      if(this.selectedEmpresa?.id != null) {

        this.router.navigateByUrl('/empresas/form/' + this.selectedEmpresa?.id)
      } else {

        this.messageService.add({severity: 'warning', summary: "Advertencia", detail: 'Seleccione un registro'})
        return;
      }

    } else {

      this.router.navigateByUrl('/empresas/form');
    }
  }


delete(empresa: Empresa): void {
  Swal.fire({
    title: '¿Estas seguro?',
    text: "Borraras a esta empresa!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  }).then((result) => {
    if (result.isConfirmed) {
        this.empresaService.delete(empresa).subscribe({
          next: response => {
            this.selectedEmpresa = response;
          }
        })
        Swal.fire(
          'Empresa Borrado',

        )
        window.location.reload()
    }
  })
}

}
