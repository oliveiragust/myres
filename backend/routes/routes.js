const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


// create product function
const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get product function

const getProducts = async (req, res) => {
  try{
    const products = await prisma.product.findMany()
    res.json(products)
    console.log()

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Erro ao buscar categorias'})
  }
} 







// routes


const router = express.Router();

// Routes to edit the product name, description and price


router.get('/:id/edit', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await prisma.product.findUnique({
      where: {id: productId}
    });
    if (!product) {
      return res.status(404).json({error: 'Produto não encontrado'})
    }
    res.status(200).json({ product });

  }catch(error) {
    console.error('Error fetching data, error', error)
    res.status(500).json({error: 'Erro'})
  }

})

router.post('/:id/edit', async (req, res) => {
  const productId = parseInt(req.params.id)
  const { name, description, price } = req.body

  try{
    const updateProduct = await prisma.product.update({
      where: {id: productId},
      data: {name, description, price},
      


    })
    res.status(201).json(updateProduct);
    

  }catch(error) {
  console.error({error: "Error fetching data."})
    res.status(500).json('Error')
  }
})

//
// routes to create product and get product
router.post('/create', createProduct);

router.get('/products', getProducts)

// route to delete

router.post('/:id/delete', async (req, res) => {
  const productId = parseInt(req.params.id)
  const {name, description, price} = req.body

  try{
    const deleteProduct = await prisma.product.delete({
      where: {id: productId},
      
    })
    res.status(201).json(deleteProduct)
  }catch(error){
    console.error({error: 'error' })
  }
})

module.exports = router;
