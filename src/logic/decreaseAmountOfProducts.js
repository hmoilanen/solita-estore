export default function decreaseAmountOfProducts(amount, min) {
	return amount > min
		?	amount - 1
		: min
}