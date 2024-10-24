export class UsuarioModelo {
    id?: String;
    Email?: String;
    Password?: String;
    idPersona?: number;
    user?: UsuarioModelo;
    token?: String;
    isLoggedIn: boolean = false;
    rolId: string = "";
    rol: String = ""; 
}