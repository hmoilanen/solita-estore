(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-baa66a28"],{"16d0":function(t,e,r){"use strict";var s=r("f042"),i=r.n(s);i.a},a137:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"product-price"},[t.inShop?[r("Base-title",{attrs:{tag:"h3",size:"m"}},[t._v(t._s(t.dynamicPrice(t.product.price)))])]:[r("div",{staticClass:"in-cart",class:t.classing},[r("div",[r("Base-text",{attrs:{size:"s"}},[t._v("Price: ")]),r("Base-text",{attrs:{size:"s",bold:!0}},[t._v(" "+t._s(t.dynamicPrice(t.product.price)))])],1),r("div",[r("Base-text",{attrs:{size:"s"}},[t._v("Total: ")]),r("Base-text",{attrs:{size:"s",bold:!0}},[t._v(" "+t._s(t.dynamicPrice(t.totalPrice)))])],1)])]],2)},i=[],c=(r("b0c0"),{name:"ProductPrice",props:{product:{type:Object,required:!0},narrow:Boolean},computed:{inShop:function(){return"Shop"===this.$route.name},totalPrice:function(){return this.product.price*this.product.amount},classing:function(){return{"narrow-mode":this.narrow}}},methods:{dynamicPrice:function(t){return this.$store.getters["GET_PRICE"](t)}}}),a=c,n=(r("16d0"),r("2877")),o=Object(n["a"])(a,s,i,!1,null,"3272c94e",null);e["default"]=o.exports},f042:function(t,e,r){}}]);
//# sourceMappingURL=chunk-baa66a28.5b96177f.js.map