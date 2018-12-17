<template>
	<div class="cartcontrol">
		<transition name="move">
		<div @click="cutSell(name)" class="transition-x"  v-show="foodsCount>0">
			<i class="inner icon-remove_circle_outline"></i>
		</div></transition><!--
		--><transition name="text-op"><div class="conut" v-show="foodsCount>0">{{foodsCount}}</div></transition><!--
		--><div @click.stop="addSell(name,price)" class="add-wrapper">
			<i class="add icon-add_circle"></i>
		</div>
		
	</div>
</template>

<script>

export default {
	props:{
		addSell:{
			type:Function
		},
		cutSell:{
			type:Function
		},
		name:{
			type:String
		},
		price:{
			type:Number
		},
		sellesShop:{
			type:Array
		}
	},
	data(){
		return {
			conut:0
		}
	},
	computed:{
		foodsCount:function() {
			let _this=this;
			// console.log(_this.sellesShop)
			for(let i=0;i<_this.sellesShop.length;i++){
				if (_this.sellesShop[i].name === _this.name) {
					// console.log(_this.name+i+","+_this.sellesShop[i].name)
					return _this.sellesShop[i].num
				}
			}
			return 0
		}
	}

}

</script>

<style lang='stylus'>
.cartcontrol
	font-size:24px
	height:34px
	color:rgb(0,160,220)
	div
		display:inline-block
		vertical-align:middle
		
	.transition-x
		transition:all .4s linear
		vertical-align:bottom
		.inner
			display:inline-block
			transition:all .4s linear
		&.move-enter,&.move-leave
			opacity:1
			transform:translate3D(0, 0, 0)
			.inner
				transform:rotate(0)
		&.move-enter,&.move-leave-to
			opacity:0
			transform:translate3D(38px, 0, 0)
			.inner
				transform:rotate(180deg)
	.conut
		font-size:10px
		text-align:center
		line-height:34px
		color:rgb(147,153,159)
		width:14px
		&.text-op-enter
			opacity:1
		&.text-op-enter-active
			transition:all 0.2s linear
			opacity:0
	.transition-x
	.add-wrapper
		padding:5px


</style>
