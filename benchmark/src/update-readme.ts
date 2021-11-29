import os from 'os'
import Table from 'cli-table'
import { join } from 'path'
import { readdirSync, readFileSync, writeFileSync } from 'fs'

import chalk from 'chalk'

const resultsPath = join(__dirname, '../../results')
const readmePath = join(__dirname, '../../README.md')


function bold(writeBold: boolean, str: string) {
    return writeBold ? chalk.bold(str) : str
}

function getAvailableResults(mode: "read" | "write" | "lineCount") {

    const matcher = RegExp(`^(${mode})(.+)\\.json$`)

    return readdirSync(resultsPath)
        .filter((file) => file.match(matcher))
        .sort()
        .map((choice) => choice.replace('.json', ''))
}

export function updateReadme() {
    const machineInfo = `${os.platform()} ${os.arch()} | ${os.cpus().length} vCPUs | ${(os.totalmem() / (1024 ** 3)).toFixed(1)}GB Mem`
    const benchmarkMd = `# Benchmarks
  * __Machine:__ ${machineInfo}
  * __Node:__ \`${process.version}\`
  * __Run:__ ${new Date()}
  
  ## Reads

  ${compareResults(true, "read")}

  ## Writes

  ${compareResults(true, "write")}

  ## Lines of Code

  ${compareCodeLines(true)}

  `
    const md = readFileSync(readmePath, 'utf8')
    writeFileSync(readmePath, md.split('# Benchmarks')[0] + benchmarkMd, 'utf8')
}

function compareCodeLines(markdown: boolean) {
    const tableStyle = !markdown
        ? {}
        : {
            chars: {
                top: '',
                'top-left': '',
                'top-mid': '',
                'top-right': '',
                bottom: '',
                'bottom-left': '',
                'bottom-mid': '',
                'bottom-right': '',
                mid: '',
                'left-mid': '',
                'mid-mid': '',
                'right-mid': '',
                left: '|',
                right: '|',
                middle: '|'
            },
            style: {
                border: [],
                head: []
            }
        }

    const table = new Table({
        ...tableStyle,
        head: ['', "Number of Files", 'blankLines', 'Comments', 'Code']
    })

    if (markdown) {
        table.push([':--', ':-:', ':-:', ':-:', ':-:'])
    }

    const results = getAvailableResults("lineCount").map(file => {
        const content = readFileSync(`${resultsPath}/${file}.json`)
        return JSON.parse(content.toString())
    }).sort((a, b) => {
        return parseFloat(a.SUM.code) - parseFloat(b.SUM.code)
    })



    for (const result of results) {
        const beBold = result.server === 'fastify'
        const {
            blank,
            comment,
            code,
            nFiles,
        } = result.SUM

        table.push([
            bold(beBold, result.server),
            bold(beBold, nFiles),
            bold(beBold, blank),
            bold(beBold, comment),
            bold(beBold, code),
        ])
    }
    return table.toString()
}

function compareResults(markdown: boolean, mode: "read" | "write") {
    const tableStyle = !markdown
        ? {}
        : {
            chars: {
                top: '',
                'top-left': '',
                'top-mid': '',
                'top-right': '',
                bottom: '',
                'bottom-left': '',
                'bottom-mid': '',
                'bottom-right': '',
                mid: '',
                'left-mid': '',
                'mid-mid': '',
                'right-mid': '',
                left: '|',
                right: '|',
                middle: '|'
            },
            style: {
                border: [],
                head: []
            }
        }

    const table = new Table({
        ...tableStyle,
        head: ['', 'Requests/s', 'Latency', 'Throughput/Mb']
    })

    if (markdown) {
        table.push([':--', ':-:', '--:', '--:'])
    }

    const results = getAvailableResults(mode).map(file => {
        const content = readFileSync(`${resultsPath}/${file}.json`)
        return JSON.parse(content.toString())
    }).sort((a, b) => parseFloat(b.requests.mean) - parseFloat(a.requests.mean))


    for (const result of results) {
        const beBold = result.server === 'fastify'

        const {
            requests: { average: requests },
            latency: { average: latency },
            throughput: { average: throughput }
        } = result


        table.push([
            bold(beBold, result.server),
            bold(beBold, requests ? requests.toFixed(1) : 'N/A'),
            bold(beBold, latency ? latency.toFixed(2) : 'N/A'),
            bold(beBold, throughput ? (throughput / 1024 / 1024).toFixed(2) : 'N/A')
        ])
    }
    return table.toString()
}