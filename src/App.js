import './App.css'
import { Routes, Route } from  'react-router-dom'
import NotFound from './components/NotFound'
import Consola from './components/Consola'
import {Home, Details, Form, Buscar, Start} from './views/index'

function App() {
  //Guardamos en variable para mandarolo como children al componente
  const home = <Home/>
  const details = <Details/>
  const form = <Form/>
  const buscar = <Buscar/>
  const start = <Start/>
  const notFound = <NotFound/>

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Consola>{start}</Consola>}/>
        <Route path='/home' element={<Consola>{home}</Consola>}/>
        <Route path='/details/:id' element={<Consola>{details}</Consola>}/>
        <Route path='/buscar' element={<Consola>{buscar}</Consola>}/>
        <Route path='/create' element={<Consola>{form}</Consola>}/>
        <Route path='*' element={<Consola>{notFound}</Consola>} />
      </Routes>
    </div>
  )
}

export default App
