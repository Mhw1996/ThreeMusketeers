import request from '@/utils/request.js' 

// 获取分类页签列表
export function getNewsTabList (data) {
  return request({
    url: '/column/v1/ZHINSXXXGetNewsTabNameList',
    method: 'post',
    data
  })
};

 // 724快讯列表
export function getBriefNewsList (data) {
  return request({
    // recommend/v1/ZHINSXXXHomeRecommendColumnListPart
    // url: '/feed/v1/ZHINSXXXGetBriefNewsList',
    url: '/recommend/v1/ZHINSXXXHomeRecommendColumnListPart',
    method: 'post',
    data
  })
}