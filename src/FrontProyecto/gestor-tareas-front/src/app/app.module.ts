import { NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';

import { UserComponent } from './user/user.component';
import { UserService} from './user/user.service';
import { FormularioUsersComponent } from './user/formulario-users/formulario-users.component';
import { ListTutorComponent } from './user/list-tutor/list-tutor.component'
import { ListAlumnoComponent } from './user/list-alumno/list-alumno.component'
import { ListProfesorComponent } from './user/list-profesor/list-profesor.component'
import { AddProfesorComponent} from './user/addProfesor/addProfesor.component'
import { AddTutorAlumnoComponent } from './user/addTutorAlumno/addTutorAlumno.component'
import { GestionarLitaAlumnoProfesorComponent } from './user/gestionar-lita-alumno-profesor/gestionar-lita-alumno-profesor.component'
import { GestionarListAlumnoTutorComponent} from './user/gestionar-list-alumno-tutor/gestionar-list-alumno-tutor.component'
import { UnactiveusersComponent } from './user/unactiveusers/unactiveusers.component';
import { PerfilComponent } from './perfil/perfil.component';

import { EmpresaService} from './empresas/empresa.service'
import { EmpresasComponent } from './empresas/empresas.component';
import { FormularioEmpresaComponent } from './empresas/formulario-empresa/formulario-empresa.component';


import { TareasComponent } from './tareas/tareas.component';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import {AccordionModule} from 'primeng/accordion';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import { MessageService } from 'primeng/api';

import {FileUploadModule} from 'primeng/fileupload';
import {PasswordModule} from 'primeng/password';

import {KnobModule} from 'primeng/knob';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'users', component:UserComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'empresas', component:EmpresasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/listaTutor', component:ListTutorComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/listaAlumnos', component:ListAlumnoComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/listaProfesores', component:ListProfesorComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/form', component:FormularioUsersComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'empresas/form', component:FormularioEmpresaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'empresas/form/:id', component:FormularioEmpresaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'empresas', component:EmpresasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/form/:id', component:FormularioUsersComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/unactive', component:UnactiveusersComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/addProfesor/:id', component:AddProfesorComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/addTutor/:id', component:AddTutorAlumnoComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/profesor', component:GestionarLitaAlumnoProfesorComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'PROFESOR'}},
  {path:'users/tutor', component:GestionarListAlumnoTutorComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'TUTOR'}},
  {path:'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent,
    FormularioUsersComponent,
    LoginComponent,
    UnactiveusersComponent,
    HomeComponent,
    PerfilComponent,
    ListTutorComponent,
    TareasComponent,
    EmpresasComponent,
    ListAlumnoComponent,
    ListProfesorComponent,
    GestionarLitaAlumnoProfesorComponent,
    GestionarListAlumnoTutorComponent,
    AddProfesorComponent,
    AddTutorAlumnoComponent,
    FormularioEmpresaComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    AccordionModule,
    BrowserAnimationsModule,
    PanelModule,
    DialogModule,
    MenubarModule,
    FileUploadModule,
    RouterModule.forRoot(routes),
    PasswordModule,
    ReactiveFormsModule,
    KnobModule,
    NgbModule
  ],
  providers: [UserService, MessageService,EmpresaService],
  bootstrap: [AppComponent]
})


export class AppModule { }
