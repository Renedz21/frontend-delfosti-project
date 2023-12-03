export interface Task {
    id: string
    name: string
    description: string
    in_progress: boolean
    completed: boolean
    project_id: string
    created_at: string
    updated_at: string
    deleted_at: string
}