import {type ReactElement, useState} from "react"
import {Card, Row, Col, Accordion, Form, Offcanvas, Button} from "react-bootstrap"
import type { ProductType } from "../types"
import { CiShoppingCart } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { Range, getTrackBackground } from "react-range";

interface ProductCardProps {
    product: ProductType[]
}

export const ProductCard = ({product}: ProductCardProps): ReactElement => {
  if(!product) return <></>;

  const [show, setShow] = useState(false);
  const filteredProducts = product ? product.filter(p => p.inventario >= 5) : [];
  const [values, setValues] = useState([20, 980]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => setCurrentPage(page);


  const filtros = (
    <div className="d-flex flex-column gap-3 h-100 me-3">
      <Accordion defaultActiveKey="0" alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header><strong>Departamento</strong></Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Mesa (6)" />
            <Form.Check type="checkbox" label="Cocina (4)" />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header><strong>Categoría</strong></Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Vehiculos (6)" />
            <Form.Check type="checkbox" label="Jardinería (4)" />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header><strong>Sub-Categoría</strong></Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Vehiculos (8)" />
            <Form.Check type="checkbox" label="Jardinería (6)" />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header><strong>Color</strong></Accordion.Header>
          <Accordion.Body>
            <Form.Check type="checkbox" label="Negro (6)" />
            <Form.Check type="checkbox" label="Verde (4)" />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header><strong>Criterio Sostenible</strong></Accordion.Header>
          <Accordion.Body>
            {/* Checkboxes de criterios */}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header><strong>Forma</strong></Accordion.Header>
          <Accordion.Body>
            {/* Checkboxes de formas */}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header><strong>Marca</strong></Accordion.Header>
          <Accordion.Body>
            {/* Checkboxes de marcas */}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header><strong>Material</strong></Accordion.Header>
          <Accordion.Body>
            {/* Checkboxes de materiales */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <span className="text-black fw-semibold">Rangos de precios</span>

      <Range
        values={values}
        step={5}
        min={20}
        max={980}
        onChange={(vals) => setValues(vals)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "3px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#101e8d", "#ccc"],
                  min: 20,
                  max: 980
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              backgroundColor: "#101e8d",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA"
            }}
          />
        )}
      />
      <span className="small text-end text-secondary">
        Q{values[0].toFixed(2)} - Q{values[1].toFixed(2)}
      </span>
    </div>
  );

  return (
    <div className="d-flex w-100 bg-product-div gap-3 justify-content-center rounded-3 p-4 flex-lg-row flex-column">
      <div className="d-flex flex-column gap-3 h-100 me-3">
        <div className="d-block d-md-none mb-3">
          <Button variant="outline-secondary rounded-5" onClick={handleShow}>
            Filtrar <IoFilter />
          </Button>
        </div>

        {/* Mostrar directamente en desktop */}
        <div className="d-none d-md-block">
          {filtros}
        </div>

        {/* Offcanvas en móviles */}
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filtros</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {filtros}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className="d-flex flex-column">
        <Row>
          {currentProducts.map((p, index) => (
            <Col key={index + "producto"} sm={4} md={4} lg={4} xl={4}>
              <Card className="mb-4 rounded-5">
                <Card.Img
                  src={p.imagen || "/assets/foto-no-disponible.png"}
                  width={50}
                  height={200}
                  className="p-3 rounded-5"
                  alt={p.nombre}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // previene un bucle infinito
                    target.src = "/assets/foto-no-disponible.png"; // imagen por defecto
                  }}
                />
                <Card.Header className="bg-transparent border-0">
                  <Card.Title>{p.nombre}</Card.Title>
                </Card.Header>
                <div className="d-flex flex-column p-3">
                  <span>{p.descripcion}</span>
                  <span className="mt-3">Q {Number(p.precio).toFixed(2)}</span>
                </div>
                <Card.Footer className="d-flex flex-column gap-2 align-items-start p-4 bg-transparent border-0">
                  <span className="small">24 horas dentro de la capital</span>
                  <button className="cards-button rounded-5 px-3 d-flex justify-content-center align-items-center">
                    Agregar <CiShoppingCart size={20} className="ms-2"/>
                  </button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="w-100 d-flex justify-content-center mt-4">
          <div className="d-flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "primary" : "outline-primary"}
                size="sm"
                className="rounded-5 pagination-button"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>

    </div>

  );
};
