import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductManager from "./pages/cadastro"
import EditProduct from './components/editProducts'

function App() {

 
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ProductManager()} />
        <Route path="/products/:id/edit" Component={EditProduct} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
