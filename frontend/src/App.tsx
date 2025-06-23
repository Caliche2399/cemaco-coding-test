import {FooterComponent} from "./components/footer-component.tsx";
import NavbarComponent from "./components/navbar-component.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Container} from "react-bootstrap";
import {MainComponent} from "./components/main-component.tsx";

function App() {

  return (
    <Router>
      <NavbarComponent />
      <div id="content">
        <Container>
          <Routes>
            <Route path="/" element={ <MainComponent />} />
            <Route path="/login" element={<></>} />
            <Route path="/products" element={<></>} />
          </Routes>
        </Container>
      </div>
      <FooterComponent />
    </Router>
  )
}

export default App
