const express = require("express")
const toDoRoutes = require("./toDos.routes")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use(toDoRoutes)

app.get("/health", (req, res) => {
    return res.json("is up !")
})

app.listen(3333, () => console.log("Server is up on port 3333"));