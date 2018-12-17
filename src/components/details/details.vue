<template>
	<div class="details" ref="details">
		<div class="d-wrapper">
			
			<div class="d-heade">
				<img class="big-img" :src="food.image"><!---
				--><div class="d-item border-1px">
					<!-- <div class="border-1px"></div> -->
					<div class="d-item-body">
						<div class="d-item-main">
							<div class="heade">
								<div class="title">{{food.name}}</div>
								<div class="d-f">
									<span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
							</div>
							<div class="price-cart">
								<div class="price">
									<span>￥<span>{{food.price}}</span>
									</span><s v-if="food.oldPrice!=''" class="old-price">￥{{food.oldPrice}}</s>
								</div>
								<div class="cart">
									<transition name="cart">
										<span v-if="!cartShow" @click="addSell(food.name,food.price)">加入购物车</span>
									</transition>
									<transition name="CartControl">
										<CartControl class="CartControl" :name="food.name" :price="food.price" :sellesShop="sellesShop" :cutSell="cutSell" :addSell="addSell" v-if="cartShow"></CartControl>
									</transition>
								</div>
							</div>
						</div><!-- d-item-main -->
					</div><!-- d-item-body -->
				</div><!-- d-item -->
			</div>
			<div class="d-info" v-if="food.info != ''&& food.info">
				<div class="d-item border-1px">
					<div class="border-1px"  style="opacity: 0.1"></div>
					<div class="d-item-body">
						<div class="title">商品介绍</div>
						<div class="d-item-main">
							{{food.info}}
						</div>
					</div>
				</div>
			</div>
			<RatingSelect :ratings="food.ratings"></RatingSelect>
		</div>
		<div class="native native-hook">
			<div class="button" @click="back()">
				<span class="icon-arrow_lift"></span>
			</div>
		</div>
	</div>
</template>

<script>
import RatingSelect from '../ratingselect/ratingselect.vue'
import CartControl from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'

export default {
	props:{
		sellesShop:{
			type:Array
		},
		addSell:{
			type:Function
		},
		cutSell:{
			type:Function
		}
	},
	components:{
		RatingSelect,CartControl
	},
	data() {
		return {
			food:{},
			foodName:''
		}
	},
	computed:{
		cartShow() {
			
			for(let i=0;i<this.sellesShop.length;i++){
				if (this.sellesShop[i].name == this.foodName) {
					return true
				}
			}
		}
	},
	methods:{
		back() {
			window.history.back(-1)
		},
		nativeOpacity(h){
			// console.log(h)
			var Y = -h
			let nav = this.$el.getElementsByClassName('native-hook')[0];
			let op = (Y*2)/100;
			if (Y <= 50) {
				// console.log(op)
				nav.style.backgroundColor = `rgba(255,255,255,${op})`;
				nav.style.boxShadow = `0 2px 4px 0 rgba(0,0,0,${op/5})`
			}else{
				nav.style.backgroundColor = 'rgb(255,255,255)';
				nav.style.boxShadow = '0 1px 4px 0 rgba(0,0,0,0.2)'
			}
		}
	},
	created() {

		var _this = this;
		this.foodName = this.$route.params.name;
		// console.log(this.foodName)
		this.$http.get('/api/goods.php').then((res) => {
			var arr = res.body;
			if (arr.errno === 0) {
				arr.data.forEach((val) => {
					val.foods.forEach((value)=>{
						if (value.name === this.foodName) {
							_this.food = value;
							return
						}
					})
				})
				// window.location.href="/goods"
			}
			this.$nextTick(()=>{
				this.detailsScroll = new BScroll(this.$refs.details,{
					probeType:3,
					click:true
				});
				this.detailsScroll.on('scroll',(pos) => {
					var clientY=Math.round(pos.y) //实时获取滑动高度
					// console.log(this.clientY)
					this.nativeOpacity(clientY)
				})
			})
		})
	}
}

</script>

<style lang='stylus'>
.details
	position:fixed
	top:0
	left:0
	height:100%
	overflow:auto
	font-size:12px
	background-color:#f3f5f7
	z-index:10
	.native
		position:fixed
		top:0
		left:0
		height:46px
		z-index:100
		background-color:rgba(255,255,255,0)
		box-shadow:none
		width:100%
		.button
			display:inline-block
			width:30px
			height:30px
			background-color:rgba(255,255,255,.5)
			margin:8px 18px
			/*text-align:center*/
			border-radius:50%
			/*padding:0 18px*/
		span
			line-height:30px
			display:inline-block
			font-size:24px
			padding-top:1px
			margin-left:1px
	.d-item
		background-color:#fff
		.d-item-body
			padding:18px
			.d-item-main
				.title
					font-size:14px
					margin-bottom:6px
	.d-wrapper
		padding-bottom:46px
		.d-heade
			width:100vw
			.big-img
				height:357px
				width:100%
				padding:0
				margin:0
			.d-item
				.heade
					.d-f
						color:rgb(147,153,159)
						margin-top:2px
						span:last-child
							padding-left:12px
					.title
						font-weight:700
				.price-cart
					margin-top:18px
					.price
						font-size:10px
						color:rgb(240,20,20)
						line-height:24px
						display:inline-block
						span
							span
								font-size:14px
								font-weight:700
						s
							font-size:10px
							color:rgb(147,153,159)
							line-height:24px
							padding-left:8px
					.cart
						display:inline-block
						float:right
						height:24px
						position:relative
						.CartControl
							margin-top:-6px
							margin-right:-5px
							overflow:hidden
							white-space:nowrap
							animation: bouncein 0.4s linear
							position:absolute
							right:0
						span
							display:block
							font-size:10px
							color:#fff
							line-height:24px
							text-align:center
							background-color:rgb(0,160,220)
							border-radius:12px
							overflow:hidden
							white-space:nowrap
							width:74px
							position:absolute
							right:0
							z-index:10
							transition:all .4s cubic-bezier(0, 0, 0, 1.25)
							&.cart-enter,&.cart-leave
								opacity:1
								width:74px
							&.cart-enter,&.cart-leave-to
								animation: 0.4s all
								opacity:0
								width:24px
		.d-info
			margin-top:12px
			.title
				font-size:14px
				line-height:14px
				margin-bottom:6px
			.d-item-main
				font-size:12px
				font-weight:200
				color:rgb(147,153,159)
				line-height:24px
				margin-left:8px
		.ratings-main
			.ratings-class
				.title
					display:block
			.rating-lists
				padding:0 18px
				.default-li
					text-align:center
					color:#93999f
				li
					padding-bottom:16px
					padding-top:16px
				.user-heade
					font-size:10px
					display:flex
					.user-img
						width:12px
						position:absolute
						right:0
						height:12px
					.user-date
						display:inline-block
						flex:1
						margin:0
						.user-name
							color:rgb(147,153,159)
							.name
								float:right
								line-height:12px
								margin-right:18px
							.time
								float:left
						.user-star
							margin-top:4px
							.v-star
								display:none
							
				.ratings-text
					margin:0
					margin-top:6px
					.text
						font-size:12px
						line-height:18px
						display:inline-block
						margin-left:4px
					.foot
						display:inline-block
						line-height:18px
						float:left
						margin:0
						.recommend
							display:none
@keyframes bouncein
	1%
		opacity:0
	40%
		opacity:0
	100%
		opacity:1 
</style>
