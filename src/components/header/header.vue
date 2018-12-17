<template>
	<div class="v-header">
		<!-- 背景 -->
		<div class="h-bg"><div class="bg-blur"></div><img :src="seller.avatar"></div>
		<!-- 主要内容 -->
		<div class="h-content">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="text-content">
				<div class="title">
					<img src="../../common/img/brand@2x.png">
					<span>{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div v-if='seller.supports' class="support">
					<img :src="supportImg[seller.supports[0].type]">
					<span>{{seller.supports[0].description}}</span>
				</div>
			</div>
			<button @click="detailContr = !detailContr" v-if='seller.supports' class="supportMore">{{seller.supports.length}}个<span class="icon-keyboard_arrow_right"></span></button>
		</div>
		<!-- 公告 -->
		<div class="bulletin">
			<span>{{seller.bulletin}}</span>
			<a @click="detailContr = !detailContr" class="bulletin-right-icon"><span class="icon-keyboard_arrow_right"></span></a>
	
		</div>
		<!-- 详情页 -->
		<transition name='slide-fade'>
			<div class="detail" v-if='detailContr'>
				<!-- <div class="de-bg"></div> -->
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<div class="de-title">				
							<h1>{{seller.name}}</h1>
							<Star class="star" v-if="seller" :score="seller.score" :size="48"></Star>
						</div>
						<div class="de-supports">
							<div class="de-heade">
								<div class="title-line-left "></div><div class="sup-title">
								优惠信息
							</div><div class="title-line-right"></div>
							</div>
							<ul >
								<li v-for="(val,index) in seller.supports"><img :src="supportImg[val.type]"><span>{{val.description}}</span></li>
							</ul>
						</div>
						<div class="de-bulletin">
							<div class="de-heade">
								<div class="title-line-left"></div><div class="sup-title">
								商家公告
							</div><div class="title-line-right"></div>
							</div>
							<div class="bulletin-text">
								<p>{{seller.bulletin}}</p>
							</div>
						</div>
					</div><!------------detail-main----------->
				</div><!----------detail-wrapper---------->
				<div class="close-page">
					<i @click="detailContr = !detailContr" class="icon-close"></i>
				</div>
			</div><!----------detail---------->
		</transition>
	</div>
</template>
<script>
//引入图片
import decrease from '../../common/img/decrease_1@2x.png'
import discount from '../../common/img/discount_1@2x.png'
import guarantee from '../../common/img/guarantee_1@2x.png'
import invoice from '../../common/img/invoice_1@2x.png'
import special from '../../common/img/special_1@2x.png'

import Star from '../star/star.vue'


export default {
	name:'vheader',
	components:{ Star },
	props:{
		seller:Object
	},
	data() {
		return {
			supportImg:[decrease,discount,guarantee,invoice,special],
			detailContr:false,
			size:0
		}
	},
	created(){
	}
}
</script>
<style>
@import './header.css';
.de-title .star{
	margin-top: 16px
}
</style>