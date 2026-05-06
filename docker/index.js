const express = require('express')

const app = express()

const PORT= 3000

app.get('/' , (req , res) => {
    res.send('Hello World from the user')
})
console.log("Server is running  on Port http://localhost:" + PORT)

app.listen(PORT , () => {
    console.log("Server is running  on Port http://localhost:" + PORT)
})
