<template>
  <div>
    <el-row>
      <el-button style="float: right" type="primary" @click="addVisible = true">新增</el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="分类名"
        width="180">
      </el-table-column>
      <el-table-column
        label="分类图标">
        <template slot-scope="scope">
          <img :src="scope.row.categoryIcon" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <a class="del" @click="delCategory(scope.row.id, scope.row.categoryName)">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增分类" :visible.sync="addVisible" width="30%">
      <el-form ref="addForm" :model="form" :rules="rules">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input type="text" v-model="form.categoryName" maxlength="10" show-word-limit clearable></el-input>
        </el-form-item>
        <el-form-item label="分类图标">
          <el-input v-model="form.categoryIcon" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
  .el-input {
    width: 300px;
  }

  .del {
    cursor: pointer;
  }
  .del:hover {
    color: #409EFF;
  }
</style>

<script>
  import Axios from 'axios'

  export default {
    name: 'category',
    data() {
      const addValid = (rule, value, callback) => {
        console.log(1111)
        if(!value || value.length === 0) {
          return callback(new Error('请输入分类名称！'));
        }
        return callback();
      }

      return {
        tableData: [],
        addVisible: false,
        form: {
          categoryName: '',
          categoryIcon: ''
        },
        rules: {
          // categoryName: [{required:true, message:'xxx不能为空', trigger:'blur'}]
          categoryName: [{required:true, validator:addValid, trigger:'blur'}]
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let that = this;
        /*return Axios({
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*!/!*',
            'xxx': 'yyy'
          },
          method: 'get',
          url: 'http://localhost:9999/api/category/list'
        })*/

        return Axios.get(that.PUBLIC_PARAM.ipAndHost + '/api/category/list')
          .then(response => {
            let {data} = response.data;
            that.tableData = data || []
          })
          .catch(error => console.log(error))
          .finally(() => console.log("释放资源"));
      },
      addCategory() {
        let that = this;
        this.$refs.addForm.validate(valid => {
          if(valid) {
            let {categoryName, categoryIcon} = this.form;
            console.log(categoryName);
            Axios.post(that.PUBLIC_PARAM.ipAndHost + "/api/category/add", {
              categoryName: categoryName,
              categoryIcon: categoryIcon
            })
              .then(resp => {
              let {success} = resp.data;
              if(success) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                this.getData();
              } else {
                this.$message.error('新增失败');
              }
            })
              .catch(error => this.$message.error('新增失败'))
              .finally(() => {// 关闭弹框
                this.addVisible = false;
                this.form.categoryName = '';
                this.form.categoryIcon = '';
              });
          }
        })
      },
      delCategory(id, name) {
        let that = this
        const h = this.$createElement;
        this.$msgbox({
          title: '',
          message: h('p', null, [
            h('span', null, '确定删除'),
            h('i', { style: 'color: teal' }, name), '吗？'
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              // 删除分类
              Axios.get(that.PUBLIC_PARAM.ipAndHost + "/api/category/del/" + id)
                .then(resp => {
                  let {success} = resp.data;
                  if(success) {
                    done();
                    this.$message.success("删除成功");
                    this.getData();
                  } else {
                    done();
                    this.message.error("删除失败")
                  }
                })
            } else {
              done();
            }
          }
        });
      }
    }
  }
</script>
