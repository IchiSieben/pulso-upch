// Reads scenarios JSON from argv[2], prints JS detector output as JSON.
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
const { evaluate } = await import(pathToFileURL(process.argv[3]).href)
const cases = JSON.parse(readFileSync(process.argv[2], 'utf8'))
console.log(JSON.stringify(cases.map(days => { const r = evaluate(days); return { state: r.state, flags: r.flags, z: r.z } })))
