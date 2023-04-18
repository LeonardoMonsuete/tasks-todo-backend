const { request, response } = require("express")
const express = require("express")

const toDoRoutes = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// C
toDoRoutes.post("/newToDo", async (request, response) => {
    const { name } = request.body
    const toDoCreation = await prisma.toDo.create({
        data: {
            name,
        },
    })
    return response.status(201).json(toDoCreation)
})
// R
toDoRoutes.get("/toDos", async (request, response) => {
    const allToDoItems = await prisma.toDo.findMany()
    return response.status(200).json(allToDoItems)
})

toDoRoutes.get("/toDo/:id", async (request, response) => {
    const { id } = request.params
    const IdParam = parseInt(id)

    if (!IdParam) {
        return response.status(400).json("Id is required to find one ToDo task")
    }
    
    const toDoSearched = await prisma.toDo.findUnique({where: { id: IdParam }})

    if(!toDoSearched){
        return response.status(400).json(`No ToDoTask found from this id: ${IdParam}`)
    }
    
    return response.status(200).json(toDoSearched)
 })

// U
toDoRoutes.put("/updateToDoName/:id", async (request, response) => {
    const { name } = request.body
    console.log(request.body)
    const { id } = request.params
    const IdParam = parseInt(id)

    if (!IdParam) {
        return response.status(400).json("Id is required to update ToDo task")
    }
    
    const toDoSearched = await prisma.toDo.findUnique({where: { id: IdParam }})
    console.log(toDoSearched)
    if(!toDoSearched){
        return response.status(400).json(`No ToDoTask found from this id: ${IdParam}`)
    }

    const toDoUpdate = await prisma.toDo.update({
        where: {
            id: IdParam
        },
        data: {
            name
        },
    })

    return response.status(201).send()
})


toDoRoutes.put("/updateToDoStatus/:id", async (request, response) => {
    const { status } = request.body
    const { id } = request.params
    const IdParam = parseInt(id)

    if (!IdParam) {
        return response.status(400).json("Id is required to update ToDo task")
    }
    
    const toDoSearched = await prisma.toDo.findUnique({where: { id: IdParam }})
    if(!toDoSearched){
        return response.status(400).json(`No ToDoTask found from this id: ${IdParam}`)
    }

    const toDoUpdate = await prisma.toDo.updateMany({
        where: {
            id: IdParam
        },
        data: {
            status
        },
    })

    return response.status(200).json(toDoUpdate)
})

// D
toDoRoutes.delete("/deleteToDo/:id", async (request, response) => {
    const { id } = request.params
    const IdParam = parseInt(id)

    if (!IdParam) {
        return response.status(400).json("Id is required to update ToDo task")
    }
    
    const toDoSearched = await prisma.toDo.findUnique({where: { id: IdParam }})

    if(!toDoSearched){
        return response.status(400).json(`No ToDoTask found from this id: ${IdParam}`)
    }

    await prisma.toDo.delete({
        where: {
            id: IdParam
        }
    })
    return response.status(200).send()
})

module.exports = toDoRoutes