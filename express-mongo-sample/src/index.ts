import dotenv from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'

const envFilePath = path.join(__dirname, "../.env")
dotenv.config({ path: envFilePath })

import app from './server'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

async function main() {
    await mongoose.connect("mongodb://localhost:27017/test")
    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`)
    })
}

main()


