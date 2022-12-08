export const part1 = (input: string) => {
	const rows = input.split('\n')
	let numVisibleTreesOutsideGrid = 0

	const isTreeVisibleFromLeft = ({ x, y }: { x: number; y: number }) => {
		for (let current = 0; current < x; current++) {
			if (rows[y][current] >= rows[y][x]) {
				return false
			}
		}

		return true
	}

	const isTreeVisibleFromRight = ({ x, y }: { x: number; y: number }) => {
		for (let current = rows[y].length - 1; current > x; current--) {
			if (rows[y][current] >= rows[y][x]) {
				return false
			}
		}

		return true
	}

	const isTreeVisibleFromTop = ({ x, y }: { x: number; y: number }) => {
		for (let current = 0; current < y; current++) {
			if (rows[current][x] >= rows[y][x]) {
				return false
			}
		}

		return true
	}

	const isTreeVisibleFromBottom = ({ x, y }: { x: number; y: number }) => {
		for (let current = rows.length - 1; current > y; current--) {
			if (rows[current][x] >= rows[y][x]) {
				return false
			}
		}

		return true
	}

	rows.forEach((row, rowIndex) => {
		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			if (
				isTreeVisibleFromLeft({ x: columnIndex, y: rowIndex }) ||
				isTreeVisibleFromRight({ x: columnIndex, y: rowIndex }) ||
				isTreeVisibleFromTop({ x: columnIndex, y: rowIndex }) ||
				isTreeVisibleFromBottom({ x: columnIndex, y: rowIndex })
			) {
				numVisibleTreesOutsideGrid++
			}
		}
	})
	return numVisibleTreesOutsideGrid
}

export const part2 = (input: string) => {
	const rows = input.split('\n')
	let highestScenicScore = 0

	const getVisibleTreesCountToLeft = ({ x, y }: { x: number; y: number }) => {
		let visibleTreesCountToLeft = 0

		for (let current = x - 1; current >= 0; current--) {
			visibleTreesCountToLeft++

			if (rows[y][current] >= rows[y][x]) {
				break
			}
		}

		return visibleTreesCountToLeft
	}

	const getVisibleTreesCountToRight = ({ x, y }: { x: number; y: number }) => {
		let visibleTreesCountToRight = 0

		for (let current = x + 1; current < rows[y].length; current++) {
			visibleTreesCountToRight++

			if (rows[y][current] >= rows[y][x]) {
				break
			}
		}

		return visibleTreesCountToRight
	}

	const getVisibleTreesCountToTop = ({ x, y }: { x: number; y: number }) => {
		let visibleTreesCountToTop = 0

		for (let current = y - 1; current >= 0; current--) {
			visibleTreesCountToTop++

			if (rows[current][x] >= rows[y][x]) {
				break
			}
		}

		return visibleTreesCountToTop
	}

	const getVisibleTreesCountToBottom = ({ x, y }: { x: number; y: number }) => {
		let visibleTreesCountToBottom = 0

		for (let current = y + 1; current < rows.length; current++) {
			visibleTreesCountToBottom++

			if (rows[current][x] >= rows[y][x]) {
				break
			}
		}

		return visibleTreesCountToBottom
	}

	rows.forEach((row, rowIndex) => {
		for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
			const visibleTreesCountToLeft = getVisibleTreesCountToLeft({
				x: columnIndex,
				y: rowIndex,
			})
			const visibleTreesCountToRight = getVisibleTreesCountToRight({
				x: columnIndex,
				y: rowIndex,
			})
			const visibleTreesCountToTop = getVisibleTreesCountToTop({
				x: columnIndex,
				y: rowIndex,
			})
			const visibleTreesCountToBottom = getVisibleTreesCountToBottom({
				x: columnIndex,
				y: rowIndex,
			})
			const scenicScore =
				visibleTreesCountToLeft *
				visibleTreesCountToRight *
				visibleTreesCountToTop *
				visibleTreesCountToBottom

			if (scenicScore > highestScenicScore) {
				highestScenicScore = scenicScore
			}
		}
	})
	return highestScenicScore
}
