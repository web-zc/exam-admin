<template>
  <div class="titlelist">
    <!-- 搜索框 -->
    <ul class="titlelist-header">
      <li>
        <el-input placeholder="输入题干" clearable prefix-icon="el-icon-search" v-model="inputSearch"></el-input>
      </li>
      <li>
        <span class="uh-text" >类别：</span>
        <el-select v-model="titleTypex">
          <el-option label="全部" value></el-option>
          <el-option v-for="(item,index) in titleType" :key="item._id" :label="item.titletype" :value="item._id"></el-option>
          
        </el-select>
      </li>
      <li>
        <span class="uh-text" >难度：</span>
        <el-select  v-model="difficulty">
          <el-option label="全部" value></el-option>
          <el-option label="1星" value="1"></el-option>
          <el-option label="2星" value="2"></el-option>
          <el-option label="3星" value="3"></el-option>
          <el-option label="4星" value="4"></el-option>
          <el-option label="5星" value="5"></el-option>
        </el-select>
      </li>
      <li>
        <el-button @click="queryTitle" >查询</el-button>
        <el-button type="primary">新增</el-button>
      </li>
    </ul>
    <!-- 表格 -->
    <el-table :data="titleList" border height="68vh" style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column label="类别">
        <template slot-scope="titlelist">
          <div>{{titlelist.row.items[0].titletype}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="title" width="560" label="题干"></el-table-column>
      <el-table-column prop="score" label="分值"></el-table-column>
      <el-table-column prop="difficulty" label="难度"></el-table-column>

      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="titlelist">
          <div>
            <el-button size="small">预览</el-button>
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagenumber"
        :page-sizes="[10, 30, 60, 90]"
        :page-size.sync="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      difficulty:'', // 难度
      titleTypex:'', // 选择类别
      titleType:[], // 题目类别
      inputSearch: "", // 搜索题目
      titleList: [], // 表单数据
      // 分页数据
      total: 50,
      pagenumber: 1,
      pagesize: 10
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await this.$http.get(
        `/title?pagesize=${this.pagesize}&pagenumber=${this.pagenumber}`
      );
        const resx = await this.$http.get(
        `/title/titletype`
      );
      this.titleList = res.data.data;
      this.total = res.data.count;
      this.titleType = resx.data.data
      
    },
    async handleSizeChange(val) {
      // 一页多少
      this.pagesize = val;
      this.queryTitle();
    },
    async handleCurrentChange(val) {
      // 当前
      console.log("number" + val);
      this.pagenumber = val;
      this.queryTitle();
    },
    async queryTitle(){
      // 查询题目
       const res = await this.$http.get(
        `/title/search?pagesize=${this.pagesize}&pagenumber=${this.pagenumber}&title=${this.inputSearch}&tyid=${this.titleTypex}&difficulty=${this.difficulty}`
      );
       this.total = res.data.count;
       this.titleList = res.data.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.titlelist {
  .titlelist-header {
    margin-bottom: 10px;
    display: flex;
    > li {
      &:last-child {
        margin-left: 20px;
      }
      width: 12%;
      display: flex;
      .uh-text {
        white-space: nowrap;
        line-height: 40px;
        // margin-right: 2px;
        margin-left: 20px;
      }
    }
  }
  .fenye {
  margin-top: 16px;
}
}
</style>