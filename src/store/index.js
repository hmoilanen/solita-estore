import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		currency: 'eu',
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
			products: [
				/* product: {
					amount: 0,
					price: 0,
					name: '',
					description: ''
				} */
			],
			sum: 0
		}
	},
	
  getters: {
		//GET_PRICE
	},

  mutations: {
	},
	
  actions: {
	},
	
  modules: {
  }
})
