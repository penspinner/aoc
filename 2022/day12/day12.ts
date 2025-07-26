const d = [
	{ dx: 0, dy: 1 },
	{ dx: 0, dy: -1 },
	{ dx: 1, dy: 0 },
	{ dx: -1, dy: 0 },
]

export const part1 = (input: string) => {
	return getShortestFrom(input, 'S', 'E', (a: string, b: string) => {
		return (
			(a === 'S' && (b === 'a' || b === 'b')) ||
			(a === 'y' && b === 'E') ||
			(a === 'z' && b === 'E') ||
			a === b ||
			a.charCodeAt(0) + 1 === b.charCodeAt(0) ||
			(a.charCodeAt(0) > b.charCodeAt(0) && b !== 'E')
		)
	})
}

export const part2 = (input: string) => {
	return getShortestFrom(input, 'E', 'a', (a: string, b: string) => {
		return (
			(a === 'E' && (b === 'z' || b === 'y')) ||
			(a === 'b' && b === 'S') ||
			(a === 'a' && b === 'S') ||
			a === b ||
			a.charCodeAt(0) - 1 === b.charCodeAt(0) ||
			(a.charCodeAt(0) < b.charCodeAt(0) && a !== 'E')
		)
	})
}

const getShortestFrom = (
	input: string,
	start: string,
	end: string,
	canMoveTo: (a: string, b: string) => boolean,
) => {
	const lines = input.split('\n')
	const [startNode, nodesByPosition] = getStartPosition(lines, start, end)
	const queue = [startNode]
	let endNode: Node | undefined

	while (queue.length !== 0) {
		const node = queue.shift()

		if (!node) {
			break
		}

		if (node.visited) {
			continue
		}

		node.visited = true

		if (node.char === end) {
			endNode = node
			break
		}

		for (const { dx, dy } of d) {
			const nextNode = nodesByPosition[`${node.x + dx},${node.y + dy}`]

			if (nextNode && !nextNode.visited && canMoveTo(node.char, nextNode.char)) {
				if (nextNode.distance > node.distance + 1) {
					nextNode.distance = node.distance + 1
				}

				queue.push(nextNode)
			}
		}
	}

	if (!endNode) {
		throw new Error('Could not find end.')
	}

	return nodesByPosition[`${endNode.x},${endNode.y}`].distance
}

type Node = { char: string; x: number; y: number; distance: number; visited: boolean }

const getStartPosition = (lines: string[], start: string, _end: string) => {
	const nodesByPosition: Record<`${number},${number}`, Node> = {}
	let startNode: Node | undefined

	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[i].length; j++) {
			const char = lines[i][j]
			const node = { char, x: j, y: i, distance: 0, visited: false }

			if (char === start) {
				startNode = node
				nodesByPosition[`${j},${i}`] = node
			} else {
				node.distance = Number.POSITIVE_INFINITY
				nodesByPosition[`${j},${i}`] = node
			}
		}
	}

	if (!startNode) {
		throw new Error(`Unable to find start '${start}'.`)
	}

	return [startNode, nodesByPosition] as const
}
