import { pathToFileURL } from 'node:url'
import { readFileSync } from 'node:fs'
const { evaluate, describeChange } = await import(pathToFileURL(process.argv[3]).href)
const days = JSON.parse(readFileSync(process.argv[2], 'utf8'))
console.log(JSON.stringify(describeChange(evaluate(days)).map(c => c.text)))
