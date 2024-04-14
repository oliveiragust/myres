import {useCallback, useState, useEffect} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { Description } from "@radix-ui/react-dialog";
import { Skeleton } from "./ui/skeleton";

const getProduct = async (productId: any) => {
    const response = await axios.get(`http://localhost:5000/api/${productId}/edit`)
    return response.data
}


export default function EditProduct() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [isLoading, setIsLoading] = useState(false)




    const { id } = useParams()
    const productId = id.toString()

    const [product, setProduct] = useState({})

    const fetchData = useCallback(async () => {
        try{
            setIsLoading(true)
            const data = await getProduct(productId)
            setProduct(data)

        }catch(error) {
            console.error({error: 'Erro'})
        }finally {
            setIsLoading(false)
        }
        

    }, [productId])
    useEffect(() => {
        fetchData(); // Chamar a função fetchData
    }, [fetchData]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateProduct = {
                name: name,
                description: description,
                price: price,
            };
            console.log("Dados do produto a serem enviados:", updateProduct); // Verificar os dados antes de enviar
            const response = await axios.post(`http://localhost:5000/api/${productId}/edit`, updateProduct);
            console.log("Resposta da atualização:", response.data);
            navigate('/');
        } catch (error) {
            console.error({error: 'Erro ao atualizar.'});
            ;
        }
    };

    useEffect(() => {
        if(Object.keys(product).length > 0) {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)

        }
    },[])

  

    return (

            <div className="mx-auto mt-10 max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Editar</h1>
        <p className="text-gray-500 dark:text-gray-400">Entre com os dados para editar</p>
      </div>
    {isLoading && 
        <div className="flex items-center ml-2 mt-2 space-x-4">
              
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    
    }
      <form onSubmit={handleSubmit}>

          {Object.values(product).map((produto) => (

              <>
                  <div className="space-y-2">
                      <Label  htmlFor="name">Nome do produto</Label>
                      <Input  onChange={(e) => setName(e.target.value)} value={produto.name} id="name" placeholder="french fries" required/>
                  </div>
                  <div className="space-y-2">
                      <Label  htmlFor="description">descrição</Label>
                      <Input onChange={(e) => setDescription(e.target.value)} value={produto.description} id="description"  required type="text"/>
                  </div>
                  <div className="space-y-2">
                      <Label  htmlFor="price">Preço</Label>
                      <Input onChange={(e) => setPrice(e.target.value)} value={produto.price} id="price" required type="text"/>
                  </div>
              </>


          ))}


          <Button type="submit" className=" bg-indigo-400 hover:bg-indigo-900 mt-4 w-full">Cadastrar</Button>

      </form>
            </div>

    )
}