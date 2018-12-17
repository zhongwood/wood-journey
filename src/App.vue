<template>
  <div id="app">
    <vHeader :seller="seller"></vHeader>
    <Tab></Tab>
    <router-view :addSell="addSell" :cutSell="cutSell" :sellesShop="sellesShop" :seller="seller" @upDate="upDate"></router-view>
    <ShopCart ref="shopcart" :addSell="addSell" :cutSell="cutSell" @doEmpty="doEmpty" :sellesShop="sellesShop" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></ShopCart>

  </div>
</template>

<script>

import vHeader from './components/header/header.vue'
import ShopCart from './components/shopcart/cart.vue'

import Tab from './components/tab/tab.vue'
const ERR_OK = 0;

export default {
  name: 'App',
  components: {
    vHeader,
    ShopCart,
    Tab
  },
  data() {
    return {
      seller:{},
      sellesShop:[]
    }
  },
  methods:{
    doEmpty(val){
      this.sellesShop = val
    },
    upDate(val) {
      // console.log(1)
      this.sellesShop = val
    },
    addSell(name,price,evnet) {   //增加商品
      // console.log(this.$refs.shopcart)
      this.$refs.shopcart.drop(event.target);
      if (this.sellesShop.length > 0) {
        for(var i = 0 ; i<this.sellesShop.length; i++){
          // console.log(name)
          // console.log(1)
          if (this.sellesShop[i].name == name) {
            // console.log(this.sellesShop[i].name)
            this.sellesShop[i].num++;
            // console.log(2)
            return false;
          }
        }
        this.sellesShop.push({name:name,price:price,num:1})
      }else{
        this.sellesShop.push({name:name,price:price,num:1})
        // console.log(4)
        // console.log(this.sellesShop)
      }
      // console.log(this.sellesShop)
    },
    cutSell(name) {
      this.sellesShop.forEach((food,index) => {
        if (food.name === name) {
          if (food.num <= 1) {
            this.sellesShop.splice(index,1)
          }else{
            food.num--
          }
          // console.log(this.sellesShop)
        }
      })
    }
  },
  created() {
    var _this = this;
    this.$http.get('/api/seller.php').then((res) => {
      res = res.body;
      if (res.errno === 0) {
        _this.seller = res.data;
      }
    })
  }
}
</script>

<style>
@import '../static/css/reset.css'
</style>
