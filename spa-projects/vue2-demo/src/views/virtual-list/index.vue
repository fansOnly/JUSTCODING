<template>
  <div class="wrapper">
    <virtual-list
      v-if="ready"
      :source="source"
      :preCacheCount="5"
      :postCacheCount="5"
      :itemHeight="100"
      :showCount="20"
    >
      <template #default="{ list }">
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="avatar">
            <img :src="item.headImg" width="70" height="70" alt="" />
          </div>
          <div class="info">
            <div class="username">{{ item.userName }}</div>
            <div class="phone">{{ item.phone }}</div>
          </div>
          <div class="index">{{ item.index + 1 }}</div>
        </div>
      </template>
    </virtual-list>
  </div>
</template>

<script>
import VirtualList from "@/components/VirtualList.vue";
import customers from "./customer.json";
const usernames = customers.map((v) => v.userName);

export default {
  components: {
    VirtualList,
  },
  data() {
    return {
      source: [], // 源数据
      ready: false,
    };
  },
  async created() {
    await this.requestData();
    this.ready = true;
  },
  methods: {
    async requestData() {
      let data = [];
      for (let i = 0; i < 10000; i++) {
        data.push({
          index: i,
          orgName: "",
          headImg:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL8qwKT00ZD3Cm8kjica2vibdnhG5HqH2r0EsAtOtZia8UDz6xFsqFpMeXmPTmjLRflbnDVs3icQsFR6Q/132",
          phone: "13765846370",
          nickName: "贺文黔",
          achiManaId: "",
          custType: "0",
          remark: "",
          prodCount: "",
          userName: usernames[Math.floor(Math.random() * usernames.length)],
          userId: `2003270F4025484578QBHXNSGCEAE3CA${i}`,
        });
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          this.source = data;
          resolve();
        }, 1000);
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 300px;
  margin: 0 auto;
}

.item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 95px;
  margin-bottom: 5px;
  background: #eee;
  font-size: 30px;
}

.avatar {
  width: 70px;
  height: 70px;
  margin: 0 10px;
  border-radius: 100%;
  overflow: hidden;
}

.info {
  flex: 1;
}

.username {
  color: #222;
  font-size: 16px;
}

.phone {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.index {
  padding-right: 20px;
  font-size: 30px;
}
</style>
