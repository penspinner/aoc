export const part1 = (input: string) => {
	const lines = input.split('\n')
	let total = 0
	lines.forEach((line) => {
		const [length, width, height] = line.split('x').map(Number)
		const lengthXWidth = length * width
		const widthXHeight = width * height
		const heightXLength = height * length
		const surfaceArea = 2 * lengthXWidth + 2 * widthXHeight + 2 * heightXLength
		const extra = Math.min(lengthXWidth, widthXHeight, heightXLength)
		total += surfaceArea + extra
	})
	return total
}

export const part2 = (input: string) => {
	const lines = input.split('\n')
	let total = 0
	lines.forEach((line) => {
		const [length, width, height] = line.split('x').map(Number)
		const volume = length * width * height
		const lengthWidthPerimeter = 2 * length + 2 * width
		const widthHeightPerimeter = 2 * width + 2 * height
		const heightLengthPerimeter = 2 * height + 2 * length
		const smallestPerimeter = Math.min(
			lengthWidthPerimeter,
			widthHeightPerimeter,
			heightLengthPerimeter,
		)
		total += volume + smallestPerimeter
	})
	return total
}
