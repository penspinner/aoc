export const part1 = (input: string) => {
	let floor = 0

	for (const char of input) {
		if (char === '(') {
			floor++
		} else if (char === ')') {
			floor--
		}
	}

	return floor
}

export const part2 = (input: string) => {
	let floor = 0

	for (let i = 0; i < input.length; i++) {
		const char = input[i]

		if (char === '(') {
			floor++
		} else if (char === ')') {
			floor--
		}

		if (floor < 0) {
			return i + 1
		}
	}

	throw new Error('Could not find position where Santa enters a basement.')
}
