import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {Form, Button, InputGroup, Alert, Modal} from 'react-bootstrap';
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface LoginComponentProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export const LoginComponent = ({showModal, setShowModal}: LoginComponentProps) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      identifier: '', // puede ser correo o username
      password: '',
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .required('Correo o nombre de usuario obligatorio')
        .test(
          'is-valid-identifier',
          'Debe ser un correo válido o nombre de usuario (letras y números)',
          value => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const usernameRegex = /^[a-zA-Z0-9_.-]{3,}$/;
            return emailRegex.test(value || '') || usernameRegex.test(value || '');
          }
        ),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMessage(''); // Limpiar mensaje anterior

      try {
        const res = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('identifier', data.usuario);
          setShowModal(false);
          navigate('/products');
        } else {
          setErrorMessage(data.message || 'Error al iniciar sesión');
        }
      } catch (err) {
        console.error('Error al iniciar sesión:', err);
        setErrorMessage('Ocurrió un error al conectar con el servidor.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal onHide={() => setShowModal(false)} show={showModal} size="lg" centered className="modal-bg">
      <Modal.Header closeButton>
        <h2>Iniciar sesión</h2>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center pb-5 w-100">
          <img src="/assets/navbar/logoCortoMobile.png" alt="logo" width={80} height={80} className="mb-4" />
          <Form onSubmit={formik.handleSubmit} className="w-100 px-4" style={{ maxWidth: '400px' }}>
            {errorMessage && (
              <Alert variant="danger" className="text-center">
                {errorMessage}
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="identifier">
              <Form.Label>Correo o nombre de usuario</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="identifier"
                  className="rounded-5"
                  placeholder="ejemplo@correo.com o usuario123"
                  value={formik.values.identifier}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.identifier && !!formik.errors.identifier}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.identifier}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Contraseña"
                  className="rounded-5"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password && !!formik.errors.password}
                />
                {/* Icono de ojo superpuesto */}
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '15px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#6c757d',
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={formik.isSubmitting} className="w-100 rounded-5 formulario-button">
              {formik.isSubmitting ? 'Ingresando...' : 'Entrar'}
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
