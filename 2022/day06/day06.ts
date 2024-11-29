export const part1 = (input: string) => {
	return getFirstCompartmentWithoutDuplicates(input, 4)
}

export const part2 = (input: string) => {
	return getFirstCompartmentWithoutDuplicates(input, 14)
}

const getFirstCompartmentWithoutDuplicates = (input: string, after: number) => {
	for (let i = 1; i < input.length; i++) {
		const charCount: Record<string, number | undefined> = {}
		let hasDuplicates = false

		for (let j = i; j < i + after; j++) {
			const char = input[j]

			if (charCount[char] === 1) {
				hasDuplicates = true
				break
			}
			if (charCount[char] === undefined) {
				charCount[char] = 1
			}
		}

		if (!hasDuplicates) {
			return i + after
		}
	}

	throw new Error('No start of packet is detected.')
}
