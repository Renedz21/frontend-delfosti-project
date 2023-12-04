import { ITask } from "./task.interface"
import { IUser } from "./user.interface"

export interface IProject {
    id: string
    nombre: string
    descripcion: string
    fechaCreacion: Date
    usuario?: IUser
    tareas?: ITask[]
}