<template>
  <div class="userlist">
    <!-- 搜索框 -->
    <el-row :gutter="6" class="userlist-header">
      <el-col :span="3">
        <el-input placeholder="用户名" clearable prefix-icon="el-icon-search" v-model="inputSearch"></el-input>
      </el-col>
      <el-col :span="21">
        <el-button>查询</el-button>
        <el-button @click="addDio = true" type="primary">新增</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border height="460" style="width: 100%;">
      <el-table-column type="index" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="zname" label="真实姓名" width="180"></el-table-column>
      <el-table-column prop="classx" width="180" label="学级"></el-table-column>

      <el-table-column prop="mobile" width="180" label="手机号"></el-table-column>
      <el-table-column width="60" align="center" label="性别">
        <template slot-scope="userlist">
          <span
            :class="[userlist.row.gender=='male'?'sexnan':'sexnv']"
          >{{userlist.row.gender=='male'?'♂':"♀"}}</span>
        </template>
      </el-table-column>
      <el-table-column width="68" label="状态" align="center">
        <template slot-scope="userlist">
          <el-tag
            :type="userlist.row.state==='1'?'success':'danger'"
          >{{userlist.row.state==='1'?'启用':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="userlist">
          <div>
            <el-button size="small" @click="hasUser(userlist.row)">{{userlist.row.state==='0'?'启用':'禁用'}}</el-button>
            <el-button size="small">编辑</el-button>

            <el-button size="small" @click="delUser(userlist.row._id)" type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增用户 -->
    <el-dialog
      title="新增用户"
      :visible.sync="addDio"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form
        size="small"
        :model="addFrom"
        status-icon
        :rules="addRules"
        ref="addFrom"
        label-width="100px"
        class="demo-addFrom"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="addFrom.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="zname">
          <el-input type="text" v-model="addFrom.zname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addFrom.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="addFrom.gender" placeholder="请选择性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="fmale"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input type="text" v-model="addFrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="classx">
          <el-select v-model="addFrom.classx" placeholder="请选择年级">
            <el-option label="大一" value="大一"></el-option>
            <el-option label="大二" value="大二"></el-option>
            <el-option label="大三" value="大三"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button type="primary" @click="submitAddForm('addFrom')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false, // 删除用户提示框
      // 添加用户数据
      addFrom: {
        username: "",
        password: "",
        zname: "",
        gender: "",
        mobile: "",
        classx: ""
      },
      addRules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        zname: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        classx: [{ required: true, message: "请选择年级", trigger: "blur" }]
      },
      inputSearch: "", // 搜索
      tableData: [], // 表格数据
      addDio: false // 新增用户弹框
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      // 初始化数据
      const res = await this.$http.get("/users");
      this.tableData = res.data.data;
    },
    submitAddForm(formName) {
      // 提交新增用户表单
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.post("/users/register", this.addFrom);

          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "添加用户成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("添加用户失败");
          }
        }
      });
    },
    coloseAddDio() {
      // 关闭新增用户弹窗
      this.addFrom = {};
      this.addDio = false;
    },
    async delUser(id) {
      // 删除用户
      const res = await this.$http.delete(`users/${id}`);
      if (res.data.meta.status == 204) {
        this.initData();
        this.$message({
          message: "删除用户成功",
          type: "success"
        });
      } else {
        this.$message.error("删除用户失败");
      }
    },
    async hasUser(row) {
      // 切换用户状态
      row.state = row.state == "1" ? "0" : "1";
      const res = await this.$http.put(`users/${row._id}`, { state: row.state });
      if (res.data.meta.status == 200) {
        this.initData();
        this.$message({
          message: "修改状态成功",
          type: "success"
        });
      } else {
        this.$message.error("删除用户失败");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.userlist {
  .userlist-header {
    margin-bottom: 10px;
  }
}

.sexnan {
  color: blue;
  font-size: 18px;
  font-weight: 700;
}
.sexnv {
  color: red;
  font-size: 18px;
  font-weight: 700;
}
</style>