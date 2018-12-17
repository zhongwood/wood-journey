<template>
 <div class="tab border-1px">
  <div class="link-wrapper">
    <router-link to="/goods" class="tab-item" @click.native="lineScroll()">
      商品
    </router-link>
    <router-link to="/ratings" class="tab-item" @click.native="lineScroll()">
      评价
    </router-link>
    <router-link to="/seller" class="tab-item" @click.native="lineScroll()">
      商家
    </router-link>
  </div>
  <div class="line">
    <div class="line-item" ref="lineItem"></div>
  </div>
</div>
</template>
<script>
	export default{
		name:'tab',
    methods:{
      lineScroll() {
        this.$nextTick(() => {
          // console.log(this.$el.getElementsByClassName('router-link-exact-active')[0].offsetLeft)
          var toLeft = this.$el.getElementsByClassName('router-link-exact-active')[0].offsetLeft;
          let line = this.$refs.lineItem;
          line.style.left = toLeft+"px";

        })
        
      }
    },
    created() {
      this.lineScroll()
    }
	}
</script>
<style lang='stylus'>
.tab
  z-index:5
  .link-wrapper
    display: flex
    height: 40px
    width: 100%
    font-size: 14px
    text-align: center
    background-color: #fff
    .tab-item
      flex: 1
      height:40px
      line-height: 40px
      color: rgb(77,85,93)
      font-size: 14px
    .router-link-active
    	color:rgb(240,20,20)
  .line
    position:absolute
    bottom:0
    left:0
    width:100%
    .line-item
      position:absolute
      left:120
      bottom:0
      width:33%;
      border-bottom:2px solid rgb(240,20,20)
      transition:all .2s linear
      



</style>