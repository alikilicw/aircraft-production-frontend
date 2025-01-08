export type Category = {
    id: number
    name: string
    depth: number
    createdAt: Date
    updatedAt: Date
    parentId?: number
}
