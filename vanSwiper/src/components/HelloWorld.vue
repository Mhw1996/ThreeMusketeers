<template>
  <div class="cm-page-container">
    <!-- tab -->
        <div class="cm-van-tabs van-tabs__line_new tabbar-box-hidden vant_custom">
            <van-tabs
                v-model="active"
                swipeable
                color="#00b893"
                title-active-color="#00b893"
                swipe-threshold="7"
                line-width="32"
                line-height="2"
                duration="0.3"
                @click="onClickTab"
                
            >
                <van-tab
                    v-for="(item,index) in tabNameList"
                    :key="index"
                    :title="item.tabShowName"
                    :name="item.tabShowName"
                >
                </van-tab>
            </van-tabs>
        </div>

  <!-- swiper -->
    <div class="cm-page-swiper" ref="swiperBox">
        <swiper ref="mySwiper" :options="swiperOption" class="myswiper">
            <swiper-slide class="slide slidesFollow">
                  <div 
                        :is="tabNameList.length>1?tabNamechange(tabNameList[0].tabName):''"
                        v-if="childComponentsRender[0]"> 
                  </div> 
            </swiper-slide>
            <swiper-slide class="slide slidesFollow">
                 <div 
                        :is="tabNameList.length>1?tabNamechange(tabNameList[1].tabName):''"
                        v-if="childComponentsRender[1]"> 
                  </div>
            </swiper-slide>
        </swiper>
    </div>


  </div>
</template>

<script>
import { getNewsTabList } from '@/api/api.js'
import recommend from './recommend.vue'
import Follow from './follow.vue'

export default {
  components:{
      recommend,
      Follow
  },
  data () {
    const self = this;
    return {  
       swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          }, 
        },
       active: "",
       tabNameList:[],
        // 页面切换
      swiperOption: {
            autoplay: false,
            loop: false,
            initialSlide: 0,
            preventClickPropagation: true,
            simulateTouch: false,
            noSwipingClass: "stop-swiping", 
            // 页面滑动改变tabbar
            onTransitionStart: function(swiper) {
              self.tabNameList.map(item => {
                if (swiper.activeIndex + 1 == item.tabId) {
                  self.active = item.tabShowName
                  self.childComponentsRender[item.tabId - 1] = true
                  
                }
              })
            }
          },
          // 控制子组件加载渲染，默认加载第一个子组件，滑动或点击时改变相关组件的值
          childComponentsRender: [true, false, false, false, false, false, false, false]
      } 
  },
  methods:{
    // 点击tabbar切换页面状态
        onClickTab(name) {
          // console.log(name,"NAME")
          this.tabNameList.map(item => {
            if (name == item.tabShowName) {
                this.childComponentsRender[item.tabId - 1] = true
                this.$refs.mySwiper.$swiper.slideTo(item.tabId - 1, 500, true)
              }
          })
        },
          // 获取tab数据
        getTabName() {
          var payload = {
            data: {
              customType: '1'
            }
          }
          getNewsTabList(payload)
            .then(res => { 
              // console.log(res,"RES")
              if (res.data.respCode == '000000000') {
                this.tabNameList = res.data.responseBody.listData                
                // 进入资讯主页时判断totab参数是否曾与724，如果有则切换到724页签
                let totab = this.$route.query.totab
                if (totab == '724') {
                  this.onClickTab("7×24")
                }
              } else {
                this.$toast({
                  message: '网络好像不太好，请稍后再试。',
                  position: 'center'
                })
              }
            })
            .catch(() => {
              this.$toast({
                message: '网络好像不太好，请稍后再试。',
                position: 'center'
              })
            })
        },
         // 让页面和 tab 对应显示，对特殊 name 进行处理
      tabNamechange(val) {
        // console.log(val,"VAL")
        if (val == '7x24') {
              return allTime
             } else {
              return val
        }
      },
  },
  created(){
 
  
  },
  mounted() {
    this.getTabName()
  },
}
</script> 
<style scoped lang="scss">
  .cm-page-container{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0; 
    }
  .cm-van-tabs {
        position: relative;
        margin-left: 0.04rem;
    }
  .cm-page-container .cm-van-tabs:after{
        content: '';
        position: absolute;
        left: 0;
        top: auto;
        right: 0;
        bottom: 0;
        height: 1px;
        transform: scaleY(0.5);
        width: 100%;
        background-color: #E5E5E5;
    }
.cm-page-swiper {
    height: 100%;
    // border: 1px solid red;
    .myswiper {
      height: 100%;
      .slide { 
        height: calc(100% - 1.8rem);
        overflow-y: scroll;
      }
    }
  }
</style>
