import * as fs from 'node:fs/promises'
import path from 'node:path'
import { expect, test } from 'vitest'
import { part1, part2 } from './day05'

const inputString = await fs.readFile(path.join(import.meta.dirname, './input.txt'), {
	encoding: 'utf-8',
})

const exampleString = await fs.readFile(path.join(import.meta.dirname, './example.txt'), {
	encoding: 'utf-8',
})

test('part1 examples', () => {
	expect(part1(exampleString)).toBe('CMZ')
})

test('part1', () => {
	expect(part1(inputString)).toBe('TDCHVHJTG')
})

test('part2', () => {
	expect(part2(exampleString)).toBe('MCD')
})

test('part2', () => {
	expect(part2(inputString)).toBe('NGCMPJLHV')
})
