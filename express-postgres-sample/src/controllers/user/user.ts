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
    const result = await userModel.findAll()
    res.json(result)
})

//READ ONE
userController.get('/:id', async (req, res) => {
    const result = await userModel.findByPk(req.params.id)
    res.json(result)
})

//UPDATE ONE
userController.patch('/:id', async (req, res) => {
    const result = await userModel.update(
        req.body,
        { where: { _id: req.params.id } }
    )
    res.json(result)
})

//DELETE ONE
userController.delete('/:id', async (req, res) => {
    const oldUser =  await userModel.findByPk(req.params.id)
    const result = await oldUser?.destroy()
    res.json(result)
})

