<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-wrapper">
			<div class="s-score border-1px">
				<div class="scroe">
					<div class="socre-num">{{seller.score}}</div>
					<div class="socre-title">综合评分</div>
					<div class="rank-rate">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="other-score">
					<ul>
						<li>
							<span class="score-name">服务态度</span><!--
							--><span class="star"><Star v-if="seller" :score="seller.serviceScore" :size="36"></Star></span><!--
							--><span class="socre-num">{{seller.serviceScore}}</span>
						</li>
						<li>
							<span class="score-name">口味评价</span><!--
							--><span  class="star"><Star v-if="seller" :score="seller.foodScore" :size="36"></Star></span><!--
							--><span class="socre-num">{{seller.foodScore}}</span>
						</li>
						<li>
							<span class="score-name">送达时间</span><!--
							--><span>{{seller.deliveryTime}}分钟</span>
						</li>
					</ul>
				</div><!-- other-score -->
				<!-- <span class="border-1px"></span> -->
			</div><!-- s-score -->
			<RatingSelect :ratings="ratings"></RatingSelect>
		</div>
	</div>
</template>
<script type="text/javascript">
import Star from '../star/star.vue'
import BScroll from 'better-scroll'
import RatingSelect from '../ratingselect/ratingselect.vue'

export default {
	props:{
		seller:{
			type:Object
		}
	},
	data() {
		return {
			ratings:[]
		}
	},
	components:{
		Star,RatingSelect
	},
	created() {
		var _this = this;
		this.$http.get('/api/ratings.php').then((res) => {
			res = res.body;
			if (res.errno === 0) {
				_this.ratings = res.data;
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.ratings,{
						click:true
					})
				})
			}
		})
	}

}
</script>
<style lang="stylus">
.ratings
	position:absolute
	top:172px
	bottom:46px
	/*overflow:hidden*/
	width:100%
	color:rgb(7,17,27)
	background-color:#f3f5f7
	overflow:auto
	.ratings-wrapper
		/*height:100%*/
		.s-score
			background-color:#fff
			display:flex
			width:100%
			font-size:12px
			color:rgb(7,17,27)
			padding: 18px 0
			.scroe
				flex:1
				text-align:center
				border-right:1px solid rgba(147,153,159,.2)
				.socre-num
					font-size:24px
					line-height:28px
					color:rgb(255,153,0)
				.socre-title
					line-height:12px
					margin-top:6px
				.rank-rate
					margin-top:8px
					font-size:10px
					line-height:10px
					color:rgb(147,153,159)
			.other-score
				flex:2
				li
					width:80%
					margin:0 auto
					display:block
					line-height:18px
					margin-top:8px
					&:first-child
						margin-top:0px
					span
						display:inline-block
						vertical-align:middle
					.score-name
						margin-right:12px
					.star
						margin:0
						vertical-align:middle
					.socre-num
						color:rgb(255,153,0)
						margin-left:12px
		




		
/*b7bbbf 97px 23px 40px*/
</style>