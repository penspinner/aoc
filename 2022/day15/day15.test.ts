import { expect, test } from 'vitest'
import { part1, part2 } from './day15'
import fs from 'fs'
import path from 'path'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
	encoding: 'utf-8',
})

const exampleString = fs.readFileSync(path.resolve(__dirname, './example.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1(exampleString, 10)).toBe(26)
})

test('part1', () => {
	expect(part1(inputString, 2000000)).toBe(4737567)
})

test.only('part2 examples', () => {
	expect(part2(exampleString)).toBe(56000011)
})

test('part2', () => {
	expect(part2(inputString)).toBe()
})
