import {Navbar, Dropdown} from 'react-bootstrap';
import {FaRegUserCircle, FaSignOutAlt} from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {type ReactElement, useEffect, useState} from "react";
import {LoginComponent} from "./login-component.tsx";
import { FaTruck } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";

const NavbarComponent = (): ReactElement => {

  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [showModal]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('identifier');
    setIsLoggedIn(false);
    window.location.href = '/'; // Redirige al home o recarga
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && scrolled) {
        setScrolled(false);
      } else if (window.scrollY > 0 && !scrolled) {
        setScrolled(true);
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
              <div className="w-100 grey-section d-flex justify-content-center align-items-center py-3" style={{maxWidth: "1200px"}}>
                <span className="fw-semibold small">
                  Haz más con tu bono 14
                </span>
                <a className="ms-2 text-decoration-underline text-black small">Compra aquí</a>
              </div>
            </div>
            <div className="w-100 justify-content-center align-items-center d-flex flex-column flex-lg-row">
              <div className="w-100 d-flex align-items-center" style={{maxWidth: "600px"}}>
                <button className="cemaco-button">
                  <img src="/assets/navbar/cemacoGrande.png" width={90} alt="logo-cemaco"/>
                </button>
                <button className="jugueton-button">
                  <img src="/assets/navbar/juguetonLogoOficial.png" width={90} alt="logo-cemaco"/>
                </button>
              </div>
              <div className="d-flex align-items-center gap-2 gap-lg-0 py-3 py-lg-0 justify-content-lg-end flex-column flex-lg-row">
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
          <a className='navbar-brand px-2 px-lg-0 me-0 me-lg-2'>
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
          <input className="w-100 rounded-5 p-1 d-none d-md-block" style={{maxWidth: "900px", height: "35px"}}/>
          <div className="d-flex ps-lg-0 justify-content-end w-100 px-2" style={{maxWidth: "350px"}}>
            {
              isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white text-decoration-none d-flex align-items-center bg-transparent border-0"
                >
                  <FaSignOutAlt className="me-2 small" size={20} />
                  <span className="d-none d-md-flex">
                    Cerrar Sesión
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-white text-decoration-none d-flex align-items-center bg-transparent border-0"
                >
                  <FaRegUserCircle className="me-2 small" size={20} />
                  <span className="d-none d-md-flex">
                    Iniciar Sesión
                  </span>
                </button>
              )
            }
            <a className="text-white ms-2 ms-lg-3">
              <FaShoppingCart size={20} />
            </a>
          </div>
        </div>

        <input className="w-100 rounded-5 my-3 d-md-none" style={{maxWidth: "900px", height: "35px"}}/>
      </Navbar>

      {
        !scrolled && (
          <div className="d-flex navbar-bg w-100 justify-content-lg-center justify-content-start align-items-center">
            <div className="d-flex gap-3 w-100 flex-column flex-lg-row" style={{maxWidth: "1400px"}}>
              <div className="w-100 d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-start px-3" style={{maxWidth: "700px"}}>
                <Dropdown className="custom-dropdown me-4">
                  <Dropdown.Toggle className="custom-dropdown-toogle px-0">
                    Departamentos
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Automóviles</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Hogar y Cocina</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Electricidad</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <span className="text-white me-0 me-lg-5 mb-2 mb-lg-0">Bodas y Registros</span>
                <span className="text-white me-0 me-lg-5 mb-2 mb-lg-0">Revistas</span>
                <span className="text-white me-0 me-lg-5 mb-2 mb-lg-0">Privilegio</span>
              </div>
              <div className="d-flex w-100 align-items-center justify-content-lg-end ps-3 mx-lg-0 py-2 py-lg-0">
                <span className="text-white small me-3">
                  <FaTruck className="me-2" size={25}/>
                  Entrega Rápida
                </span>
                <span className="text-white small me-5">
                  <SiHomeassistantcommunitystore className="me-2" size={25} />
                  Retira en tiendas
                </span>
              </div>
            </div>
          </div>
        )
      }

      <LoginComponent showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default NavbarComponent;