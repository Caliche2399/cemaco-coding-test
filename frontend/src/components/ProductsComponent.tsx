import {type ReactElement, useEffect, useState} from "react";
import type {ProductType, RoleType, UserType} from "../types";
import {Alert, Button, Table} from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {DeleteProductModal} from "./modals/delete-product-modal.tsx";
import {ProductsModal} from "./modals/ProductsModal.tsx";

export const ProductsComponent = (): ReactElement => {
  const [usuario, setUsuario] = useState<UserType>();
  const [rol, setRol] = useState<RoleType>();
  const [productos, setProductos] = useState<ProductType[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductType>({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: "",
    sku: "",
    inventario: 0,
    imagen: ""
  });
  const [action, setAction] = useState<"add" | "edit">("add");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const getProducts = async() =>{
    try {
      const response = await fetch("http://localhost:3000/productos");
      setProductos(await response.json() as ProductType[]);
    } catch (error) {
      console.error(error)
      setProductos([])
    }
  }

  const handleDeleteSuccess = () => {
    setFeedback("Producto eliminado correctamente");
    setShowSuccessAlert(true);
    getProducts();
    setTimeout(() => setShowSuccessAlert(false), 3000); // Ocultar después de 3s
  };

  const handleAddSuccess = () => {
    setFeedback("Producto agregado correctamente");
    setShowSuccessAlert(true);
    getProducts();
    setTimeout(() => setShowSuccessAlert(false), 3000);
  }

  const handleEditSuccess = () => {
    setFeedback("Producto editado correctamente");
    setShowSuccessAlert(true);
    getProducts();
    setTimeout(() => setShowSuccessAlert(false), 3000);
  }

  useEffect(() => {
    const getUser = async() =>{
      try {
        const user = localStorage.getItem('identifier');
        const res = await fetch(`http://localhost:3000/usuarios/${user}`);
        if (!res.ok) throw new Error('Error al obtener los datos');

        const data = await res.json();
        setUsuario(data[0]);

        const rol = await fetch(`http://localhost:3000/roles/${data[0].rol_id}`);
        setRol((await rol.json())[0] as RoleType);
      } catch (error) {
        console.error(error)
        setUsuario(undefined);
      }
    }
    getUser();
    getProducts();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center w-100 flex-column py-5">
      <h1>
        Hola! {usuario?.nombre as string}
      </h1>
      <p>Desde aquí podrás gestionar los productos que serán mostrados en el sitio principal</p>

      {showSuccessAlert && (
        <Alert variant="success" className="mt-3">
          {feedback}
        </Alert>
      )}

      {
        rol?.rol === "Administrador" && (
          <Button className="rounded-5 formulario-button mb-4" onClick={()=> {
            setSelectedProduct({
              id: 0,
              nombre: "",
              descripcion: "",
              precio: "",
              sku: "",
              inventario: 0,
              imagen: ""
            });
            setAction("add");
            setShowProductModal(true);
          }}>
            Agregar Producto
          </Button>
        )
      }

      <div className="table-responsive w-100 rounded-4">
        <Table striped bordered hover responsive="sm" className="rounded-4 overflow-hidden">
          <thead className="table-dark">
          <tr>
            <th style={{ whiteSpace: "nowrap" }}>Nombre</th>
            <th>Descripción</th>
            <th style={{ whiteSpace: "nowrap" }}>Inventario</th>
            <th style={{ whiteSpace: "nowrap" }}>Precio</th>
            <th style={{ whiteSpace: "nowrap" }}>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {productos && productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td style={{ whiteSpace: "nowrap" }} className="text-center">{producto.nombre}</td>
                <td style={{ wordBreak: "break-word", minWidth: 100 }} className="text-center">{producto.descripcion}</td>
                <td style={{ whiteSpace: "nowrap" }} className="text-center">{producto.inventario} Unidades</td>
                <td style={{ whiteSpace: "nowrap" }}>Q {Number(producto.precio).toFixed(2)}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="w-100"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(producto);
                        setAction("edit");
                        setShowProductModal(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="w-100"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(producto);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No hay productos disponibles.
              </td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>

      <DeleteProductModal
        product={selectedProduct as ProductType}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onDeleteSuccess={handleDeleteSuccess}
      />

      <ProductsModal
        show={showProductModal}
        product={selectedProduct}
        setShow={setShowProductModal}
        action={action}
        onSuccess={action === "add"? handleAddSuccess: handleEditSuccess}
      />
    </div>
  );
}