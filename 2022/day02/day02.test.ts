import { expect, test } from 'vitest'
import { part1, part2 } from './day02'
import fs from 'fs'
import path from 'path'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

const exampleString = fs.readFileSync(path.resolve(__dirname, './example.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1(exampleString)).toBe(15)
})

test('part1', () => {
	expect(part1(inputString)).toBe(11386)
})

test('part2 examples', () => {
	expect(part2(exampleString)).toBe(12)
})

test('part2', () => {
	expect(part2(inputString)).toBe(13600)
})
