import { Empresa } from '../empresas/empresa';
export class User {
  id!:number;
  name!: string;
  surName!:string;
  email!:string;
  password?:string;
  password2!:string;
  rol!:string;
  phone!:string;
  active:boolean;
  updateUser!:Date;
  foto!:string;
  tutorReponsable!:number;
  profesorReponsable!:number;
  empresa!:Empresa;

  constructor(){
    this.active=true;

  }

}
