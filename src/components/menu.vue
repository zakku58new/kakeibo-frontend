<template>
  <h1>メニュー</h1>
  <div>
    <button class="center" @click="route1">家計簿表示</button>
    <button class="center" @click="route2">家計簿登録</button>
    <button class="center" @click="route3">クレカ登録</button>
  </div>
  <div class="modal">
    <modal :isOpen="isModalOpen" @close="closeModal" @openMonthPage="openMonthPage">
    </modal>
  </div>
</template>

<script>
import modal from './modal.vue';
export default {
  components: { modal },

  data() {
    return {
      isModalOpen: false,
    };
  },

  methods: {
    route1() {
      // モーダルウィンドウの表示
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openMonthPage(mon, year) {
      console.log("選択された年：", year);
      console.log("選択された月：", mon);
      this.$router.push({name: "kakeibo", params: {year: year, month: mon}});
    },
    route2() {
      this.$router.push({name: "regist-data"});
    },
    route3() {
      this.$router.push({name: "regist-credit"});
    },
  },
  
}
</script>

<style scoped>
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 30px 100px;
  }
</style>