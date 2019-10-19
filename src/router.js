import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import UserList from './components/users/UserList'
import RoleList from './components/role/RoleList'
import AuthList from './components/role/AuthList'
import TitleList from './components/title/TitleList'
Vue.use(Router)

export default new Router({
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