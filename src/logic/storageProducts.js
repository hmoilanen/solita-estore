// For clearing old and storing updated products in local storage
export default function(state) {
	const ls = window.localStorage
	const key = 'whee-products'

	ls.removeItem(key)

	if (state) {
		ls.setItem(key, JSON.stringify(state.cart.products))
	}
}