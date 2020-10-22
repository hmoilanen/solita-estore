export default function increaseAmount(amount, max) {
	return amount < max
		?	amount + 1
		: max
}