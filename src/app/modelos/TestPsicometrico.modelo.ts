import { ConsultaModelo } from "./Consulta.modelo";

export class TestPsicometricoModelo{
    id: number = 0 ;
    Nombre?:String;
    Descripcion?: String;
    Consultas: ConsultaModelo = new ConsultaModelo();
    token?: String;
    test?: TestPsicometricoModelo;
    consultaId? : number;
    consultaTestId? : number;
}