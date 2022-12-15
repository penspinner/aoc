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
	const source = fs.readFileSync(path.join('templates', 'src.ts'))
	fs.writeFileSync(sourceFilename, source)
	console.log(`Created file ${sourceFilename}.`)
}

const testFilename = path.join(currentPath, `${fullDay}.test.ts`)

if (!fs.existsSync(testFilename)) {
	const testFile = fs.readFileSync(path.join('templates', 'test.ts'), { encoding: 'utf-8' })
	fs.writeFileSync(testFilename, testFile.replace('${fullDay}', fullDay))
	console.log(`Created file ${testFilename}.`)
}

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

const exampleFilename = path.join(currentPath, 'example.txt')

if (!fs.existsSync(exampleFilename)) {
	fs.writeFileSync(exampleFilename, '')
	console.log(`Created file ${exampleFilename}.`)
}

const readmeFilename = path.join(currentPath, 'README.md')

if (!fs.existsSync(readmeFilename)) {
	fs.writeFileSync(readmeFilename, `https://adventofcode.com/${year}/day/${day}\n`)
	console.log(`Created file ${readmeFilename}.`)
}
