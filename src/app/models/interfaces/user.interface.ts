export interface User {
    id: string
    name: string
    email: string
    roles: string[]
}

export interface IUser {
    id: string
    name: string
    email: string
    isActive: boolean
    roles: string[]
    createdAt: string
    updatedAt: string
}