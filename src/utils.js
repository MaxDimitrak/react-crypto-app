export const percentDifference = (curPrice, prevPrice) => {
	const difference = prevPrice - curPrice
	return ((difference / curPrice) * 100).toFixed(2)
}