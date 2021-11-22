import { Router } from "express";
import { userModel } from "../../models";
import { authController } from "./auth";


export const userController = Router()

//Add Authentication
userController.use('/auth', authController)

//CREATE
userController.post('/', async (req, res) => {
    const result = await userModel.create(req.body)
    res.json(result)
})

//READ ALL
userController.get('/', async (req, res) => {
    const result = await userModel.find().exec()
    res.json(result)
})

//READ ONE
userController.get('/:id', async (req, res) => {
    const result = await userModel.findById(req.params.id).exec()
    res.json(result)
})

//UPDATE ONE
userController.patch('/:id', async (req, res) => {
    const result = await userModel.findByIdAndUpdate(req.params.id).exec()
    res.json(result)
})

//DELETE ONE
userController.delete('/:id', async (req, res) => {
    const result = await userModel.findByIdAndDelete(req.params.id).exec()
    res.json(result)
})

