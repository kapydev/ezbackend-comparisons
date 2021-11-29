import fs from 'fs'
import { promisify } from 'util'
import path from 'path'

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)
const access = promisify(fs.access)

const resultsDirectory = path.join(__dirname, '../../results')

export const writeResult = async (handler: string, result: any) => {
    try {
        await access(resultsDirectory)
    } catch (e) {
        await mkdir(resultsDirectory)
    }

    result.server = handler

    const dest = path.join(resultsDirectory, `${handler}.json`)
    return writeFile(dest, JSON.stringify(result))
}