import Vue from 'vue'
import Vuex from 'vuex'

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
		}
	},
	
  getters: {
		//GET_PRICE (with custom currency!)
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
		}
	},
	
  actions: {
		ADD_PRODUCT_TO_CART: ({commit}, product) => {
			commit('ADD_PRODUCT_TO_CART', product)
		}
	},
	
  modules: {
  }
})
