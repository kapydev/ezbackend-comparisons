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
    const result = await postModel.findAll()
    res.json(result)
})

//READ ONE
postController.get('/:id', async (req,res) => {
    const result = await postModel.findByPk(req.params.id)
    res.json(result)
})

//UPDATE ONE
postController.patch('/:id', async (req,res) => {
    const result = await postModel.update(
        req.body,
        {where: {_id: req.params.id}}
    )
    res.json(result)
})

//DELETE ONE
postController.delete('/:id', async (req,res) => {
    const oldPost =  await postModel.findByPk(req.params.id)
    const result = await oldPost?.destroy()
    res.json(result)
})
