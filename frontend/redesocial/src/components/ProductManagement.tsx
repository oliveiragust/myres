import { useState } from "react"
import SignUpForm from "./singup-form"
import ShowProduct from "./showProducts"
import { Button } from "./ui/button"
import Header from "./ui/header/header"
import Sidebar from "./ui/sidebar/sidebar"







export default function ProductManagement() {
  const [isVisible, setIsVisible] = useState (false)
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const fetchDataAndUpdate = async () => {
    setIsVisible(false)
    setTriggerUpdate(prevState => prevState + 1); // Incrementa o valor da variável de estado
  }

  return (
    <div>
      <Header  />
      <div className="mt-5 flex justify-center">
      <Button className="cursor-pointer bg-indigo-400 hover:bg-indigo-900" onClick={() => setIsVisible(!isVisible)}>Cadastrar produtos.</Button>

      </div>
     
      { isVisible ? ( 
        <>
       
        <SignUpForm onSuccess={fetchDataAndUpdate} /> 
        
        </>
        ) : null
      }
      <ShowProduct key={triggerUpdate} /> 
              
    </div>
  )
}