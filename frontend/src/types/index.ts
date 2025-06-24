export type ProductType = {
    id: number,
    nombre: string,
    descripcion: string,
    precio: string,
    SKU: string,
    inventario: number,
    imagen: string
}

export type UserType = {
    nombre: string,
    email: string,
    rol: number
}

export type RoleType = {
    id: number,
    rol: string,
}