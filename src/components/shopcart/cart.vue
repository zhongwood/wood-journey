<template>
	<div class="shop-cart">
		<div class="cart-content" @click="listShow">
			<div class="cart-icon" :class="{'cart-active':totalCount>0}">
				<i class="icon-shopping_cart"></i>
				<span v-if="totalCount>0" class="sup-num">{{totalCount}}</span>
			</div><div class="cart-text">
				<span class="all-price">￥{{totalPrice}}</span><span class="deliveryprice">另需配送费￥{{deliveryPrice}}元</span>
			</div><div @click.stop="doPlay" class="cart-play" :class="{'go-pay':minPrice-totalPrice<=0}">
				<span>{{payDesc()}}</span>
				<!-- <span v-else-if="minPrice-totalPrice>0">还差￥{{minPrice-totalPrice}}起送</span>
				<span v-else class="go-pay">去购买</span> -->

			</div>
		</div>
		
		<div class="sell-lists">
			<transition name="bg-hidde">
				<div @click="listShow" class="bg" v-if="sellListShow && sellesShop.length>0"></div>
			</transition>
			<transition name="hidde">
				<div class="sell-lists-wrapper" v-if="sellListShow && sellesShop.length>0">
					<div class="list-heade border-1px">
						<span class="title">购物车</span>
						<a @click="doEmpty()" class="empty">清空</a>
					</div>
					<div class="scroll-wrapper" ref="scrollLists">
						<ul>
							<li class="list-main border-1px" v-for="food in sellesShop">
								<span class="name">{{food.name}}</span>
								<div class="float-right">
									<span class="price"><span>￥</span>{{food.price}}</span><!--
									--><CartControl class="cart-control" :name="food.name" :price="food.price" :sellesShop="sellesShop" :cutSell="cutSell" :addSell="addSell" ></CartControl>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<!-- 动画小球 -->
		<div class="ball-wrapper">
			<div v-for="ball in balls">
				<transition name="drop" @before-enter="beforeDrop" @enter="droping" @after-enter="afterDrop">
					<div v-show="ball.show" class="ball">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		
	</div>
</template>

<script>
import CartControl from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'

export default {
	components:{
		CartControl
	},
	props:{
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		},
		sellesShop:{
			type:Array,
			default() {
				return []
			}
		},
		cutSell:{
			type:Function
		},
		addSell:{
			type:Function
		}
	},
	data() {
		return {
			sellListShow:false,
			balls:[
				{show:false},
				{show:false},
				{show:false},
				{show:false},
				{show:false}
			],
			dropBalls: []
		}
	},
	computed:{
		totalPrice() {
			let total = 0;
			this.sellesShop.forEach((food) => {
				total += food.num*food.price;
				// this.drop()
			})
			return total
		},
		totalCount() {
			let num = 0;
			this.sellesShop.forEach((food) => {
				num += food.num
			})
			return num
		}
	},
	methods:{
		beforeDrop(el) {
			let count = this.balls.length;
			while(count--){										//遍历小球
				let ball = this.balls[count];
				if (ball.show) {

					let rect = ball.el.getBoundingClientRect(); //获取元素相对视口位置
					let x = rect.left-38;						//初始化位置
					let y = -(window.innerHeight - rect.top -20);

					el.style.display = '';
					el.style.webkitTransform = `translate3D(0,${y}px,0)`;
					el.style.transform = `translate3D(0,${y}px,0)`;

					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = `translate3D(${x}px,0,0)`;
					inner.style.transform = `translate3D(${x}px,0,0)`;

				}
			}
		},
		droping(el,done) {
			/* eslint-disable no-unused-vars */
			let rf = el.offsetHeight;
			this.$nextTick(() => {
				el.style.webkitTransform = 'translate3D(0,0,0)';
				el.style.transform = 'translate3D(0,0,0)';

				let inner = el.getElementsByClassName('inner-hook')[0];
				inner.style.webkitTransform = 'translate3D(0,0,0)';
				inner.style.transform = 'translate3D(0,0,0)';

				el.addEventListener('transitionend',done)
			})
		},
		afterDrop(el) {
			let ball = this.dropBalls.shift();
			if (ball) {
				ball.show = false;
				el.style.display = "none"
			}
		},
		drop(el) {		//接收获取增加购物车时点击元素，并添加到每个ball中
			// console.log(el.getBoundingClientRect());
			for(let i=0;i<this.balls.length;i++){
				let ball = this.balls[i];
				if (!ball.show) {
					ball.show = true;
					ball.el = el;
					this.dropBalls.push(ball);
					return;
				}
			}
		},
		listShow() {
			if(this.sellesShop.length>0){
				this.sellListShow = !this.sellListShow
				if (this.sellListShow) {
					this.$nextTick(() => {
							
						this.scroll = new BScroll(this.$refs.scrollLists,{
							click:true
						})
					
					})
				}	
			}
		},
		doPlay() {
			if(this.totalPrice>=this.minPrice){
				var p = confirm("确认支付"+this.totalPrice+"元？")
				if (p) {
					alert("支付成功")
				}
			}
		},
		doEmpty() {
			// this.sellesShop = [];
			this.$emit('doEmpty',[])
			this.sellListShow = false
		},
	      payDesc() {
	        if (this.totalPrice === 0) {
	          return `￥${this.minPrice}元起送`;
	        } else if (this.totalPrice < this.minPrice) {
	          let diff = this.minPrice - this.totalPrice;
	          return `还差￥${diff}元起送`;
	        } else {
	          return '去结算';
	        }
      }
	},
	watch:{
		sellesShop:function(val,oalval) {
			if (val.length<=0) {
				this.sellListShow = false
			}
		},
	}
}

