<template>
  <div>
    <h2>签到功能</h2>
    <el-calendar v-model="value">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p>
          {{ data.day.split('-').slice(1).join('-') }}
          <template v-for="item in signData">
            <div v-if="data.day.split('-').slice(1).join('-') === ((currMonth < 10 ? ('0' + currMonth) : currMonth) + '-' + (item < 10 ? '0' + item : item))">
              ✔️
            </div>
          </template>
        </p>
      </template>
    </el-calendar>
    <el-button @click="signIn">签到</el-button>
    <el-button @click="getMonthSignInfo">查询签到信息</el-button>
  </div>
</template>

<script>
  import Axios from 'axios'
  import {formatDate} from "../../common/date";

  export default {
    data() {
      return {
        value: new Date(),
        userId: '1001',
        signData: [],
        currMonth: new Date().getMonth() + 1
      }
    },
    mounted() {
      this.getMonthSignInfo();
    },
    methods: {
      signIn() {
        console.log(this.value);
        let url = this.PUBLIC_PARAM.ipAndHost + "/api/userSign/signIn";
        let userId = this.userId;
        let date = formatDate(this.value, "yyyy-MM-dd");
        console.log(url);
        Axios.get(url, {
          params: {
            userId: userId,
            date: date
          }
        }).then(rsp => {
          let result = rsp.data
          console.log(result)
          if(result.success) {
            this.$message.success("签到成功");
            this.getMonthSignInfo();
          } else {
            this.$message.error(result.msg);
          }
        }).catch(e => {
          console.log(e);
        })
      },
      getMonthSignInfo() {
        let url = this.PUBLIC_PARAM.ipAndHost + "/api/userSign/getSignInfo/" + this.userId
        Axios.get(url).then(rsp => {
          console.log(rsp.data);
          this.signData = rsp.data.data.signDates;
        })
      }
    }
  }
</script>
