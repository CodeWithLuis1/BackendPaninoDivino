import server from './server.js'
import colors from 'colors'

const port = process.env.PORT || 5000
server.listen(5000,()=>{
    console.log(colors.bgCyan.bold(`REST API, en el perto ${port}`))
})