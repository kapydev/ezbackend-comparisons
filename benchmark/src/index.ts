import { runBenchmarks } from './run-benchmark'
import { countLines } from './code-levels'
import { updateReadme } from './update-readme'
import sampleList from './sample-list'

async function main() {
    // for (const frameworkName of sampleList) {
    //     await runBenchmarks(frameworkName)
    //     countLines(frameworkName)
    // }
    // await runBenchmarks('ezbackend-postgres-sample')
    // await countLines('ezbackend-postgres-sample')
    updateReadme()
}

main()
