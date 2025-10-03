
import './App.css'
import { FormularioDeEvento } from "./assets/Componentes/FomularioDeEvento";

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor}>
      {children}
    </label>
)
}

function CampoDeFormulario({ children }) {
  return (
    <fieldset>
      {children}
    </fieldset>
  )
}

//function no React é Componente
function TituloFormulario(props) {
  return (
    <h2> {props.children} </h2>
  )
}


function App() {

  return (
    <main>
      <header>
        <img src="/logo.png" alt="Logo" />
      </header>

      <section>
        <img src="/banner.png" alt="Banner principal" />
      </section>
      <FormularioDeEvento></FormularioDeEvento>
       <footer>
      <FormularioDeEvento> </FormularioDeEvento>
    </footer>
    </main>

   

  )
}

export default App
