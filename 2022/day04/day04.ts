export const part1 = (input: string) => {
	const lines = input.split('\n')
	const data = lines.map((line) => line.split(',')).filter(Boolean)
	let numFullyContainedAssignmentPairs = 0
	data.forEach(([elf1, elf2]) => {
		if (!elf1) return

		const [elf1SectionA, elf1SectionB] = elf1.split('-').map(Number)
		const [elf2SectionA, elf2SectionB] = elf2.split('-').map(Number)
		if (
			(elf1SectionA >= elf2SectionA && elf1SectionB <= elf2SectionB) ||
			(elf1SectionA <= elf2SectionA && elf1SectionB >= elf2SectionB)
		) {
			numFullyContainedAssignmentPairs++
		}
	})
	return numFullyContainedAssignmentPairs
}

export const part2 = (input: string) => {
	const lines = input.split('\n')
	const data = lines.map((line) => line.split(',')).filter(Boolean)
	let numOverlappingRanges = 0
	data.forEach(([elf1, elf2]) => {
		if (!elf1) return

		const [elf1SectionA, elf1SectionB] = elf1.split('-').map(Number)
		const [elf2SectionA, elf2SectionB] = elf2.split('-').map(Number)
		if (
			(elf1SectionA <= elf2SectionA && elf1SectionB >= elf2SectionA) ||
			(elf1SectionA <= elf2SectionB && elf1SectionB >= elf2SectionB) ||
			(elf1SectionA >= elf2SectionA && elf1SectionB <= elf2SectionB)
		) {
			numOverlappingRanges++
		}
	})
	return numOverlappingRanges
}
