<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" class="star-item" :class="itemClass"></span>
		
	</div>
</template>
<script>
const LENGTH=5;
const CLS_ON='on';
const CLS_OFF = 'off';
const CLS_HALF = 'half';

export default {
	name:'star',
	props:{
		size:{
			type:Number
		},
		score:{
			type:Number
		}
	},
	computed:{
		starType(){
			return 'star-'+this.size;
		},
		itemClasses(){
			let result = [];
			let int = Math.floor(this.score);
			let halfScore = this.score%1 >= 0.5;

			for(let i=0;i<int;i++){
				result.push(CLS_ON);
			}
			if (halfScore) {
				result.push(CLS_HALF)
			}
			while(result.length<LENGTH){
				result.push(CLS_OFF)
			}
			return result
		}
	},
	created(){
	}
}
</script>
<style lang='stylus' rel="stylesheet/stylus">
@import "../../common/css/mixin.styl";
.star
	/*font-size:0*/
	.star-item
		display:inline-block
		background-repeat:no-repeat
	&.star-48
		.star-item
			width : 24px
			height : 24px
			margin-right:22px
			background-size:24px 24px
			&:last-child
				margin-right:0
			&.on
				bg-img('star48_on')
			&.half
				bg-img('star48_half')
			&.off
				bg-img('star48_off')
	&.star-36
		.star-item
			width:15px
			height:15px
			margin-right:6px
			background-size:15px 15px
			&:last-child
				margin-right:0
			&.on
				bg-img('star36_on')
			&.half
				bg-img('star36_half')
			&.off
				bg-img('star36_off')
	&.star-24
		.star-item
			width:10px
			height:10px
			margin-right:3px
			background-size:10px 10px
			&:last-child
				margin-right:0
			&.on
				bg-img('star24_on')
			&.half
				bg-img('star24_half')
			&.off
				bg-img('star24_off')

	

</style>