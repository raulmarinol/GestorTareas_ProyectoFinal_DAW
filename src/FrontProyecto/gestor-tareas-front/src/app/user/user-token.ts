export interface UserToken {
    id?:number;
    name:String;
    surName:String;
    email:String;
    password?:String;
    password2:String;
    rol:String;
    phone:String;
    active:boolean;
}
