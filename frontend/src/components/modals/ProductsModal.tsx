import type {ProductType} from "../../types";
import {Modal, Form, Button} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";

interface ProductsModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  action: string;
  product?: ProductType;
  onSuccess: () => void;
}

export const ProductsModal = (props: ProductsModalProps) => {
  const productFormik = useFormik({
    initialValues: {
      nombre: props.product?.nombre || '',
      descripcion: props.product?.descripcion || '',
      precio: props.product?.precio || '',
      sku: props.product?.sku || '',
      inventario: props.product?.inventario || 0,
      imagen: props.product?.imagen || ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
      descripcion: Yup.string()
        .required('La descripción es requerida')
        .min(10, 'La descripción debe tener al menos 10 caracteres'),
      precio: Yup.number()
        .required('El precio es requerido')
        .positive('El precio debe ser positivo'),
      sku: Yup.string()
        .required('El SKU es requerido')
        .min(5, 'El SKU debe tener al menos 5 caracteres'),
      inventario: Yup.number()
        .required('El inventario es requerido')
        .min(0, 'El inventario no puede ser negativo')
        .integer('El inventario debe ser un número entero'),
      imagen: Yup.string()
        .required('La URL de la imagen es requerida')
        .url('Debe ser una URL válida')
    }),
    onSubmit: async (values) => {
      try {
        const payload = props.action === "edit"
          ? { ...values, id: props.product?.id }
          : values;

        const response = await fetch(
          `http://localhost:3000/productos${props.action === "edit" ? `/${props.product?.id}` : ""}`,
          {
            method: props.action === "add" ? "POST" : "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );
        
        if (response.ok) {
          props.onSuccess();
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        props.setShow(false);
      }
    }
  })
  
  return(
    <Modal show={props.show} onHide={() => props.setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.action === "add" ? "Agregar producto" : "Editar producto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={productFormik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              className="rounded-5"
              onKeyPress={(e) => {
                const allowedChars = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/;
                if (!allowedChars.test(e.key)) {
                  e.preventDefault();
                }
              }}
              value={productFormik.values.nombre}
              onChange={productFormik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              className="rounded-5"
              value={productFormik.values.descripcion}
              onChange={productFormik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              name="precio"
              onKeyPress={(e) => {
                const allowedChars = /^[0-9.]$/;
                const alreadyHasDot = productFormik.values.precio.toString().includes('.');
                if (!allowedChars.test(e.key) || (e.key === '.' && alreadyHasDot)) {
                  e.preventDefault();
                }
              }}
              className="rounded-5"
              value={productFormik.values.precio}
              onChange={productFormik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              className="rounded-5"
              value={productFormik.values.sku}
              onChange={productFormik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Inventario</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="1"
              name="inventario"
              className="rounded-5"
              value={productFormik.values.inventario}
              onChange={productFormik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen URL</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              className="rounded-5"
              value={productFormik.values.imagen}
              onChange={productFormik.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 rounded-5 formulario-button" disabled={productFormik.isSubmitting}>
            {props.action === "add" ? "Agregar" : "Guardar cambios"}
          </Button>
          <Button variant="secondary" className="w-100 rounded-5 mt-3" onClick={() => props.setShow(false)} disabled={productFormik.isSubmitting}>
            Cerrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}