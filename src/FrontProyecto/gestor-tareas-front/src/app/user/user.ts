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

  constructor(){
    this.active=true;

  }

}
