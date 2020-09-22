<template>
  <div class="mypull">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
            <van-list
                v-model="isUploading"
                :finished="upFinished"
                finished-text="没有更多了"
                @load="onLoadList"
                offset="200"
                error-text="网络好像出问题了，点击重新加载"
                loading-text="正在刷新"
               :error.sync="bottomLoadError" 
            > 
             <van-skeleton :row="1" :loading="loading" class="cm-news-skeleton"></van-skeleton>
              <van-skeleton
                v-for="i in 5"
                :key="i"
                title
                avatar
                :row="3"
                avatar-shape="square"
                avatar-size="100"
                :loading="loading"
              ></van-skeleton>
                <div v-for="(item,i) of resultList" :key="i" class="itemvan" >
                    {{item.source}}
                </div>
            </van-list>
        </van-pull-refresh>
  </div>
</template>

<script>
import { getBriefNewsList } from '@/api/api.js' 
 
export default {
   props:{
 
   },
   data(){
     return{
        bottomLoadError: false, //触底加载是否出错
        resultList: [],
        // 是否处于上拉加载状态
        isUploading: false, 
         //数据加载是否完毕
        upFinished: false,

        // 下拉刷新
        isDownLoading: false,

        pageNum:1,
        maxIdRecommend:"0",
        minIdRecommend:"0",
        loading:true
     }
   },
   methods:{

      // 获取724快讯数据  direction: [0下拉刷新] [1上拉加载]
    getDataList(direction) {
        var payload = {
          data: {
              direction: direction,
              entryId: null,
              maxPostId: this.maxIdRecommend,
              minPostId: this.minIdRecommend,
              pageNum: this.pageNum,
              pageSize: 10,
          }
        }
        getBriefNewsList(payload).then(res => { 
            // console.log(res.data.responseBody.listData,"加载的数据信息")
            if (res.data.respCode == '000000000') {
                  // 刷新
                  let cur_resp=res.data.responseBody.listData;
                  if(direction==0){
                      this.loading=false;
                      this.isDownLoading = false;
                      this.resultList = cur_resp.concat(this.resultList); 
                        // 下拉刷新并且返回0条，表示没有新数据
                        if (cur_resp.length == 0) {
                          this.$toast({
                            message: '已是最新数据',
                            position: 'center'
                          })
                      }
                  }else if(direction==1){
                        this.isUploading = false
                        this.pageNum += 1
                        this.resultList = this.resultList.concat(cur_resp)
                        // 上拉 并且返回0条，表示已经加载完成
                        if (cur_resp.length == 0) {
                            this.upFinished = true
                        }
                  } 
                this.loading = false
                this.maxIdRecommend = this.resultList[0].docId
                this.minIdRecommend = this.resultList[  this.resultList.length - 1 ].docId
            }else{
                this.bottomLoadError = true
                this.isUploading = false
                this.isDownLoading = false
                this.loading = false
            }
        
          }).catch(() => {
              this.bottomLoadError = true
              this.loading = false
              this.isUploading = false
              this.isDownLoading = false
          })
      } ,
        // 上拉加载
        onLoadList() {
          this.getDataList(1);
          console.log("上拉加载")
        },
        // 下拉刷新
        onDownRefresh() {
          this.getDataList(0);
          console.log("下拉刷新")
        },
   },
   mounted() {
      // 获取初始数据
      this.getDataList(1)
  },
  created(){ 

  }
}
</script>

<style>
 .itemvan{
   height: 200px;
   /* border: 1px solid red; */
   border-bottom: 2px solid red;
 }
</style>
