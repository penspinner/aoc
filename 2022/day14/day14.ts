export const part1 = (input: string) => {
	const [bounds, structure] = getBoundsAndStructure(input)
	let sandCountBeforeFlowingToAbyss = 0

	const isBlocked = (x: number, y: number) => {
		const item = structure[`${x},${y}`]
		return item === '#' || item === 'o'
	}

	let x = 500
	let y = 0
	const positions = [{ x, y }]

	while (x >= bounds.x1 && x < bounds.x2 && y >= bounds.y1 && y < bounds.y2) {
		const isBlockedBelow = isBlocked(x, y + 1)

		if (!isBlockedBelow) {
			y++
			positions.push({ x, y })
			continue
		}

		const isBlockedBelowLeft = isBlocked(x - 1, y + 1)

		if (!isBlockedBelowLeft) {
			x--
			y++
			positions.push({ x, y })
			continue
		}

		const isBlockedBelowRight = isBlocked(x + 1, y + 1)

		if (!isBlockedBelowRight) {
			x++
			y++
			positions.push({ x, y })
			continue
		}

		structure[`${x},${y}`] = 'o'
		sandCountBeforeFlowingToAbyss++
		positions.pop()

		const lastPosition = positions.at(-1)

		if (lastPosition) {
			x = lastPosition.x
			y = lastPosition.y
		}
	}

	return sandCountBeforeFlowingToAbyss
}

export const part2 = (input: string) => {
	const [bounds, structure] = getBoundsAndStructure(input)
	let sandCountBeforeFlowingToAbyss = 0

	const isBlocked = (x: number, y: number) => {
		const item = structure[`${x},${y}`]
		return item === '#' || item === 'o' || y === bounds.y2 + 2
	}

	let x = 500
	let y = 0
	const positions = [{ x, y }]

	while (true) {
		const isBlockedBelow = isBlocked(x, y + 1)

		if (!isBlockedBelow) {
			y++
			positions.push({ x, y })
			continue
		}

		const isBlockedBelowLeft = isBlocked(x - 1, y + 1)

		if (!isBlockedBelowLeft) {
			x--
			y++
			positions.push({ x, y })
			continue
		}

		const isBlockedBelowRight = isBlocked(x + 1, y + 1)

		if (!isBlockedBelowRight) {
			x++
			y++
			positions.push({ x, y })
			continue
		}

		structure[`${x},${y}`] = 'o'
		sandCountBeforeFlowingToAbyss++
		positions.pop()

		if (x === 500 && y === 0) {
			break
		}

		const lastPosition = positions.at(-1)

		if (lastPosition) {
			x = lastPosition.x
			y = lastPosition.y
		}
	}

	return sandCountBeforeFlowingToAbyss
}

const getBoundsAndStructure = (input: string) => {
	const lines = input.split('\n')
	const structure: Record<`${number},${number}`, string> = {}
	const bounds: { x1: number; y1: number; x2: number; y2: number } | undefined = {
		x1: Infinity,
		y1: 0,
		x2: -Infinity,
		y2: -Infinity,
	}

	const drawRockLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
		const dx = to.x - from.x
		const dy = to.y - from.y

		for (let x = 0; x !== dx; x += Math.sign(dx)) {
			structure[`${from.x + x},${from.y}`] = '#'
		}

		for (let y = 0; y !== dy; y += Math.sign(dy)) {
			structure[`${from.x},${from.y + y}`] = '#'
		}

		structure[`${to.x},${to.y}`] = '#'
	}

	lines.forEach((line) => {
		const coordinates = line.split(' -> ').map((coordinateString) => {
			const [x, y] = coordinateString.split(',').map(Number)
			return { x, y }
		})

		for (let i = 1; i < coordinates.length; i++) {
			const prevCoordinate = coordinates[i - 1]
			const coordinate = coordinates[i]
			drawRockLine(prevCoordinate, coordinate)

			if (coordinate.x < bounds.x1) {
				bounds.x1 = coordinate.x
			}

			if (coordinate.x > bounds.x2) {
				bounds.x2 = coordinate.x
			}

			if (coordinate.y > bounds.y2) {
				bounds.y2 = coordinate.y
			}
		}
	})

	return [bounds, structure] as const
}
