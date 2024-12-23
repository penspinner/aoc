import * as fs from 'node:fs/promises'
import path from 'node:path'
import { expect, test } from 'vitest'
import { part1, part2 } from './day03'

const inputString = await fs.readFile(path.join(import.meta.dirname, './input.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1('^>v<')).toBe(4)
})

test('part1', () => {
	expect(part1(inputString)).toBe(2592)
})

test('part2 examples', () => {
	expect(part2('^>v<')).toBe(3)
	expect(part2('^v^v^v^v^v')).toBe(11)
})

test('part2', () => {
	expect(part2(inputString)).toBe(2360)
})
