<template>
    <div>
        <!-- <van-skeleton class="gz-news-skeleton" :row="1" :loading="loading"></van-skeleton> -->
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
        <div v-if="isfollow">
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
          <h1>follow</h1>
        </div>
    </div>
</template>

<script>
export default {
  name: '',
  data(){
    return{
        loading: true, // 骨架屏,
        isfollow:false
    }
  },
  methods:{

  },
  created(){
    
  },
  mounted(){
    setTimeout(()=>{
        this.loading = false;
        this.isfollow=true
    },2000)
  }
}
</script>

<style>
 
</style>
