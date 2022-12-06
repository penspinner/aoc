const getIntersectingChar = (str1: string, str2: string) => {
	for (let i = 0; i < str1.length; i++) {
		const char = str1[i]
		if (str2.includes(char)) {
			return char
		}
	}
	throw new Error('No intersecting char')
}

export const part1 = (input: string) => {
	const lines = input.split('\n')
	let sumProperties = 0

	lines.forEach((line) => {
		if (!line) return
		const firstComp = line.slice(0, line.length / 2)
		const secondComp = line.slice(line.length / 2)
		const intersectingChar = getIntersectingChar(firstComp, secondComp)
		const n = intersectingChar === intersectingChar.toLowerCase() ? 96 : 38
		sumProperties += intersectingChar.charCodeAt(0) - n
	})

	return sumProperties
}

// Part 2

export const part2 = (input: string) => {
	const lines = input.split('\n')
	let sumProperties = 0

	for (let i = 0; i < lines.length; i += 3) {
		if (!lines[i]) continue
		const line1 = lines[i]
		const line2 = lines[i + 1]
		const line3 = lines[i + 2]
		let intersectingChar = null
		for (const c of line1) {
			if (line2.includes(c) && line3.includes(c)) {
				intersectingChar = c
				break
			}
		}
		if (intersectingChar === null) throw new Error('no intersecting')
		const n = intersectingChar === intersectingChar.toLowerCase() ? 96 : 38
		sumProperties += intersectingChar.charCodeAt(0) - n
	}

	return sumProperties
}
