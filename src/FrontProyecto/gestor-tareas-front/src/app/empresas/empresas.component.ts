import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';
import Swal from 'sweetalert2';
import { MessageService, MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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
        command: () => this.eliminarEmpresa()
      },
      {
        label: "Ver Alumnos Asignados",
        icon: "pi pi-users",
        command: () => this.getUserEmpresa()
      },

    ]

  }
/**
 * Método para  crear/editar las empresas
 * @param editar es boolean para saber si esta la id o no
 * @returns
 */
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

 /**
 * Método para borrar una empresa que llama al metodo delete
 * @param
 * @returns
 */
  eliminarEmpresa() {
    this.delete(this.selectedEmpresa!);
  }

   /**
 * Método para borrar una empresa
 * @param empresa
 * @returns
 */
  delete(empresa: Empresa): void {
    Swal.fire({
      title: '¿Estas seguro de que quieres borrar esta empresa?',
      text: "Este cambio es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {

          this.empresaService.delete(empresa.id).subscribe(
            response => {
              this.empresa=this.empresa.filter(response=> response !== empresa)
            }
          )
          Swal.fire(
            'Empresa borrada',
          )
      }
    })
  }

  getUserEmpresa() {

    if(this.selectedEmpresa?.id != null) {

      this.router.navigateByUrl('users/listaEmpresa/' + this.selectedEmpresa?.id)
    } else {

      this.messageService.add({severity: 'warning', summary: "Advertencia", detail: 'Seleccione un registro'})
      return;
    }
    
  }






}
