<template>
  <el-container id="home">
    <!-- 侧边菜单 -->
    <el-menu
    unique-opened
      :default-active="tabValue"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item @click="zhou" index="/home/userlist">用户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-promotion"></i>
          <span>角色管理</span>
        </template>
        <el-menu-item @click="zhou" index="/home/rolelist">角色列表</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-container>
      <el-header>
        <div class="home-header">
          <!-- icon -->
          <div class="icon-warp" @click="isCollapse=!isCollapse">
            <i class="el-icon-s-fold"></i>
          </div>
        </div>
        <!-- tabs -->
        <el-tabs
          v-model="tabValue"
          closable
          @tab-remove="tabRemove"
          type="card"
          @tab-click="selectTab"
        >
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in tabData"
            :label="item.title"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
      </el-header>
      <!-- 主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { constants } from "crypto";
export default {
  watch: {
    $route: function(n, o) { // 监听路由追加到tabs数组
      this.tabValue = n.path;
      let aaa = this.tabData.filter(value => {
        return value.name == n.path;
      });
      if (aaa.length == 0) {
        this.tabData.push({
          title: n.meta.name,
          name: n.path
        });
      }
    }
  },
  data() {
    return {
      isCollapse: false, // 菜单收缩
      tabValue: "/home/userlist", // 默认显示
      tabData: [ // tabs数组
        {
          name: "/home/userlist",
          title: "用户列表"
        }
      ]
    };
  },
  methods: {
    zhou(e) {
      // 解决重复点击路由

      this.tabValue = e.$route.path;
      let aaa = this.tabData.filter(value => {
        return value.name == e.$route.path;
      });
      if (aaa.length == 0) {
        this.tabData.push({
          title: e.$route.meta.name,
          name: e.$route.path
        });
      }
    },
    selectTab(e) {
      // tabs被选中
      //  console.log(e.name)
      this.$router.push(`${e.name}`);
    },
    tabRemove(e) {
      // 删除标签
       let aaa = this.tabData.filter(value => {
        return value.name != e;
      });
      this.tabData =aaa
      if(aaa.length==0){
        this.$route.push('/home/userlist')
      }else{
        this.tabValue = aaa[aaa.length-1].name
         this.$router.push(`${this.tabValue}`)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  height: 100%;
}
.el-header {
  padding: 0;
  height: 86px !important;

  .home-header {
    align-items: center;
    display: flex;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    line-height: 50px;
    .icon-warp {
      cursor: pointer;
      font-size: 24px;
      width: 50px;
      height: 50px;
      margin-left: 12px;
    }
  }

  /deep/ .el-tabs__nav {
    transform: none !important;
    transition: none !important;
  }

  /deep/ .el-tabs__header {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    border-top: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item {
    -webkit-transition: none;
    transition: none;
  }

  /deep/ .el-tabs__nav {
    border: none;
  }
  /deep/ .el-tabs__item {
    box-sizing: border-box;
    -webkit-transition: none;
    transition: none;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;

    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    width: 96px !important;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-closable {
    padding-right: 10px;
    padding-left: 10px;
  }

  /deep/ .el-icon-close {
    overflow: visible;
  }

  /deep/ .is-active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    padding-left: 1px;

    &::before {
      content: "";
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
  /deep/ .el-tabs__new-tab {
    display: none;
  }
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
 
  
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/deep/ .el-menu-item {
  background-color: #1f2d3d !important;
}
/deep/ .el-menu-item:hover {
  background-color: #001528 !important;
}
</style>