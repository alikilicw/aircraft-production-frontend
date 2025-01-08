export type User = {
    id: number
    username: string
    email: string
    gender: string
    phone: string
    isActive: boolean
    password?: string
    createdAt: Date
    updatedAt: Date
}
