export const part1 = (input: string) => {
	for (let i = 1; i < input.length; i++) {
		const charCount: Record<string, number | undefined> = {}
		let hasDuplicates = false

		for (let j = i; j < i + 4; j++) {
			const char = input[j]

			if (charCount[char] === 1) {
				// Character has been seen
				hasDuplicates = true
				break
			} else if (charCount[char] === undefined) {
				charCount[char] = 1
			}
		}

		if (!hasDuplicates) {
			return i + 4
		}
	}

	throw new Error('No start of packet is detected.')
}

export const part2 = (input: string) => {
	for (let i = 1; i < input.length; i++) {
		const charCount: Record<string, number | undefined> = {}
		let hasDuplicates = false

		for (let j = i; j < i + 14; j++) {
			const char = input[j]

			if (charCount[char] === 1) {
				// Character has been seen
				hasDuplicates = true
				break
			} else if (charCount[char] === undefined) {
				charCount[char] = 1
			}
		}

		if (!hasDuplicates) {
			return i + 14
		}
	}

	throw new Error('No start of packet is detected.')
}
