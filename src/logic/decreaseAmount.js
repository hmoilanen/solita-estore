export default function decreaseAmount(amount, min) {
	return amount > min
		?	amount - 1
		: min
}