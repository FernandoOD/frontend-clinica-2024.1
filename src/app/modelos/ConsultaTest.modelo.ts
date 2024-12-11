import { TestPsicometricoModelo } from "./TestPsicometrico.modelo";

export class ConsultaTestModelo{
    id?: number;
    consultaId?: number;
    testPsicometricoId? : number [];
    contestado?: boolean;
    testPsicometricos: TestPsicometricoModelo = new TestPsicometricoModelo();
    //consultas? : ConsultaTestModelo = new ConsultaTestModelo();
    testPsicometricoIdOnly? : number;
}