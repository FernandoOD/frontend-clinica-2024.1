import { PacienteModelo } from "./Paciente.modelo";

export class ConsultaModelo{
    id?: number;
    FechaConsulta?: String;
    NotasConsulta?: String;
    terapeutaId?: number;
    pacienteId?: number;
    pacienteConsulta: PacienteModelo = new PacienteModelo();
}