import ora from 'ora'
import path from 'path'
import { execSync } from 'child_process'
import { writeResult } from './utils'

export function countLines(frameworkName: string) {
    const spinner = ora(`Counting lines for ${frameworkName}`).start()
    const targetDir = path.join(
        __dirname,
        "../../",
        frameworkName,
        "src")

    try {
        const cmd = `cloc "${targetDir}" --json`
        const result = execSync(cmd)
        const parsedResult = JSON.parse(result.toString())
        spinner.color = "yellow"
        spinner.text = `${frameworkName} - Line Count Complete`
        writeResult(`lineCount-${frameworkName}`, parsedResult)

        spinner.succeed()
    } catch (e) {
        console.error(e)
    }
}