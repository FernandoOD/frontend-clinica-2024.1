export class UsuarioModelo {
    id?: String;
    Email?: String;
    Password?: String;
    IdPersona?: number;
    user?: UsuarioModelo;
    token?: String;
    isLoggedIn: boolean = false;
}