</script>

<style lang='stylus'>
.shop-cart
	/*height:100%*/
	bottom:0px
	position:fixed
	z-index:100
	width:100%
	left:0
	.cart-content
		z-index:10
		color:rgba(255,255,255,.4)
		position:absolute
		bottom:0
		background-color:#141d27
		width:100%
		height:46px
		.cart-text
		.cart-play
			display:inline-block
			height:100%
			vertical-align:top
			line-height:46px

		.cart-icon
			font-size:24px
			display:inline-block
			width:44px
			height:44px
			border-radius:50%
			position:relative
			/*overflow:hidden*/
			background-color:#141d27
			border:6px solid #141d27
			margin-left:18px
			margin-top:-8px
			i
				border-radius:50%
				background-color:rgba(255,255,255,.2)
				display:block
				width:100%
				height:100%
				text-align:center
				line-height:44px
		.cart-active
			color:#fff
			background-color:rgb(0,160,200)
			.sup-num
				display:block
				position:absolute
				z-index:100
				min-width:8px
				top:-6px
				right:-6px
				font-size:9px
				font-weight:700
				line-height:18px
				text-align:center
				color:#fff
				background-color:rgb(250,20,20)
				height:18px
				padding:0 6px
				border-radius:9px
				box-shadow:0 2px 4px 0 rgba(0,0,0,.4)
		.cart-text
			margin-left:18px
			.all-price
				font-size:16px
				font-weight:700
				&:after
					border-right:1px solid rgba(255,255,255,0.1)
					content: '' 
					padding-left:12px
			.deliveryprice
				margin-left:12px
				font-size:10px
		.cart-play
			font-size:12px
			width:105px
			position:absolute
			right:0
			background-color:rgba(255,255,255,0.2)
			text-align:center
			&.go-pay
				background-color:#00b43c
				color:#fff
			span
				font-weight:700
	.sell-lists
		position:absolute
		left:0
		bottom:0
		padding-bottom:50px
		width:100%
		/*height:100vh*/
		.bg
			width:100%
			height:150vh
			background-color:rgba(7,17,27,.6)
			position:absolute
			bottom:0
			transition:all .2s linear
			&.bg-hidde-enter,&.bg-hidde-leave
				opacity:1
				/*transform:translateY(0)*/
			&.bg-hidde-enter,&.bg-hidde-leave-to
				opacity:0
				/*transform:translateY(100vh)*/
		.sell-lists-wrapper
			/*max-height:50vh*/
			background-color:#fff
			position:absolute
			left:0
			bottom:0
			width:100%
			padding-bottom:46px
			border-radius: 5px
			overflow:hidden
			transition:all .2s linear
			&.hidde-enter,&.hidde-leave
				opacity:1
				transform:translateY(0)
			&.hidde-enter,&.hidde-leave-to
				opacity:0
				transform:translateY(100vh)
			.list-heade
				display:block
				position:absolute
				top:0
				left:0
				z-index:10
				width:100%
				color:rgb(7,17,27)
				font-size:14px
				height:40px
				background-color:#f3f5f7
				line-height:40px
				/*border-radius: 3px*/
				.title
					padding-left:18px
				.empty
					color:rgb(0,160,220)
					float:right
					padding-right:18px
			.scroll-wrapper
				max-height:50vh
				margin-top:41px
				overflow:auto
				.list-main
					height:48px
					margin: 0 18px
					.name
						line-height:48px
					.float-right
						float:right
						display:inline-block
						height:100%
						.price
							font-weight:700
							display:inline-block
							color:rgb(240,20,20)
							line-height:48px
							vertical-align:top
							margin-right:7px
						.cart-control
							display:inline-block
							margin-top:7px
	.ball-wrapper
		.ball
			position:fixed
			left:38px
			z-index:200
			bottom:20px
			transition:all .4s cubic-bezier(0.4,-0.22, 0.93, 0.35)
			.inner
				width:16px
				height:16px
				background-color:rgb(0,160,220)
				border-radius:50%
				transition:all .4s linear



</style>