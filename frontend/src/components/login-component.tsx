import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export const LoginComponent = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Correo inválido')
      .required('El correo es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('email', data.email);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Iniciar sesión</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Correo</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className='text-danger' />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className='text-danger' />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Ingresando...' : 'Entrar'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};