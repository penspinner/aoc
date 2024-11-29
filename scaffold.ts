import * as fs from 'node:fs/promises'
import path from 'node:path'

const writeFileIfNotExists: typeof fs.writeFile = async (filePath, data) => {
	try {
		await fs.access(filePath.toString())
		console.log(`File "${filePath}" already exists, not writing.`)
	} catch (caught) {
		if (caught instanceof Error && 'code' in caught && caught.code === 'ENOENT') {
			await fs.writeFile(filePath, data)
			console.log(`File "${filePath}" written successfully.`)
		} else {
			console.error(`Error accessing file "${filePath}":`, caught)
		}
	}
}

const year = process.argv[2]
const day = process.argv[3].replace(/^0*/g, '')
const paddedDay = day.padStart(2, '0')
const fullDay = `day${paddedDay}`
const currentPath = path.join(year, fullDay)

await fs.mkdir(currentPath, { recursive: true })
console.log(`Directory ${currentPath} created successfully.`)

const sourceFilename = path.join(currentPath, `${fullDay}.ts`)
const sourceFile = await fs.readFile(path.join('templates', 'src.ts'))
await writeFileIfNotExists(sourceFilename, sourceFile)

const testFilename = path.join(currentPath, `${fullDay}.test.ts`)
const testFile = await fs.readFile(path.join('templates', 'test.ts'), { encoding: 'utf-8' })
await writeFileIfNotExists(testFilename, testFile.replace('${fullDay}', fullDay))

const benchFilename = path.join(currentPath, `${fullDay}.bench.ts`)
const benchFile = await fs.readFile(path.join('templates', 'bench.ts'), { encoding: 'utf-8' })
await writeFileIfNotExists(benchFilename, benchFile.replace('${fullDay}', fullDay))

const inputFilename = path.join(currentPath, 'input.txt')
await writeFileIfNotExists(inputFilename, '')

const exampleFilename = path.join(currentPath, 'example.txt')
await writeFileIfNotExists(exampleFilename, '')

const readmeFilename = path.join(currentPath, 'README.md')
await writeFileIfNotExists(readmeFilename, `https://adventofcode.com/${year}/day/${day}\n`)
