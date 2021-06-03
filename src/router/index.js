import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import category from "../pages/category/category";
import book from "../pages/book/book";
import chapter from "../pages/book/chapter";
import video from "../pages/video/video"
import birthday from '../pages/birthday/birthday'
import ocr from '../pages/tool/ocr'
import detail from "../pages/book/detail";
import excel from "../pages/tool/excel";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/book',
      name: 'book',
      component: book
    },
    {
      path: '/chapter',
      name: 'chapter',
      component: chapter
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/birthday',
      name: 'birthday',
      component: birthday
    },
    {
      path: '/ocr',
      name: 'ocr',
      component: ocr
    },
    {
      path: '/excel',
      name: 'excel',
      component: excel
    }
  ]
})
