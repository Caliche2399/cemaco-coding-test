import {useEffect, useState, type ReactElement} from "react";
import type { ProductType } from "../types";
import { ProductCard } from "./product-card";

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
        
        {
          productos && (
            <ProductCard product={productos}/>
          )
        }
      </div>
    </div>
  );
}