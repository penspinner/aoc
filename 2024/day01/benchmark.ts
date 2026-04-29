import * as fs from 'node:fs/promises'
import path from 'node:path'
import { bench, run } from 'mitata'
import { part1 } from './day01'

const inputString = await fs.readFile(path.join(import.meta.dirname, './input.txt'), {
	encoding: 'utf-8',
})

bench('part1', () => {
	part1(inputString)
})

await run()
