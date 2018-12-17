<template>
	<div class="seller" ref="seller">
		<div class="s-wrapper">
			<div class="s-header border-1px">
				<div class="s-title border-1px">
					<div class="s-name">
						<span class="title">{{seller.name}}</span>
						<div class="s-star">
							<span class="star"><Star :score="seller.score" :size="36"></Star>
							</span><span class="rating-count">({{seller.ratingCount}})
							</span><span class="sell-count">月售{{seller.sellCount}}单</span>
						</div>
					</div>
					<div @click="collected()" class="favorite" :class="{'collected':isCollect}">
						<span class="icon-favorite"></span>
						<span class="favorite-text">{{collect}}</span>
					</div>
				</div><!-- s-title -->
				<div class="s-data">
					<div class="s-item">
						<div class="title">起送价</div>
						<div class="text"><span>{{seller.minPrice}}</span>元</div>
					</div>
					<div class="s-item">
						<div class="title">商家配送</div>
						<div class="text"><span>{{seller.deliveryPrice}}</span>元</div>
					</div>
					<div class="s-item">
						<div class="title">平均配送时间</div>
						<div class="text"><span>{{seller.deliveryTime}}</span>分钟</div>
					</div>
				</div>
			</div>
			<!-- 公告 活动-->
			<div class="s-main border-1px">
				<div class="title">公告与活动</div>
				<div class="s-bulletin">
					{{seller.bulletin}}
				</div>
				<ul class="s-supports">
					<li v-for="(val,index) in seller.supports">
						<!-- <div class="border-1px" style="opacity: 0.1"></div> -->
						<img :src="supportImg[val.type]"><span>
						{{val.description}}</span>
					</li>
				</ul>
			</div><!-- s-main -->
			<!-- 商家实景 -->
			<div class="s-pics">
				<div class="title">商家实景</div>
				<ul>
					<li v-for="pic in seller.pics">
						<img :src="pic">
					</li>
				</ul>
			</div>
			<!-- 商家信息 -->
			<div class="seller-data">
				<div class="title">商家信息</div>
				<ul class="shop-data">
					<li v-for="list in seller.infos">{{list}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
//引入图片
import decrease from '../../common/img/decrease_3@3x.png'
import discount from '../../common/img/discount_3@3x.png'
import guarantee from '../../common/img/guarantee_3@2x.png'
import invoice from '../../common/img/invoice_3@3x.png'
import special from '../../common/img/special_3@3x.png'

import Star from '../star/star.vue'
import BScroll from 'better-scroll'
export default {
	props:{
		seller:{
			type:Object
		}
	},
	components:{
		Star
	},
	data: function(){
		return {
			supportImg:[decrease,discount,guarantee,invoice,special],
			collect:"收藏",
			isCollect:false
		}
	},
	methods:{
		collected() {
			this.isCollect = !this.isCollect
			if (this.isCollect) {
				this.collect = "已收藏"
			}else{
				this.collect = "收藏"
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.scroll = new BScroll(this.$refs.seller,{
				click:true,
				scrollX:true

			})
		})
	}
}
</script>
<style lang="stylus">
.seller
	position:absolute
	top:172px
	bottom:46px
	overflow:hidden
	width:100%
	overflow:auto
	background-color:#f3f5f7
	.title
		font-size:14px
	.s-wrapper
		.s-main
		.s-pics
		.seller-data
			border-top:1px solid rgba(7,17,27,.06)
		.s-header
			background-color:#fff
			font-size:10px
			padding: 18px
			padding-bottom:0
			.s-title
				width:100%
				display:flex
				padding-bottom:18px
				.s-name
					/*display:inline-block*/
					/*width:100%*/
					flex:1
					.s-star
						margin-top:8px
						.star
							display:inline-block
						.rating-count
							margin-left:6px
						.sell-count
							margin-left:12px
						.sell-count,.rating-count
							color:rgb(77,85,93)
							vertical-align:top
							line-height:18px

				.favorite
					display:inline-block
					width:30px
					text-align:right
					&.collected
						.icon-favorite
							color:rgb(240,20,20)
					.icon-favorite
					.favorite-text
						color:rgb(77,85,93)
						display:block
						text-align:center
					.icon-favorite
						font-size:24px
						color:rgb(77,85,93)
						line-height:24px
					.favorite-text
						margin-top:4px
			.s-data
				padding:18px 0
				display:flex
				.s-item
					flex:1
					text-align:center
					.title
						color:rgb(147,153,159)
					.text
						font-weight:200
						color:rgb(7,17,27)
						line-height:24px
						margin-top:4px
						span
							font-size:24px
		.s-main
			padding:18px
			font-size:12px
			color:rgb(7,17,27)
			background-color:#fff
			margin-top:12px
			.s-bulletin
				padding:8px 12px 16px 12px
				color:rgb(240,20,20)
				line-height:24px
				font-weight:200
		.shop-data
		.s-supports
			li
				border-top:1px solid rgba(7,17,37,.05)
				font-size:12px
				line-height:16px
				padding:16px 12px
				img
					width:16px
					height:16px
					vertical-align:top
					margin-right:6px
		.s-pics
			background-color:#fff
			margin-top:12px
			padding:16px
			ul
				margin-top:12px
				width:100%
				height:90px
				scroll-x:scroll
				scroll-y:hidden
				li
					display:inline
					white-space:nowrap
					margin-right:6px
					height:90px
					&.last-child
						margin-right:0
					img
						height:90px
		.seller-data
			padding:18px
			padding-bottom:0px
			background-color:#fff
			margin-top:12px
			.shop-data
				margin-top:12px


</style>