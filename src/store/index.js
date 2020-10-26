import Vue from 'vue'
import Vuex from 'vuex'

import { valueExists, validateEmail, onlyNumbers } from '@/utils/regex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		currency: 'eu',

		products: [
			// SIIRRÄ NÄMÄ ERILLISEEN JS-FILUUN JA LATAA TÄNNE KÄYNNISTYKSEN YHTEYDESSÄ!
			{
				id: 'jxTCTha12r',
				name: 'Circle',
				description: 'Perfect choice when you don\'t need any corners.',
				price: 999,
				image: ''
			},
			{
				id: 'bXi1CWADoJ',
				name: 'Rectangle',
				description: 'For once, it\'s great idea to think inside the box.',
				price: 899,
				image: ''
			},
			{
				id: 'pI3xIXGPv9',
				name: 'Triangle',
				description: 'A true classic with three elegant corners.',
				price: 1099,
				image: ''
			}
		],
		cart: {
			products: {} // Stored with product.id as a key
		},
		checkout: {
			phase1: {
				main: { id: 1, tag: 'customer', title: 'Tilaaja', validated: false, opened: true },
				email: { value: '', label: 'Sähköpostiosoite', type: 'email', valid: true, pattern: validateEmail }
			},
			phase2: {
				main: { id: 2, tag: 'shipping', title: 'Vastaanottaja', validated: false, opened: false },
				firstName: { value: '', label: 'Etunimi', valid: true, pattern: valueExists },
				lastName: { value: '', label: 'Sukunimi', valid: true, pattern: valueExists },
				address: { value: '', label: 'Katuosoite', valid: true, pattern: valueExists },
				city: { value: '', label: 'Kaupunki', valid: true, pattern: valueExists },
				country: { value: '', label: 'Maa', valid: true, pattern: valueExists },
				phone: { value: '', label: 'Puhelinnumero', type: 'number' }
				//phone: { value: '', label: 'Puhelinnumero (*)', type: 'number', valid: true, pattern: onlyNumbers }
			},
			phase3: {
				main: { id: 3, tag: 'billing', title: 'Maksaja', validated: false, opened: false },
				firstName: { value: '', label: 'Etunimi', valid: true, pattern: valueExists },
				lastName: { value: '', label: 'Sukunimi', valid: true, pattern: valueExists },
				address: { value: '', label: 'Katuosoite', valid: true, pattern: valueExists },
				city: { value: '', label: 'Kaupunki', valid: true, pattern: valueExists },
				country: { value: '', label: 'Maa', valid: true, pattern: valueExists },
				phone: { value: '', label: 'Puhelinnumero', type: 'number' }
				//phone: { value: '', label: 'Puhelinnumero', type: 'number', valid: true, pattern: onlyNumbers }
			},
			phase4: {
				main: { id: 4, tag: 'payment', title: 'Maksusuoritus', validated: false, opened: false },
				cardNumber: { value: '', label: 'Kortin numero', type: 'number', valid: true, pattern: valueExists },
				nameOnCard: { value: '', label: 'Kortin omistaja', valid: true, pattern: valueExists },
				validity: { value: '', label: 'Voimassa', type: 'number', valid: true, pattern: valueExists },
				security: { value: '', label: 'CVV', type: 'number', valid: true, pattern: valueExists }
			},
		} 
	},
	
  getters: {
		GET_PRICE: state => price => {
			const euro = state.currency === 'eu'
			const conversionRate = euro ? 1 : 1.18
			const convertedPrice = price * conversionRate
			const type = euro ? '€' : '$'

			return euro
				? convertedPrice + type
				: type + convertedPrice
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

		ALL_CHECKOUT_PHASES_VALIDATED: state => {
			let allPhasesValidated = true

			for (let phase in state.checkout) {
				if (!state.checkout[phase].main.validated) {
					allPhasesValidated = false
					break
				}
			}

			return allPhasesValidated
		},

		GET_CUSTOMER_DATA: state => {
			let customer = {}

			for (const phase in state.checkout) {
				const { main, ...fields } = state.checkout[phase]
				customer[main.tag] = {}
				for (const field in fields) {
					customer[main.tag][field] = fields[field].value
				}
			}

			return customer
		}
	},

  mutations: {
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

		UPDATE_PRODUCT_AMOUNT: (state, { productId, amount }) => {
			Vue.set(state.cart.products[productId], 'amount', amount)

			// Set products in local storage / 'mimic' backend
			storageProducts(state)
		},

		REMOVE_PRODUCT_FROM_CART: (state, productId) => {
			Vue.delete(state.cart.products, productId)

			// Set products in local storage / 'mimic' backend
			storageProducts(state)
		},

		SET_CART: (state, localStorageData ) => {
			Vue.set(state.cart, 'products', localStorageData)
		},

		UPDATE_CHECKOUT_PHASE: (state, { phaseFields, phaseId, duplicated }) => {
			const currentPhase = state.checkout[`phase${phaseId}`]

			// Set all values of the corresponding fields in store and validate them (for UI)
			for (const field in phaseFields) {
				Vue.set(currentPhase[field], 'value', phaseFields[field])
				Vue.set(currentPhase[field], 'valid', true)
				
				// If billing information is same as shipping, update accordingy
				if (duplicated) {
					Vue.set(state.checkout[`phase${phaseId + 1}`][field], 'value', phaseFields[field])
				}
			}

			// Validate and close current phase
			Vue.set(currentPhase.main, 'validated', true)
			Vue.set(currentPhase.main, 'opened', false)
			
			// Open next not-validated phase
			const amountOfPhases = Object.keys(state.checkout).length

			for (let i = 1; i <= amountOfPhases; i++) {
				const mainOfPhase = state.checkout[`phase${i}`].main

				if (!mainOfPhase.validated) {
					Vue.set(mainOfPhase, 'opened', true)
					break
				}
			}
		},

		EDIT_CHECKOUT_PHASE: (state, phaseId) => {
			// First close currently opened phase...
			for (const phase in state.checkout) {
				const mainOfPhase = state.checkout[phase].main
				if (mainOfPhase.opened) {
					Vue.set(mainOfPhase, 'opened', false)
				}
			}

			// ...then open to-be-edited phase
			Vue.set(state.checkout[`phase${phaseId}`].main, 'validated', false)
			Vue.set(state.checkout[`phase${phaseId}`].main, 'opened', true)
		},

		INVALIDATE_CHECKOUT_PHASE_FIELD: (state, { phaseId, field }) => {
			Vue.set(state.checkout[`phase${phaseId}`][field], 'valid', false)
		}
	},
	
  actions: {
		ADD_PRODUCT_TO_CART: ({commit}, { product, amount }) => {
			commit('ADD_PRODUCT_TO_CART', { product, amount })
		},
		
		UPDATE_PRODUCT_AMOUNT: ({ commit }, { productId, amount }) => {
			commit('UPDATE_PRODUCT_AMOUNT',  { productId, amount })
		},

		REMOVE_PRODUCT_FROM_CART: ({ commit }, productId) => {
			commit('REMOVE_PRODUCT_FROM_CART', productId)
		},

		SET_CART: ({commit}, localStorageData) => {
			commit('SET_CART', localStorageData)
		},

		UPDATE_CHECKOUT_PHASE: ({ commit }, { phaseFields, phaseId, duplicated }) => {
			commit('UPDATE_CHECKOUT_PHASE', { phaseFields, phaseId, duplicated })
		},

		EDIT_CHECKOUT_PHASE: ({commit}, phaseId) => {
			commit('EDIT_CHECKOUT_PHASE', phaseId)
		},

		INVALIDATE_CHECKOUT_PHASE_FIELD: ({ commit }, { phaseId, field }) => {
			commit('INVALIDATE_CHECKOUT_PHASE_FIELD', { phaseId, field })
		}
	},
	
  modules: {
  }
})

// For clearing old and storing updated products in local storage
function storageProducts(state) {
	const ls = window.localStorage
	const key = 'whee-products'

	ls.removeItem(key)
	ls.setItem(key, JSON.stringify(state.cart.products))
}
