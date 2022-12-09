import fs from 'fs'
import path from 'path'

const year = process.argv[2]
const day = process.argv[3].replace(/^0*/g, '')
const paddedDay = day.padStart(2, '0')
const fullDay = `day${paddedDay}`
const currentPath = path.join(year, fullDay)

if (!fs.existsSync(currentPath)) {
	fs.mkdirSync(currentPath, { recursive: true })
	console.log(`Created directory ${currentPath}.`)
} else {
	console.log(`Directory ${currentPath} already exists.`)
}

const sourceFilename = path.join(currentPath, `${fullDay}.ts`)

if (!fs.existsSync(sourceFilename)) {
	fs.writeFileSync(
		sourceFilename,
		`
export const part1 = (input: string) => {

}

export const part2 = (input: string) => {

}
`.trim(),
	)
	console.log(`Created file ${sourceFilename}.`)
}

const testFilename = path.join(currentPath, `${fullDay}.test.ts`)

if (!fs.existsSync(testFilename)) {
	fs.writeFileSync(
		testFilename,
		`
import { expect, test } from 'vitest'
import { part1, part2 } from './${fullDay}'
import fs from 'fs'
import path from 'path'

const inputString = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
})

const exampleString = fs.readFileSync(path.resolve(__dirname, './example.txt'), {
  encoding: 'utf-8',
})

test('part1 examples', () => {
  expect(part1(exampleString)).toBe()
})

test('part1', () => {
  expect(part1(inputString)).toBe()
})

test('part2 examples', () => {
  expect(part2(exampleString)).toBe()
})

test('part2', () => {
  expect(part2(inputString)).toBe()
})
  `.trim(),
	)
	console.log(`Created file ${testFilename}.`)
}

const inputFilename = path.join(currentPath, 'input.txt')

if (!fs.existsSync(inputFilename)) {
	fs.writeFileSync(inputFilename, '')
	console.log(`Created file ${inputFilename}.`)
}

const readmeFilename = path.join(currentPath, 'README.md')

if (!fs.existsSync(readmeFilename)) {
	fs.writeFileSync(readmeFilename, `https://adventofcode.com/${year}/day/${day}\n`)
	console.log(`Created file ${readmeFilename}.`)
}
