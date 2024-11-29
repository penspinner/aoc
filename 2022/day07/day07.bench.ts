import fs from 'node:fs'
import path from 'node:path'
import { bench } from 'vitest'
import { part1, part2 } from './day07'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

const exampleString = fs.readFileSync(path.resolve(__dirname, './example.txt'), {
	encoding: 'utf-8',
})

bench('part1 examples', () => {
	part1(exampleString)
})

bench('part1', () => {
	part1(inputString)
})

bench('part2 examples', () => {
	part2(exampleString)
})

bench('part2', () => {
	part2(inputString)
})
