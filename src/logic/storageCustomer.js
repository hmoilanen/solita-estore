// For clearing old and storing updated customer information to local storage
export default function(customerData) {
	console.log(customerData);
	const ls = window.localStorage
	const key = 'whee-customer'

	ls.removeItem(key)

	if (Object.keys(customerData).length > 0) {
		ls.setItem(key, JSON.stringify(customerData))
	}

	console.log(ls);
}