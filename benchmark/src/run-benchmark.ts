import { fork } from "child_process"
import ora from 'ora'
import path from 'path'
import autocannon from "autocannon"
import fs from 'fs'
import { promisify } from 'util'
import axios from 'axios'


const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)
const access = promisify(fs.access)

const resultsDirectory = path.join(__dirname, '../../results')

const writeResult = async (handler: string, result: any) => {
    try {
        await access(resultsDirectory)
    } catch (e) {
        await mkdir(resultsDirectory)
    }

    result.server = handler

    const dest = path.join(resultsDirectory, `${handler}.json`)
    return writeFile(dest, JSON.stringify(result))
}


const getReadOpts = (id: any): autocannon.Options => {
    return {
        amount: 10000,
        url: `http://localhost:8000/posts/${id}`
    }
}

const createOpts: autocannon.Options = {
    method: "POST",
    url: 'http://localhost:8000/posts',
    amount: 10000,
    requests: [{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            summary: "My First Post",
            description: "I am extremely excited and honoured to create my very first post!"
        })
    }]
}

export const fire = (opts: autocannon.Options) => new Promise((resolve, reject) => {
    const instance = autocannon(opts, (err, result) => {
        if (err) {
            reject(err)
        } else {
            resolve(result)
        }
    })
})

export const runBenchmarks = async (frameworkName: string) => {
    const spinner = ora(`Started ${frameworkName}`).start()
    const targetDir = path.join(
        __dirname,
        "../../",
        frameworkName)
    const targetPath = path.join(
        targetDir,
        "dist/index.js"
    )

    const forked = fork(targetPath, [], { cwd: targetDir })

    let possibleId = null

    try {
        spinner.color = "magenta"
        spinner.text = `Warming Up: ${frameworkName}`
        await fire(createOpts)
    } catch (e) {
        return console.log(e)
    }

    try {
        spinner.color = "red"
        spinner.text = "Seeding Database"
        const result = await axios.post('http://localhost:8000/posts', {
            summary: "My Seeding Post",
            description: "I love seeding my database"
        })
        possibleId = result.data.id ?? result.data._id
    } catch (e) {
        return console.log(e)
    }

    try {
        spinner.color = "yellow"
        spinner.text = `Create Test - Running ${frameworkName}`
        const result = await fire(createOpts) as any
        writeResult(`write-${frameworkName}`, result)
    } catch (e) {
        return console.log(e)
    }    

    try {
        spinner.color = "magenta"
        spinner.text = `Read Test - Running: ${frameworkName}`
        const result = await fire(getReadOpts(possibleId)) as any
        writeResult(`read-${frameworkName}`, result)

    } catch (e) {
        return console.log(e)
    }



    forked.kill("SIGINT")
    spinner.succeed()


}