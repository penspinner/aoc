import * as fs from 'node:fs/promises'
import path from 'node:path'
import { bench } from 'vitest'
import { part1, part2 } from './day06'

const inputString = await fs.readFile(path.join(import.meta.dirname, './input.txt'), {
	encoding: 'utf-8',
})

bench('part1', () => {
	part1(inputString)
})

bench('part2', () => {
	part2(inputString)
})
