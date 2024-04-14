const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const app = express()


app.use(express.json())
app.use(cors())
app.use('/api', routes)





const port = 5000

app.listen(port, () => {
  try {
    console.log('servidor inicializado com sucesso')
  } catch(error) {
    console.error('erro ao executar servidor', error)

  }

})
