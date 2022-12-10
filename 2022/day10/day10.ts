export const part1 = (input: string) => {
	const lines = input.split('\n')
	const signalStrengthByCycle: Record<number, number> = {}
	let x = 1
	let cycle = 1

	lines.forEach((line) => {
		const [command, amount] = line.split(' ')

		if (command === 'noop') {
			cycle++
			signalStrengthByCycle[cycle] = cycle * x
		} else if (command === 'addx') {
			cycle++
			signalStrengthByCycle[cycle] = cycle * x
			cycle++
			x += +amount
			signalStrengthByCycle[cycle] = cycle * x
		}
	})
	return (
		signalStrengthByCycle[20] +
		signalStrengthByCycle[60] +
		signalStrengthByCycle[100] +
		signalStrengthByCycle[140] +
		signalStrengthByCycle[180] +
		signalStrengthByCycle[220]
	)
}

export const part2 = (input: string) => {
	const lines = input.split('\n')
	const crt = Array.from({ length: 6 }).map(() => Array.from({ length: 40 }).map(() => '.'))
	let x = 1
	let cycle = 0

	const draw = () => {
		const row = Math.floor(cycle / 40)
		const column = Math.floor(cycle % 40)

		if (column === x - 1 || column === x || column === x + 1) {
			crt[row][column] = '#'
		} else {
			crt[row][column] = '.'
		}
	}

	lines.forEach((line) => {
		const [command, amount] = line.split(' ')

		if (command === 'noop') {
			draw()
			cycle++
		} else if (command === 'addx') {
			draw()
			cycle++
			draw()
			cycle++
			x += +amount
		}
	})
	return crt.map((row) => row.join('')).join('\n')
}
