import type {ReactElement} from "react";
import { BsChatRight } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import {Accordion} from "react-bootstrap";

export const FooterComponent = (): ReactElement => {

  return (
    <div className="w-100 d-flex flex-column ">
      {/*Blue Footer Section*/}
      <div className="d-flex blue-container py-2 px-lg-5 justify-content-start justify-content-lg-center ">
        <div className="d-flex justify-content-start px-3 justify-content-lg-between align-items-start align-items-lg-center w-100 flex-column flex-lg-row gap-3" style={{maxWidth: "1200px"}}>
          <div className="d-flex gap-2 justify-content-start align-items-center">
            <img src="/assets/footer/TiendasFooterNew.png" alt="Store icon" height={30} width={30}/>
            <span>Tiendas</span>
          </div>
          <div className="d-flex gap-2 justify-content-start align-items-center">
            <CiMail size={"30"}/>
            <span>tusamigos@cemaco.com</span>
          </div>
          <div className="d-flex gap-2 justify-content-start align-items-center">
            <FaWhatsapp size={"30"}/>
            <span>Compra Por Whatsapp</span>
          </div>
          <div className="d-flex gap-2 justify-content-start align-items-center">
            <img src="/assets/footer/ServicioFooterNew.png" alt="call support icon" height={30} width={30}/>
            <span>(502) 2499-9990</span>
          </div>
          <div className="d-flex gap-2 justify-content-start align-items-center">
            <BsChatRight size={"30"}/>
            <span>Chat en línea</span>
          </div>
        </div>
      </div>
      {/*Gray Section*/}
      <div className="d-flex gray-container py-2 px-5 justify-content-center align-items-center h-auto py-4">
        <div className="d-none d-md-flex justify-content-between w-100 flex-column flex-lg-row" style={{maxWidth: "1400px"}}>
          <div className="d-flex flex-column">
            <h3 style={{ fontSize: "16px" }} className="fw-semibold mb-2">Servicios</h3>
            <span>Instalaciones</span>
            <span>Blog</span>
            <span>Tiendas</span>
            <span>Privilegio</span>
            <span>Servicio a Empresas</span>
            <span>Bodas</span>
            <span>Actividades</span>
          </div>

          <div className="d-flex flex-column">
            <h3 style={{ fontSize: "16px" }} className="fw-semibold mb-2">Nuestros Valores</h3>
            <span>Sostenibilidad</span>
            <span>Garantía Total</span>
            <span>Sistema B</span>
          </div>

          <div className="d-flex flex-column mx-2">
            <h3 style={{ fontSize: "16px" }} className="fw-semibold mb-2">Venta en línea</h3>
            <span>Retirar en tienda</span>
            <span>Métodos de pago</span>
            <span>Preguntas frecuentes</span>
            <span>Descargar aplicación</span>
          </div>
          <div className="d-flex flex-column">
            <h3 style={{fontSize: "16px"}} className="fw-semibold mb-2">Grupo Cemaco</h3>
            <span>Únete a nuestro equipo</span>
            <span>Sobre nosotros</span>
            <span>Deseas ser proveedor</span>
            <span>Juguetón</span>
            <span>Bebé Juguetón</span>
          </div>
          <div className="d-flex justify-content-end w-100" style={{maxWidth: "550px"}}>
            <div className="d-flex flex-column">
              <section className="d-flex gap-4 mx-4">
                <img src="/assets/footer/empresaCertificadaNew.png" alt="empresaCertificada"/>
                <span className="d-flex flex-column me-5">
                  <span className="fw-semibold big">
                    Somos una empresa B
                  </span>
                  <span style={{fontSize: "12px"}}>
                    Estamos orgullosos de ser reconocidos por los más altos estándares de sostenibilidad social y ambiental.
                  </span>
                  <a className="fw-semibold text-decoration-underline text-black">
                    Conoce más
                  </a>
                </span>
              </section>
              <input className="rounded-5 footer-input mt-4 me-2 px-3" />
            </div>
            <div className="d-flex flex-column">
              <img src={"/assets/footer/value.png"} width={143} height={143} alt={"reseñas"}/>
              <button className="footer-button rounded-5">
                Suscribirme
              </button>
            </div>
          </div>
        </div>

        {/* Versión Mobile (accordion) */}
        <div className="d-block d-md-none">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Servicios</Accordion.Header>
              <Accordion.Body>
                <span className="d-block mb-1">Instalaciones</span>
                <span className="d-block mb-1">Blog</span>
                <span className="d-block mb-1">Tiendas</span>
                <span className="d-block mb-1">Privilegio</span>
                <span className="d-block mb-1">Servicio a Empresas</span>
                <span className="d-block mb-1">Bodas</span>
                <span className="d-block mb-1">Actividades</span>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Nuestros Valores</Accordion.Header>
              <Accordion.Body>
                <span className="d-block mb-1">Sostenibilidad</span>
                <span className="d-block mb-1">Garantía Total</span>
                <span className="d-block mb-1">Sistema B</span>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Venta en línea</Accordion.Header>
              <Accordion.Body>
                <span className="d-block mb-1">Retirar en tienda</span>
                <span className="d-block mb-1">Métodos de pago</span>
                <span className="d-block mb-1">Preguntas frecuentes</span>
                <span className="d-block mb-1">Descargar aplicación</span>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Grupo Cemaco</Accordion.Header>
              <Accordion.Body>
                <span className="d-block mb-1">Únete a nuestro equipo</span>
                <span className="d-block mb-1">Sobre nosotros</span>
                <span className="d-block mb-1">Deseas ser proveedor</span>
                <span className="d-block mb-1">Juguetón</span>
                <span className="d-block mb-1">Bebé Juguetón</span>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={"/assets/footer/value.png"} width={143} height={143} alt={"reseñas-moviles"}/>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <img src="/assets/footer/empresaCertificadaNew.png" alt="empresaCertificada" width={60} height={60} />
              <span className="d-flex flex-column ms-3">
                  <span className="fw-semibold big">
                    Somos una empresa B
                  </span>
                  <span style={{fontSize: "12px"}}>
                    Estamos orgullosos de ser reconocidos por los más altos estándares de sostenibilidad social y ambiental.
                  </span>
                  <a className="fw-semibold text-decoration-underline text-black">
                    Conoce más
                  </a>
                </span>
            </div>
          </div>
        </div>
      </div>
      {/*White Section*/}
      <div className="d-flex py-2 px-5 justify-content-center align-items-center h-auto flex-lg-row flex-column">
        <div className="d-flex w-100 flex-lg-row flex-column" style={{maxWidth: "1400px"}}>
          <a className="text-decoration-underline text-black small">Privacidad</a>
          <a className="text-decoration-underline text-black ms-0 ms-lg-0 small w-100" style={{maxWidth: "200px"}}>Términos y Condiciones</a>
          <div className="text-start text-lg-end mt-2 w-100">
            <img src={"/assets/footer/iconotiktokcemaco.png"} className="me-1" width={28} alt="tik tok logo"/>
            <img src={"/assets/footer/FacebookFooterNew.png"} width={28} className="me-1" alt="facebook logo"/>
            <img src={"/assets/footer/InstagramFooterNew.png"} className="me-1" width={28} alt="insta logo"/>
            <img src={"/assets/footer/twitter.png"} width={28} className="me-1" alt="twitter logo"/>
            <img src={"/assets/footer/YouTubeFooterNew.png"} width={28} className="me-1" alt="youtube logo"/>
            <img src={"/assets/footer/PinterestFooterNew.png"} width={28} className="me-1" alt="pintereslogo"/>
          </div>
        </div>
      </div>
    </div>
  )
}