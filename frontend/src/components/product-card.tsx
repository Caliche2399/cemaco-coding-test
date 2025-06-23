import type { ReactElement } from "react"
import { Card } from "react-bootstrap"
import type { ProductType } from "../types"

interface ProductCardProps {
    product: ProductType[]
}

export const ProductCard = ({product}: ProductCardProps): ReactElement => {

    return (
        <>
            {   
                product
                .filter((p) => p.inventario > 5)
                .map((p, index) => {
                    <Card>

                    </Card>
                })
            }
        </>
    )
}