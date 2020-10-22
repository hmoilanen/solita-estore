export default function increaseAmountOfProducts(amount, max) {
	return amount < max
		?	amount + 1
		: max
}