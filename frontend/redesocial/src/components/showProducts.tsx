import { useCallback, useEffect, useState } from "react";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "./ui/table";
import  axios  from 'axios'
import { Skeleton } from "./ui/skeleton";
import { Navigate, useNavigate } from 'react-router-dom'





export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0) )
  const response = await axios.get('http://localhost:5000/api/products')
  return response.data

}




export default function ShowProduct(){
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch {
      console.error()
    } finally {
      setIsLoading(false)
    }
  }, [])

 
const handleProductEdit = (productId: any) => {
  navigate(`/products/${productId}/edit`)
}

const handleDeletProducts = async (productId: any) => {
  productId.toString()
  setIsLoading(true)
  const response = await axios.post(`http://localhost:5000/api/${productId}/delete`)
  
  fetchData()  
  setIsLoading(false)
  return response.data
  
}


useEffect(() => {
  fetchData()

}, [fetchData] )

  return (
    <>

    <Table className="m-auto  w-75 ">
      <TableCaption>Todos os produtos cadastrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Edit</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
        
            isLoading && products.length === 0 && 
            
            <div className="flex items-center ml-2 mt-2 space-x-4">
              
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div> }

         {products.map((produto) => (
          <TableRow key={produto.id}>
            <TableCell className="font-medium">{produto.name}</TableCell>
            <TableCell>{produto.description}</TableCell>
            <TableCell className="text-right">{produto.price}</TableCell>
            <TableCell className="text-right"><button className="btn" onClick={() => handleProductEdit(produto.id)}>Edit</button></TableCell>
            <TableCell className="text-right"><button className="btn" onClick={() => handleDeletProducts(produto.id)}>delete</button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="">
        
      </TableFooter>
    </Table>
    
    
    </>
  )


}