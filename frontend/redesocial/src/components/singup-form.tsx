import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from 'axios'


export default function SignUpForm({onSuccess}) {
  
 


  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const[price, setPrice] = useState('')
  const [successMessage, setSuccess] = useState('')
 

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    try {
      const response = await axios.post('http://localhost:5000/api/create', {
        name,
        description,
        price
      });
      console.log(response.data)
      e.target.reset()
      onSuccess()
      setSuccess('Cadastro realizado com sucesso!')
      setTimeout(() => {
        setSuccess('')
      
      }, 3000)
      

    } catch(error) {
      console.log(error)
      e.target.reset()

    }
  }



  return (
    <div className="mx-auto mt-10 max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Cadastre o produto</h1>
        <p className="text-gray-500 dark:text-gray-400">Entre com os dados para cadastrar.</p>
      </div>
      {successMessage && <p className="text-center font-extrabold text-indigo-400">{successMessage}</p>}
      <form onSubmit={handleSubmit}>

      
          <div className="space-y-2">
            <Label htmlFor="name">Nome do produto</Label>
            <Input style={{textTransform: "uppercase"}} onChange={(e) => setName(e.target.value.toUpperCase())} id="name" placeholder="french fries" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">descrição</Label>
            <Input style={{textTransform: "uppercase"}} onChange={(e) => setDescription(e.target.value.toUpperCase())} id="description" placeholder="fritas com cheddar e bacon" required type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input style={{textTransform: "uppercase"}} onChange={(e) => setPrice(e.target.value.toUpperCase())} id="price" required type="number" />
          </div>
          
          
        
          <Button type="submit" className=" bg-indigo-400 hover:bg-indigo-900 mt-4 w-full">Cadastrar</Button>
      </form>
    </div>
  )
}