import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from 'vitest'
import { part1, part2 } from './day11'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

const exampleString = fs.readFileSync(path.resolve(__dirname, './example.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1(exampleString)).toBe(10605)
})

test('part1', () => {
	expect(part1(inputString)).toBe(112221)
})

test('part2 examples', () => {
	expect(part2(exampleString)).toBe(2713310158)
})

test('part2', () => {
	expect(part2(inputString)).toBe(25272176808)
})
