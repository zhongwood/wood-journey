<template>
	<div class="ratings-main">
		<div class="border-1px" style="opacity: 0.2"></div>
		<div class="ratings-class border-1px">
			<div class="title">商品评价</div>
			<ul class="border-1px">
				<li @click="showAll()" class="all-ratings">全部<span>{{ratings.length}}</span></li><!--
				--><li @click="gbRatings(0)" class="good-ratings">满意<span>{{goodRatings}}</span></li><!--
				--><li @click="gbRatings(1)" class="bad-ratings">不满意<span>{{badRatings}}</span></li>
			</ul>
			<div @click="showNoEmpty" class="not-empty" :class="{'noempty':isEmpty}">
				<span class="icon-check_circle"></span>
				<span class="text">只看有内容的评价</span>
			</div>
		</div>
		<div class="rating-lists">
			<ul>
				<li class="default-li" v-if="ratingsMain.length<=0">还没有评价哦</li>
				<li v-for="list in ratingsMain" class="border-1px">
					<div class="user-heade">
						<div class="user-img"><img :src="list.avatar"></div>
						<div class="user-date">
							<div class="user-name">
								<span class="name">{{list.username}}</span>
								<span class="time"> {{list.rateTime | formatDate}}</span>
							</div>
							<div class="user-star">
								<span class="v-star"><Star :score="list.score" :size="24"></Star></span><span v-if="list.deliveryTime" class="delivery-time">
								{{list.deliveryTime}}分钟送达</span>
							</div>
						</div>
					</div>
					<div class="ratings-text">
						<div class="text">{{list.text}}</div>
						<div class="foot">
							<span :class="!list.rateType?'icon-thumb_up':'icon-thumb_down'"></span><!--
							--><span v-if="list.recommend.length>0" class="recommend" v-for="item in list.recommend">{{item}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div><!-- ratings -->

</template>

<script>
import Star from '../star/star.vue'
import {formatDate} from '../../common/js/date';

export default {
	props:{
		ratings:{
			type:Array,
			default(){
				return []
			}
		}
	},
	components:{
		Star
	},
	data:function () {
		return {
			ratingsMain:[],
			initArr:[],
			isEmpty:false
		}
	},
	computed:{
		goodRatings:function(){
			this.ratingsMain = this.ratings;
			
			let count = 0;
			this.ratings.forEach((val) => {
				if (val.rateType === 0) {
					count++
				}
			})
			return count
		},
		badRatings:function(){
			let count = 0;
			this.ratings.forEach((val) => {
				if (val.rateType === 1) {
					count++
				}
			})
			return count
		}
	},
	methods:{
		showNoEmpty() {
			this.isEmpty = !this.isEmpty;
			if (!this.isEmpty) {
				this.ratingsMain = this.initArr;
			}else{
				this.initArr = this.ratingsMain;
				this.ratingsMain = [];
				this.initArr.forEach((val) => {
					if (val.text!='') {
						this.ratingsMain.push(val);
					}
				})
			}
		},
		showAll() {
			this.isEmpty = false;
			this.ratingsMain = this.ratings
		},
		gbRatings(x) {
			this.isEmpty = false;
			this.ratingsMain = [];
			this.ratings.forEach((val) => {
				if (val.rateType===x) {
					this.ratingsMain.push(val);
				}
			})
		}
	},
	filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
}

</script>

<style lang='stylus'>
	.ratings-main
		margin-top:12px
		background-color:#fff
		.ratings-class
			padding:18px
			.title
				font-size:14px
				line-height:14px
				margin-bottom:18px
				display:none
			li,ul
				list-style:none
			ul
				padding-bottom:18px
				li
					display:inline-block
					font-size:12px
					color:#4d555d
					padding:10px
					margin-right:10px
					&:last-child
						margin-right:0
					&.all-ratings
						background-color:rgb(0,160,220)
						color:#fff
					&.good-ratings
						background-color:#ccecf8
					&.bad-ratings
						background-color:#e9ebec
					span
						font-size:8px
						margin-left:3px
			.not-empty
				&.noempty
					span
						color:rgb(0,160,220)
				color:#b7bbbf
				font-size:12px
				padding-top:18px
				.text
					vertical-align:top
					line-height:20px
				.icon-check_circle
					font-size:20px
		.rating-lists
			padding:0 18px
			.default-li
				text-align:center
				color:#93999f
				height:30px
			li
				padding-bottom:10px
				padding-top:18px
			.user-heade
				font-size:10px
				display:flex
				.user-img
					width:28px
					display:inline-block
					height:28px
					border-radius:50%
					overflow:hidden
					img
						width:100%
						height:100%
				.user-date
					display:inline-block
					flex:1
					margin-left:12px
					.user-name
						.name
							line-height:12px
						.time
							float:right
							color:rgb(147,153,159)
					.user-star
						margin-top:4px
						.v-star
						.delivery-time
							color:rgb(147,153,159)
							display:inline-block
						.delivery-time
							margin-left:6px
			.ratings-text
				margin-left:40px
				margin-top:6px
				.text
					font-size:12px
					line-height:18px
				.foot
					margin-top:8px
					
					.recommend
						display:inline-block
						border:1px solid rgba(7,17,27,.1)
						font-size:9px
						line-height:16px
						padding: 0 6px
						max-width:50px
						overflow:hidden
						text-overflow:ellipsis
						white-space:nowrap
						margin-left:8px
						vertical-align:top
						margin-bottom:8px
					.icon-thumb_up,.icon-thumb_down
						font-size:12px
						line-height:16px
					.icon-thumb_down
						color:rgb(183,187,191)
					.icon-thumb_up
						color:rgb(0,160,220)
</style>
