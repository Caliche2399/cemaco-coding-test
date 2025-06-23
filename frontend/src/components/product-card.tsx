import type { ReactElement } from "react"
import { Card, Row, Col } from "react-bootstrap"
import type { ProductType } from "../types"
import { CiShoppingCart } from "react-icons/ci";

interface ProductCardProps {
    product: ProductType[]
}

export const ProductCard = ({product}: ProductCardProps): ReactElement => {
  if(!product) return <></>;
  const filteredProducts = product ? product.filter(p => p.inventario >= 5) : [];

  return (
    <Row>
      {filteredProducts.map((p, index) => (
        <Col key={index + "producto"} sm={6} md={6} lg={6} xl={6}>
          <Card className="mb-4 rounded-5">
            <Card.Img src={"/assets/foto-no-disponible.png"} width={50} height={200} alt={p.nombre}/>
            <Card.Header>
              <Card.Title>{p.nombre}</Card.Title>
            </Card.Header>
            <Card.Body>{p.descripcion}</Card.Body>
            <Card.Footer className="d-flex flex-column gap-2 align-items-start p-4">
                <span className="small">24 horas dentro de la capital</span>
                <button className="cards-button rounded-5 px-3 d-flex justify-content-center align-items-center">
                    Agregar <CiShoppingCart size={20} className="ms-2"/>
                </button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
