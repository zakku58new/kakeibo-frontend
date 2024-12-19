<template>
    <div class="header">
      <h1>{{ dispYear }}年　{{ mon }}月</h1>
      <button class="back_button" @click="back">戻る</button>
    </div>

    <div style="display: block;">
      <div class="info">
        <div class="bank_info">
          <h3>口座</h3>
          <span class="price">￥{{ bank }}</span>
        </div>
        <div class="bank_info">
          <h3>給料</h3>
          <span class="price">￥{{ income }}</span>
        </div>
      </div>

      <div class="pay_info">
        <div class="credit_info">
          <p>先月クレカ</p>
          <div class="contents">
            <p style="margin-top: 0px">楽天</p>
            <div>
              <span>￥{{ dataCredit.RCreditSum }}</span>
              <span>　(ー{{ dataCredit.RCreditPoint }}p)</span>
              <br>
              <span>￥{{ dataCredit.RCreditSumLast }}</span>
            </div>
          </div>
          <br>
          <div class="contents">
            <p style="margin-top: 0px;">三井</p>
            <div>
              <span>￥{{ dataCredit.MCreditSum }}</span>
              <span>　(ー{{ dataCredit.MCreditPoint }}p)</span>
              <br>
              <span>￥{{ dataCredit.MCreditSumLast }}</span>
            </div>
          </div>
        </div>

        <div class="cost_info">
          <div class="contents">
            <p>電気代</p>
            <span class="contents-cost">￥{{ electricityBill }}</span>
          </div>
          <div class="contents">
            <p>ガス代</p>
            <span class="contents-cost">￥{{ gasBill }}</span>
          </div>
          <div class="contents">
            <p>水道代</p>
            <span class="contents-cost">￥{{ waterBill }}</span>
          </div>
          <div class="contents">
            <p>生活</p>
            <span class="contents-cost">￥{{ foodExpense }}</span>
          </div>
          <div class="contents">
            <p>家賃</p>
            <span class="contents-cost">￥{{ rentalCost }}</span>
          </div>
          <div class="contents">
            <p>合計</p>
            <span class="contents-cost-sum">￥{{ costSum }}</span>
          </div>
          <br>

          <p style="margin-bottom: 0px;">先月クレカ</p>
          <div class="contents">
            <p>楽天クレカ計</p>
            <span class="contents-cost">￥{{ dataCredit.RCreditSumLast }}</span>
          </div>
          <div class="contents">
            <p>三井クレカ計</p>
            <span class="contents-cost">￥{{ dataCredit.MCreditSumLast }}</span>
          </div>
          <div class="contents">
            <p>先月クレカ合計</p>
            <span class="contents-cost-sum">￥{{ creditSum }}</span>
          </div>
          <br>

          <div class="contents">
            <p>今月の出費合計</p>
            <span class="contents-cost-sum">￥{{ totalMonthlyExpenses }}</span>
          </div>
          <div class="contents">
            <p>口座残</p>
            <span class="contents-cost-sum">￥{{ totalMonthlyBank }}</span>
          </div>
        </div>
      </div>

      <div class="pay_month">
        <div class="credit_total">
          <p>今月クレカ合計</p>
          <p class="credit_total-sum">￥{{ creditDetailSum }}</p>
        </div>
        <div class="credit_table">クレジットカード利用履歴</div>
        <button @click="regist">登録</button>
        <table class="credit-table-data">
          <tbody>
            <tr v-for="(data, key) in creditDatas" :key="key">
              <td class="credit-table-column">{{ data.creditDate }}</td>
              <td class="credit-table-column">￥{{ data.amount }}</td>
              <td class="credit-table-column">{{ data.purchasedItems }}</td>
              <td class="credit-table-column"><input type="checkbox" v-model="data.checkboxStatus"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['year', 'month'],

    data() {
      return {
        dispYear: 0,
        mon: 0,
        bank: 0,
        income: 0,
        electricityBill: 0,
        gasBill: 0,
        waterBill: 0,
        foodExpense: 0,
        rentalCost: 0,
        dataCredit: {
          // 年
          creditYear: 0,
          // 月
          creditMonth: 0,
          // 楽天クレカ合計
          RCreditSum: 0,
          // 楽天ポイント
          RCreditPoint: 0,
          // 楽天クレカ最終合計
          RCreditSumLast: 0,
          // 三井クレカ合計
          MCreditSum: 0,
          // 三井ポイント
          MCreditPoint: 0,
          // 三井クレカ最終合計
          MCreditSumLast: 0,
        },
        costSum: 0,
        creditSum: 0,
        // 今月の出費合計
        totalMonthlyExpenses: 0,
        // 口座残
        totalMonthlyBank: 0,
        // 今月クレジット配列
        creditDatas:[],
        // 今月クレカ合計
        creditDetailSum: 0,
      };
    },
    mounted() {
      // this.prepareDisplayData();
      this.getData();
      this.getCreditDetails();
    },
    methods:{
      // 表示用処理
      // prepareDisplayData(){
      //   // 生活費検索
      //   this.getData();
      //   // クレカ検索
      //   this.getCreditData();
      //   // 今月の合計計算
      //   this.calculateMonthlyTotal();
      // },
      // 生活費検索
      async getData(){
        const res = await axios.get('/api/serch/data', {
          params: {
            year: this.year,
            month: this.month
          }
        });
        const resData = res.data;
        this.dispYear = resData[0].dateYear;
        this.mon = resData[0].month;
        this.bank = resData[0].bank;
        this.income = resData[0].income;
        this.electricityBill = resData[0].electricityBill;
        this.gasBill = resData[0].gasBill;
        this.waterBill = resData[0].waterBill;
        this.foodExpense = resData[0].foodExpense;
        this.rentalCost = resData[0].rentalCost;

        // 生活費合計
        this.costSum = this.electricityBill + this.gasBill + this.waterBill + this.foodExpense + this.rentalCost;

        this.getCreditData();
      },

      // クレカ検索
      async getCreditData(){
        // 先月判定
        const lastMonth = 0;
        const paramYear = 0;
        if(this.month - 1 < 1) {
          // 一月の時
          lastMonth = 12;
          // 昨年を設定する
          paramYear = this.year - 1;
        } else {
          // それ以外
          lastMonth = this.month - 1;
          paramYear = this.year;
        }
        const resCredit = await axios.get('/api/serch/credit', {
          params: {
            year: paramYear,
            month: lastMonth
          }
        });
        // // 年
        // this.creditYear = resCredit.data[0].creditYear;
        // // 月
        // this.creditMonth = resCredit.data[0].creditMonth;
        // 楽天クレカ合計
        this.dataCredit.RCreditSum = resCredit.data[0].rcreditSum;
        // 楽天ポイント
        this.dataCredit.RCreditPoint = resCredit.data[0].rcreditPoint;
        // 楽天クレカ最終合計
        this.dataCredit.RCreditSumLast = resCredit.data[0].rcreditSumLast;
        // 三井クレカ合計
        this.dataCredit.MCreditSum = resCredit.data[0].mcreditSum;
        // 三井ポイント
        this.dataCredit.MCreditPoint = resCredit.data[0].mcreditPoint;
        // 三井クレカ最終合計
        this.dataCredit.MCreditSumLast = resCredit.data[0].mcreditSumLast;

        // クレカ合計
        this.creditSum = this.dataCredit.RCreditSumLast + this.dataCredit.MCreditSumLast;

        this.calculateMonthlyTotal();
      },
      // 今月の合計計算
      calculateMonthlyTotal(){
        // 今月の出費合計計算
        this.totalMonthlyExpenses = this.costSum + this.creditSum;
        // 口座計算
        this.totalMonthlyBank = (this.bank + this.income) - this.totalMonthlyExpenses;
      },
      // 今月のクレカ詳細
      async getCreditDetails(){
        await axios.get('/api/serch/creditDetail', {
          params: {
            year: this.year,
            month: this.month,
          }
        }).then(respons => 
          this.creditDatas = respons.data,
        ).catch(error => console.log(error));

        this.creditDatas.forEach(data =>
            this.creditDetailSum = this.creditDetailSum + data.amount
        );
      },
      back() {
        this.$router.push({name: "menu"});
      },
      regist() {
        this.$router.push({name: "regist-credit-detaile", params: {year: this.dispYear, month: this.mon}});
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
  }
  .back_button {
    padding: 25px 50px;
    margin: 10px;
  }
  .info {
    display: flex;
    justify-content: center;
  }
  .bank_info {
    padding: 5px;
    border: 1px solid;
    width: 48%;
    height: 80px;
    margin-right: 10px;
    display: flex;
    justify-content: space-between;
  }
  .price {
    margin-right: 20px;
    margin-top: auto;
    text-decoration: underline;
  }
  .pay_info {
    display: flex;
    justify-content: center;
  }
  .credit_info {
    padding: 5px;
    border: 1px solid;
    width: 48%;
    height: 250px;
    /* margin: 10px; */
    margin-top: 10px;
    margin-right: 10px;
  }
  .contents {
    display: flex;
    justify-content: space-between;
  }
  .cost_info {
    padding: 5px;
    border: 1px solid;
    width: 48%;
    /* height: 400px; */
    /* margin: 10px; */
    margin-top: 10px;
    margin-right: 10px;
  }
  .contents-cost {
    margin: auto 20px;
  }
  .contents-cost-sum {
    /* margin: auto; */
    margin: auto 20px;
    text-decoration: underline;
  }

  .pay_month {
    padding: 5px;
    border: 1px solid;
    width: 98%;
    /* height: 240px; */
    margin: 10px;
  }
  .credit_total {
    /* display: flex; */
    border: 1px solid;
    height: 60px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }
  .credit_total-sum {
    margin: auto 20px;
    text-decoration: underline;
  }
  .credit_table {
    margin: 5px;
  }
  .credit-table-data {
    margin: auto;
    margin-top: 20px;
    border: 1px solid;
  }
  .credit-table-column {
    width: 40%;
    border: 1px solid;
    padding: 5px;
  }
  </style>