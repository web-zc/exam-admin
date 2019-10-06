<template>
  <div class="authlist">
    <!-- 添加规则 -->
    <div class="authlist-header">
      <el-button  type="primary">添加规则</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="authList" border style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="identity" label="角色名称"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="rolelist"></template>
      </el-table-column>
      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="rolelist">
          <div>
            <el-button>编辑</el-button>
            <el-button type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="authlist-length">共{{ authList.length}} 项</div> -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      authList:[], // 表格数据
    }
  },
  created(){
    this.initData()
  },
  methods:{
   async initData(){ // 初始化数据
     const res = await this.$http.get(`/identity/auth`)
     this.authList = res.data.data
    }
  }
};
</script>

<style lang="scss" scoped>
.authlist {
  .authlist-header {
    margin-bottom: 12px;
  }
}
</style>