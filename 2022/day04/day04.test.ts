import * as fs from 'node:fs/promises'
import path from 'node:path'
import { expect, test } from 'vitest'
import { part1, part2 } from './day04'

const inputString = await fs.readFile(path.join(import.meta.dirname, './input.txt'), {
	encoding: 'utf-8',
})

const exampleString = await fs.readFile(path.join(import.meta.dirname, './example.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1(exampleString)).toBe(2)
})

test('part1', () => {
	expect(part1(inputString)).toBe(651)
})

test('part2 examples', () => {
	expect(part2(exampleString)).toBe(4)
})

test('part2', () => {
	expect(part2(inputString)).toBe(956)
})
