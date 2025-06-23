import {Navbar, Nav, Dropdown} from 'react-bootstrap';
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {type ReactElement, useEffect, useState} from "react";
import { Link } from 'react-router-dom';

const NavbarComponent = (): ReactElement => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !scrolled) {
        setScrolled(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      {
        !scrolled && (
          <>
            <div className="w-100 justify-content-center align-items-center d-flex grey-section">
              <div className="w-100 grey-section d-flex justify-content-center align-items-center py-3" style={{maxWidth: "1400px"}}>
                <span className="fw-semibold small">
                  Haz más con tu bono 14
                </span>
                <a className="ms-2 text-decoration-underline text-black small">Compra aquí</a>
              </div>
            </div>
            <div className="w-100 justify-content-center align-items-center d-flex">
              <div className="w-100 d-flex align-items-center" style={{maxWidth: "700px"}}>
                <button className="cemaco-button">
                  <img src="/assets/navbar/cemacoGrande.png" width={90} alt="logo-cemaco"/>
                </button>
                <button className="jugueton-button">
                  <img src="/assets/navbar/juguetonLogoOficial.png" width={90} alt="logo-cemaco"/>
                </button>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <span className="text-secondary small me-5">
                  Productos con suscripción
                </span>
                      <span className="text-secondary small me-5">
                  ¿Eres empresa?
                </span>
                      <span className="text-secondary small me-5">
                  Tiendas
                </span>
                      <span className="text-secondary small me-5">
                  Compra x Chat
                </span>
                      <span className="text-secondary small me-5">
                  Compra x Whatsapp
                </span>
              </div>
            </div>
          </>
        )
      }

      <Navbar className="sticky-top navbar-bg d-flex justify-content-center align-items-center" expand="lg">
        <div className="d-flex w-100 align-items-center" style={{maxWidth: "1400px"}}>
          <a className='navbar-brand'>
            {
              !scrolled ? (
                <img src="/assets/navbar/cemacoGrande.png" width={120} alt="logo-cemaco"/>
              ): (
                <img src="/assets/navbar/logoCortoMobile.png" width={40} alt="logo-cemaco"/>
              )
            }
          </a>
          {
            scrolled && (
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle className="custom-dropdown-toogle">
                  Departamentos
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Automóviles</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Hogar y Cocina</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Electricidad</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
          }
          <input className="w-100 rounded-5 p-1" style={{maxWidth: "940px", height: "35px"}}/>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="mr-auto">
              <Link to="/login" className="text-white text-decoration-none d-flex align-items-center">
                <FaRegUserCircle className="me-2" size={24} />
                Iniciar Sesión
              </Link>
              <a className="text-white ms-3">
                <FaShoppingCart size={24}/>
              </a>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar></>
  );
};

export default NavbarComponent;