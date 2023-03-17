<template>
  <div class="about">
    <router-link to="/contact">Contact</router-link>
    <h1>This is an about page</h1>


    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="form.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'About',
  data() {
    return {
      // form: {
      //   user: "",
      //   region: "",
      // },
      tableData: [],
    }
  },
  computed: {
    ...mapState('state', ['form'])
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log('==== $route ====', to, from)
      },
      immediate: true,
      deep: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    console.log(from?.name + ' => ' + to?.name)
    next(vm => {
      if (from?.name === 'Contact') {
        const tempData = sessionStorage.getItem('tempData') || {}
        const { form = {}, tableData = [] } = JSON.parse(tempData)
        // vm.form = form
        vm.tableData = tableData
      } else {
        vm.setForm({ name: '', region: '' })
      }
      sessionStorage.removeItem('tempData')
    })
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    console.log(from?.name + ' => ' + to?.name)
    if (to?.name === 'Contact') {
      // 缓存数据
      const tempData = {
        form: this.form,
        tableData: this.tableData
      }
      sessionStorage.setItem('tempData', JSON.stringify(tempData))
    }
    next()
  },
  created() {
    console.log('created')
  },
  methods: {
    ...mapActions('state', ['setForm']),
    onSubmit() {
      console.log("submit!")
      this.getTableData()
    },
    getTableData() {
      this.tableData = [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ]
    },
  },
}
</script>
