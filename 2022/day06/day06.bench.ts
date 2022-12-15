import { bench } from 'vitest'
import { part1, part2 } from './day06'
import fs from 'fs'
import path from 'path'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

bench('part1', () => {
	part1(inputString)
})

bench('part2', () => {
	part2(inputString)
})
