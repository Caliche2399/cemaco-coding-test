import type {ReactElement} from "react";
import { BsChatRight } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

export const FooterComponent = (): ReactElement => {

  return (
    <div className="w-100">
      {/*Blue Footer Section*/}
      <div className="d-flex blue-container py-2 px-5 justify-content-center align-items-center">
        <div className="d-flex justify-content-between align-items-center w-100" style={{maxWidth: "1200px"}}>
          <div className="d-flex gap-2 justify-content-center align-items-center text-center">
            <img src="../../public/assets/footer/TiendasFooterNew.png" alt="Store icon" height={30} width={30}/>
            <span>Tiendas</span>
          </div>
          <div className="d-flex gap-2 justify-content-center align-items-center text-center">
            <CiMail size={"30"}/>
            <span>tusamigos@cemaco.com</span>
          </div>
          <div className="d-flex gap-2 justify-content-center align-items-center text-center">
            <FaWhatsapp size={"30"}/>
            <span>Compra Por Whatsapp</span>
          </div>
          <div className="d-flex gap-2 justify-content-center align-items-center text-center">
            <img src="../../public/assets/footer/ServicioFooterNew.png" alt="call support icon" height={30} width={30}/>
            <span>(502) 2499-9990</span>
          </div>
          <div className="d-flex gap-2 justify-content-center align-items-center text-center">
            <BsChatRight size={"30"}/>
            <span>Chat en línea</span>
          </div>
        </div>
      </div>
      {/*Gray Section*/}
      <div className="d-flex gray-container py-2 px-5 justify-content-center align-items-center h-auto py-4">
        <div className="d-flex justify-content-between w-100" style={{maxWidth: "1400px"}}>
          <div className="d-flex flex-column">
            <h3 style={{fontSize: "16px"}} className="fw-semibold mb-2">Servicios</h3>
            <span>Instalaciones</span>
            <span>Blog</span>
            <span>Tiendas</span>
            <span>Privilegio</span>
            <span>Servicio a Empresas</span>
            <span>Bodas</span>
            <span>Actividades</span>
          </div>
          <div className="d-flex flex-column">
            <h3 style={{fontSize: "16px"}} className="fw-semibold mb-2">Nuestros Valores</h3>
            <span>Sostenibilidad</span>
            <span>Garantía Total</span>
            <span>Sistema B</span>
          </div>
          <div className="d-flex flex-column mx-2">
            <h3 style={{fontSize: "16px"}} className="fw-semibold mb-2">Venta en línea</h3>
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
                <img src="../../public/assets/footer/empresaCertificadaNew.png" alt="empresaCertificada"/>
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
              <img src={"../../public/assets/footer/value.png"} width={143} height={143} alt={"reseñas"}/>
              <button className="footer-button rounded-5">
                Suscribirme
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*White Section*/}
      <div className="d-flex py-2 px-5 justify-content-center align-items-center h-auto">
        <div className="d-flex w-100" style={{maxWidth: "1400px"}}>
          <a className="text-decoration-underline text-black small">Privacidad</a>
          <a className="text-decoration-underline text-black ms-5 small w-100" style={{maxWidth: "200px"}}>Términos y Condiciones</a>
          <div className="text-end w-100">
            <img src={"../../public/assets/footer/iconotiktokcemaco.png"} className="me-1" width={28} alt="tik tok logo"/>
            <img src={"../../public/assets/footer/FacebookFooterNew.png"} width={28} className="me-1" alt="facebook logo"/>
            <img src={"../../public/assets/footer/InstagramFooterNew.png"} className="me-1" width={28} alt="insta logo"/>
            <img src={"../../public/assets/footer/twitter.png"} width={28} className="me-1" alt="twitter logo"/>
            <img src={"../../public/assets/footer/YouTubeFooterNew.png"} width={28} className="me-1" alt="youtube logo"/>
            <img src={"../../public/assets/footer/PinterestFooterNew.png"} width={28} className="me-1" alt="pintereslogo"/>
          </div>
        </div>
      </div>
    </div>
  )
}