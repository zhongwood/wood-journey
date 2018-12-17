import Vue from 'vue'
import VueRouter from 'vue-router'
//1. 引入路由组件
import Goods from '../components/goods/goods.vue'
import Ratings from '../components/ratings/ratings.vue'
import Seller from '../components/seller/seller.vue'
import Detail from '../components/details/details.vue'

//路由依赖
Vue.use(VueRouter)

// 2. 定义路由
const routes = [
	{path:'*',redirect:'/goods'},
	{path:'/',redirect:'/goods'},
	{path:'/goods',component:Goods},
	{path:'/ratings',component:Ratings},
	{path:'/seller',component:Seller},
	{path:'/detail/:name',component:Detail}
]

export default new VueRouter({
	// mode:'history', //去掉导航 /#/
	routes
})

