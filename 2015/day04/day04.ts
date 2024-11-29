import crypto from 'node:crypto'

export const part1 = (input: string) => {
	return findLowestNumberThatMD5StartsWith(input, '00000')
}

export const part2 = (input: string) => {
	return findLowestNumberThatMD5StartsWith(input, '000000')
}

const findLowestNumberThatMD5StartsWith = (input: string, starts: string) => {
	let i = 0

	while (!computeMD5(input + i).startsWith(starts)) {
		i++
	}

	return i
}

const computeMD5 = (input: string) => crypto.createHash('md5').update(input).digest('hex')
