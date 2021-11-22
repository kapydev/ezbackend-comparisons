import { runBenchmarks } from './run-benchmark'

let flag = false

async function main() {
    await runBenchmarks('ezbackend-sample')
    await runBenchmarks('express-mongo-sample')
}

main()
