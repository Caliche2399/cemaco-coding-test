import {useEffect, useState, type ReactElement} from "react";
import type { ProductType } from "../types";
import { ProductCard } from "./product-card";
import {Breadcrumb} from "react-bootstrap";

export const MainComponent = (): ReactElement => {

  const [productos, setProductos] = useState<ProductType[]>();

  useEffect(() => {
    const getProducts = async() =>{
      try {  
        const response = await fetch("http://localhost:3000/productos");
        setProductos(await response.json() as ProductType[]);
      } catch (error) {
        console.error(error)
        setProductos([])
      }
    }

    getProducts();
  }, []);

  return (
    <div className="py-5">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="fw-bold pb-4">Cocina y Mesa</h1>
        <div className="w-100 d-flex flex-column">
          <img src="/assets/cocina-y-casa.png" alt="cocina y casa imagen" className="object-fit-cover my-3 w-100" style={{maxWidth: "1300px"}}/>
          <Breadcrumb>
            <Breadcrumb.Item href="#" className="small">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item className="small" href="https://www.cemaco.com/gtmnuestra-cocinaymesa?map=productclusternames">
              gtmnuestra-cocinaymesa
            </Breadcrumb.Item>
            <Breadcrumb.Item className="small" active>Cocina y Casa</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        {
          productos && (
            <ProductCard product={productos}/>
          )
        }
      </div>
    </div>
  );
}