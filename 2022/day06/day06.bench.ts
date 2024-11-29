import fs from 'node:fs'
import path from 'node:path'
import { bench } from 'vitest'
import { part1, part2 } from './day06'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

bench('part1', () => {
	part1(inputString)
})

bench('part2', () => {
	part2(inputString)
})
