import Vue from 'vue'
import Vuex from 'vuex'

import storageProducts from '@/logic/storageProducts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		currency: 'eu',
		products: [], // Stored from @/store/productData.js when app initiates to mimic database
		cart: {
			products: {} // Stored with product.id as a key
		}
	},
	
  getters: {
		GET_PRICE: state => price => {
			const euro = state.currency.toLowerCase() === 'eu'
			const conversionRate = euro ? 1 : 1.18
			const convertedPrice = price * conversionRate
			const type = euro ? '€' : '$'

			return euro
				? convertedPrice + type
				: type + convertedPrice.toFixed(2)
		},

		TOTAL_AMOUNT_OF_PRODUCTS_IN_CART: state => {
			const products = state.cart.products
			let totalAmount = 0

			for (const product in products) {
				totalAmount += products[product].amount
			}

			return totalAmount
		},

		SUMMARY_OF_PRODUCT_PRICES: state => {
			const products = state.cart.products
			let subtotal = 0

			for (const product in products) {
				subtotal += (products[product].amount * products[product].price)
			}

			return subtotal
		},

		PARSED_PRODUCTS_IN_CART: state => {
			const products = state.cart.products
			const parsedProducts = {}

			for (const product in products) {
				const parsedProduct = {
					name: products[product].name,
					amount: products[product].amount
				}

				parsedProducts[products[product].id] = parsedProduct
			}

			return parsedProducts
		}
	},

  mutations: {
		STORE_PRODUCTS: (state, products) => {
			Vue.set(state, 'products', products)
		},

		ADD_PRODUCT_TO_CART: (state, { product, amount }) => {
			const productsInCart = state.cart.products
			let productToAdd = { ...product, amount }

			// If similar product is aready added to cart just increase the amount
			if (productsInCart[product.id]) {
				const newAmount = productsInCart[product.id].amount + amount

				Vue.set(productsInCart[product.id], 'amount', newAmount)
			} else {
				// Add the new product to cart
				Vue.set(state.cart.products, product.id, productToAdd)
			}

			// Set products in local storage / 'mimic' backend
			storageProducts(state)
		},

		UPDATE_PRODUCT_AMOUNT_IN_CART: (state, { productId, amount }) => {
			Vue.set(state.cart.products[productId], 'amount', amount)

			// Set products in local storage / 'mimic' backend
			storageProducts(state)
		},

		REMOVE_PRODUCT_FROM_CART: (state, productId) => {
			Vue.delete(state.cart.products, productId)

			// Set products in local storage / 'mimic' backend
			storageProducts(state)
		},

		CLEAR_CART: state => {
			Vue.delete(state.cart, 'products')
			Vue.set(state.cart, 'products', {})

			// Clear local storage
			storageProducts()
		},

		SET_CART: (state, localStorageData ) => {
			// For filling the cart with product data from localStorage.
			// Mimics backend / database.
			Vue.set(state.cart, 'products', localStorageData)
		},

		SET_CURRENCY: (state, currency) => {
			Vue.set(state, 'currency', currency)
		}
	},
	
  actions: {
		STORE_PRODUCTS: ({ commit }, products) => {
			commit('STORE_PRODUCTS', products)
		},

		ADD_PRODUCT_TO_CART: ({commit}, { product, amount }) => {
			commit('ADD_PRODUCT_TO_CART', { product, amount })
		},
		
		UPDATE_PRODUCT_AMOUNT_IN_CART: ({ commit }, { productId, amount }) => {
			commit('UPDATE_PRODUCT_AMOUNT_IN_CART',  { productId, amount })
		},

		REMOVE_PRODUCT_FROM_CART: ({ commit }, productId) => {
			commit('REMOVE_PRODUCT_FROM_CART', productId)
		},

		CLEAR_CART: ({ commit }) => {
			commit('CLEAR_CART')
		},

		SET_CART: ({commit}, localStorageData) => {
			commit('SET_CART', localStorageData)
		},

		SET_CURRENCY: ({ commit }, currency) => {
			commit('SET_CURRENCY', currency)
		}
	}
})
