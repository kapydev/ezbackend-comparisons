import { Router } from "express";
import { postModel } from "../models";


export const postController = Router()

//CREATE
postController.post('/', async (req,res) => {
    const result = await postModel.create(req.body)
    res.json(result)
})

//READ ALL
postController.get('/', async (req, res) => {
    const result = await postModel.find().exec()
    res.json(result)
})

//READ ONE
postController.get('/:id', async (req,res) => {
    const result = await postModel.findById(req.params.id).exec()
    res.json(result)
})

//UPDATE ONE
postController.patch('/:id', async (req,res) => {
    const result = await postModel.findByIdAndUpdate(req.params.id).exec()
    res.json(result)
})

//DELETE ONE
postController.delete('/:id', async (req,res) => {
    const result =  await postModel.findByIdAndDelete(req.params.id).exec()
    res.json(result)
})
