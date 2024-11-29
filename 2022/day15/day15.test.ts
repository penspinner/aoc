import * as fs from 'node:fs/promises'
import path from 'node:path'
import { expect, test } from 'vitest'
import { part1, part2 } from './day15'

const inputString = await fs.readFile(path.join(import.meta.dirname, './input.txt'), {
	encoding: 'utf-8',
})

const exampleString = await fs.readFile(path.join(import.meta.dirname, './example.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1(exampleString, 10)).toBe(26)
})

test('part1', () => {
	expect(part1(inputString, 2000000)).toBe(4737567)
})

test.skip('part2 examples', () => {
	expect(part2(exampleString)).toBe(56000011)
})

test.skip('part2', () => {
	expect(part2(inputString)).toBe(undefined)
})
