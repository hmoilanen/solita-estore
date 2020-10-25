import Vue from 'vue'
import Vuex from 'vuex'

import { valueExists, onlyNumbers, validateEmail } from '@/utils/regex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		//currency: 'eu', // OTA MYÖHEMMIN KÄYTTÖÖN
		products: [
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
				firstName: { value: '', label: 'Etunimi', pattern: valueExists },
				lastName: { value: '', label: 'Sukunimi', pattern: valueExists },
				address: { value: '', label: 'Katuosoite', pattern: valueExists },
				city: { value: '', label: 'Kaupunki', pattern: valueExists },
				country: { value: '', label: 'Maa', pattern: valueExists },
				phone: { value: '', label: 'Puhelinnumero (*)', type: 'number', pattern: onlyNumbers }
			},
			phase3: {
				main: { id: 3, tag: 'billing', title: 'Maksaja', validated: false, opened: false },
				firstName: { value: '', label: 'Etunimi', pattern: valueExists },
				lastName: { value: '', label: 'Sukunimi', pattern: valueExists },
				address: { value: '', label: 'Katuosoite', pattern: valueExists },
				city: { value: '', label: 'Kaupunki', pattern: valueExists },
				country: { value: '', label: 'Maa', pattern: valueExists },
				phone: { value: '', label: 'Puhelinnumero (*)', type: 'number', pattern: onlyNumbers }
			},
			phase4: {
				main: { id: 4, tag: 'payment', title: 'Maksusuoritus', validated: false, opened: false },
				cardNumber: { value: '', label: 'Kortin numero', type: 'number', pattern: valueExists },
				nameOnCard: { value: '', label: 'Kortin omistaja', pattern: valueExists },
				validity: { value: '', label: 'Voimassa', type: 'number', pattern: valueExists },
				security: { value: '', label: 'CVV', type: 'number', pattern: valueExists }
			},
		} 
	},
	
  getters: {
		//GET_PRICE (with custom currency!)

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
		ADD_PRODUCT_TO_CART: (state, product) => {
			const productsInCart = state.cart.products
			let productToAdd = { ...product, amount: 1 }

			// If similar product is aready added to cart
			// just increase it's amount property.
			if (productsInCart[product.id]) {
				productToAdd.amount = productsInCart[product.id].amount + 1
			}

			Vue.set(state.cart.products, product.id, productToAdd)
		},

		UPDATE_CHECKOUT_PHASE: (state, { phaseFields, phaseId, duplicated }) => {
			const currentPhase = state.checkout[`phase${phaseId}`]

			// Set all values of the corresponding fields in store
			for (const field in phaseFields) {
				Vue.set(currentPhase[field], 'value', phaseFields[field])
				
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

		EDIT_PHASE: (state, phaseId) => {
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
		}
	},
	
  actions: {
		ADD_PRODUCT_TO_CART: ({commit}, product) => {
			commit('ADD_PRODUCT_TO_CART', product)
		},

		UPDATE_CHECKOUT_PHASE: ({ commit }, { phaseFields, phaseId, duplicated }) => {
			commit('UPDATE_CHECKOUT_PHASE', { phaseFields, phaseId, duplicated })
		},

		EDIT_PHASE: ({commit}, phaseId) => {
			commit('EDIT_PHASE', phaseId)
		},
	},
	
  modules: {
  }
})
