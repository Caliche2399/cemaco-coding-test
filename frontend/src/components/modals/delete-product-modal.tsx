import {Modal} from "react-bootstrap";
import type {ProductType} from "../../types";

interface DeleteProductModalProps {
  product: ProductType;
  show: boolean;
  setShow: (show: boolean) => void;
  onDeleteSuccess: () => void;
}

export const DeleteProductModal = (props: DeleteProductModalProps) => {

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${props.product.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        props.setShow(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return(
    <Modal show={props.show} onHide={() => props.setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Está seguro que desea eliminar el producto "{props.product.nombre}"?
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={() => props.setShow(false)}>
          Cancelar
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
      </Modal.Footer>
    </Modal>
  );
}