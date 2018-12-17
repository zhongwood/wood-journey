<template>
	<div class="goods">
		<div class="left-wrapper" ref="menuLists">
			<ul>
				<li ref="menuList" v-for="(value,index) in goods" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
					<span class="text border-1px">
						<img v-show="value.type>0" :src="supportImg[value.type]"></img>{{value.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="foodsLists">
			<ul>
				<li v-for="menu in goods" ref="foodsList">
					<div class="goods-heade">{{menu.name}}</div>
					<div v-for="food in menu.foods" class="goods-item" >
						<div class="goods-main border-1px" @click="toDetail(food.name)">
							<div class="goods-img"><img :src="food.icon"></div><div class="goods-text">
								<div class="goods-title">{{food.name}}</div>
								<div v-if="food.description" class="goods-description">{{food.description}}</div>
								<div class="goods-detail">
									<span class="sellCount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="goods-price">
									<span class="price">￥<span>{{food.price}}</span></span>
									<s class="old-price" v-if="food.oldPrice">￥<span>{{food.oldPrice}}</span></s>
								</div>
							</div><!-- goods-text -->
						</div><!---goods-main---->
						
						<div class="cartcontrol-wrapper">
							<CartControl :name="food.name" :price="food.price" :sellesShop="sellesShop" :cutSell="cutSell" :addSell="addSell" ></CartControl>
						</div>
					</div><!---goods-item---->
				</li>
			</ul>
		</div>
		<!-- <ShopCart @update="doEmpty" :sellesShop="sellesShop" :cutSell="cutSell" :addSell="addSell" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></ShopCart> -->
	</div>
</template>
<script type="text/javascript">
import decrease from '../../common/img/decrease_3@2x.png'
import discount from '../../common/img/discount_3@2x.png'
import guarantee from '../../common/img/guarantee_3@2x.png'
import invoice from '../../common/img/invoice_3@2x.png'
import special from '../../common/img/special_3@2x.png'

import BScroll from 'better-scroll'

import ShopCart from '../shopcart/cart.vue'
import CartControl from '../cartcontrol/cartcontrol.vue'

const ERR_OK = 0;

export default {
	name: 'goods',
	components:{
   	 ShopCart,
   	 CartControl
	},
	props:{
		seller:Object,
		sellesShop:Array,
		addSell:Function,
		cutSell:Function
	},
	data() {
		return {
			goods:[],
			supportImg:[decrease,discount,guarantee,invoice,special],
			listHeight:[],
			clientY:0
		}
	},
	computed:{
		currentIndex() {
			for(let i=0;i<this.listHeight.length;i++){
				let H1 = this.listHeight[i];
				let H2 = this.listHeight[i+1];
				if (!H2 || (this.clientY>=H1 && this.clientY<H2)) {
					//菜单栏保持高亮选项在第二个
					let el1 = this.$refs.menuList[i-2];
					this.menuScroll.scrollToElement(el1,'1000')
					
					return i
				}
			}
			return 0
		}
	},
	created(){
		this.$http.get('./api/goods.php').then((res) => {
			res = res.body;
			if (res.errno === ERR_OK) {
				this.goods = res.data;
				this.$nextTick(() => {
					this._initScroll();
					this._getListHeight();
					// console.log(this.listHeight)
				})
			}
		})
	},
	methods:{
		toDetail(name) {
			this.$router.push({
	          path: `/detail/${name}`,
	        })
		},
		selectMenu(index) { 
			// console.log(index)
			let el = this.$refs.foodsList[index];
			this.foodsScroll.scrollToElement(el,'300') //滑动到指定el

		},
		_initScroll() {
			//实例化better-scroll
			this.menuScroll = new BScroll(this.$refs.menuLists,{
				probeType:3,
				click:true
			});
			this.foodsScroll = new BScroll(this.$refs.foodsLists,{
				probeType:3,
				click:true
			});
			this.foodsScroll.on('scroll',(pos) => {
				this.clientY=Math.abs(Math.round(pos.y)) //实时获取滑动高度
				// console.log(this.clientY)
			})
		},
		_getListHeight() {
			let foodsList = this.$refs.foodsList; //定义一个数组存储各list区间高度
			let height = 0;
			this.listHeight.push(height);
			for(let i = 0;i<foodsList.length;i++){
				height += foodsList[i].clientHeight;
				this.listHeight.push(height);
			}
		}
	},
	watch:{
		sellesShop:function(val,oldval){
			// console.log(val)
			this.$emit("upDate",val)
		}
	}
}
</script>
<style lang='stylus'>
.goods
	position:absolute
	display:flex
	top:172px
	bottom:46px
	overflow:hidden
	width:100%
	.left-wrapper
		flex:0 0 80px
		width: 80px
		overflow:auto
		/*margin-top:1px*/
		background-color:#f3f5f7
		.current
			background-color:#fff
			position:relative
			z-index:10
			margin-top:-1px
			.text
				font-weight:700
			.border-1px
				&:after
					display:none
		li
			font-size:12px
			line-height:14px
			height:54px
			padding:0 12px
			display:table
			img 
				width:12px
				height:12px
				vertical-align:top
				margin-right:2px
			.text
				display:table-cell
				vertical-align:middle
				width:56px
				height:100%
	.goods-wrapper
		flex:1
		overflow:auto
		.goods-heade
			background:#f3f5f7
			height:26px
			font-size:12px
			line-height:26px
			color:rgb(147,153,159)
			padding-left:12px
			border-left:2px solid #d9dde1
		.goods-item
			position:relative
			&:last-child
				margin-bottom:18px
				.border-1px
					&:after
						display:none
			.cartcontrol-wrapper
				display:inline-block
				position:absolute
				right:13px
				bottom:8px
			.goods-main
				margin:18px
				display:flex
				margin-bottom:0
				padding-bottom:18px
				.goods-img
					img
						width:64px
						height:64px
						border-radius:2px
				.goods-text
					margin-left:10px
					vertical-align:top
					width:70%
					.goods-title
						font-size:14px
						line-height:14px
						color:rgb(7,17,27)
						margin-top:2px
					.goods-description
					.goods-detail
						font-size:10px
						line-height:10px
						color:rgb(147,153,159)
						margin-top:8px
						.sellCount
							margin-right:12px
					.goods-price
						font-size:10px
						font-weight:normal
						line-height:24px
						.price
						.old-price
							span
								font-weight:700
						.price
							color:rgb(240,20,20)
							span
								font-size:14px
						.old-price
							color:rgb(147,153,159)

		
			
</style>