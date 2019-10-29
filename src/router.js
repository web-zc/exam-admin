import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import UserList from './components/users/UserList'
import RoleList from './components/role/RoleList'
import AuthList from './components/role/AuthList'
import TitleList from './components/title/TitleList'
import PaperList from './components/paper/PaperList'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ 
      minimum: 0.1,    //    配置最低百分比
      ease: 'ease',    //    配置动画模式
      speed: '500',    //    配置动画速度
      trickle: false,    //    关闭进度条步进
      showSpinner: false,    //    关闭进度环
  });

Vue.use(Router)

 const router= new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path:'userlist',
          name:'userlist',
          component:UserList,
          meta:{
            name:'用户列表',
            
          }
        },
        {
          path:'rolelist',
          name:'rolelist',
          component:RoleList,
          meta:{
            name:'角色列表'
          }
        },
        {
          path:'authlist',
          name:'authlist',
          component:AuthList,
          meta:{
            name:'权限列表'
          }
        },
        {
          path:'titlelist',
          name:'titlelist',
          component:TitleList,
          meta:{
            name:'题目列表'
          }
        },
        {
          path:'paperlist',
          name:'paperlist',
          component:PaperList,
          meta:{
            name:'试卷列表'
          }
        }
      ]
    }
  ]
})


// 解决路由重复点击
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 进度条
router.beforeEach((to,from,next)=>{
  NProgress.start() // 开启
  NProgress.done() // 关闭
  next()

})
export default router