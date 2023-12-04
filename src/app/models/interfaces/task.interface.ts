import { IProject } from "./project.interface";

export interface ITask {
    id: string,
    nombre: string,
    descripcion: string,
    fechaCreacion: Date,
    estatus: string,
    proyectoId: IProject,
}