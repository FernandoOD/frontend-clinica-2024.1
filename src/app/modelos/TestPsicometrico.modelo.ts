import { ConsultaModelo } from "./Consulta.modelo";

export class TestPsicometricoModelo{
    id?: number;
    Nombre?:String;
    Descripcion?: String;
    Consultas: ConsultaModelo = new ConsultaModelo();
    token?: String;
    test?: TestPsicometricoModelo;
    consultaId? : number;
    consultaTestId? : number;
}