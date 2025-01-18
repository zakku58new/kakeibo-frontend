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
          <p class="credit_total-sum">￥{{ creditDetailSum }}（チェック済：￥{{ checkedCreditDetailSum }}）</p>
        </div>
        <div class="credit_table">クレジットカード利用履歴</div>
        <button class="credit-button" @click="regist">登録</button>
        <button class="credit-button" @click="update">更新</button>
        <table class="credit-table-data">
          <tbody>
            <tr v-for="(data, key) in creditDatas" :key="key">
              <td class="credit-table-creditDate">{{ data.creditDate }}</td>
              <td class="credit-table-amount">￥{{ data.amount }}</td>
              <td class="credit-table-purchasedItems">{{ data.purchasedItems }}</td>
              <td class="credit-table-button"><input type="checkbox" v-model="data.checkboxStatus"></td>
              <td class="credit-table-button"><button @click="deleteData(data);" style="height: 40px; width: 100%;">削除</button></td>
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
        // 今月クレカ合計_チェック済み
        checkedCreditDetailSum: 0,
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
        this.dispYear = res.data.dateYear;
        this.mon = res.data.month;
        this.bank = res.data.bank;
        this.income = res.data.income;
        this.electricityBill = res.data.electricityBill;
        this.gasBill = res.data.gasBill;
        this.waterBill = res.data.waterBill;
        this.foodExpense = res.data.foodExpense;
        this.rentalCost = res.data.rentalCost;

        // 生活費合計
        this.costSum = this.electricityBill + this.gasBill + this.waterBill + this.foodExpense + this.rentalCost;

        this.getCreditData();
      },

      // クレカ検索
      async getCreditData(){
        // 先月判定
        // constは再代入できない
        let lastMonth = 0;
        let paramYear = 0;
        if(parseInt(this.month)-1 < 1) {
          // 1月の時
          lastMonth = 12;
          // 昨年を設定する
          paramYear = parseInt(this.year) - 1;
        } else {
          // それ以外
          lastMonth = parseInt(this.month) - 1;
          paramYear = parseInt(this.year);
        }
        const resCredit = await axios.get('/api/serch/credit', {
          params: {
            year: paramYear,
            month: lastMonth
          }
        });
        // // 年
        // this.creditYear = resCredit.data.creditYear;
        // // 月
        // this.creditMonth = resCredit.data.creditMonth;
        // 楽天クレカ合計
        this.dataCredit.RCreditSum = resCredit.data.rcreditSum;
        // 楽天ポイント
        this.dataCredit.RCreditPoint = resCredit.data.rcreditPoint;
        // 楽天クレカ最終合計
        this.dataCredit.RCreditSumLast = resCredit.data.rcreditSumLast;
        // 三井クレカ合計
        this.dataCredit.MCreditSum = resCredit.data.mcreditSum;
        // 三井ポイント
        this.dataCredit.MCreditPoint = resCredit.data.mcreditPoint;
        // 三井クレカ最終合計
        this.dataCredit.MCreditSumLast = resCredit.data.mcreditSumLast;

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

        this.creditDatas.forEach(data => {
          // 今月クレカ合計
          this.creditDetailSum = this.creditDetailSum + data.amount;
          // チェック済の今月クレカ合計
          if(data.checkboxStatus){
            this.checkedCreditDetailSum = this.checkedCreditDetailSum + data.amount
          };
        });
      },
      back() {
        this.$router.push({name: "menu"});
      },
      regist() {
        console.log("受け渡し情報：dispYear:" + this.dispYear + " mon:" + this.mon);
        this.$router.push({name: "regist-credit-detaile", params: {year: this.dispYear, month: this.mon}});
      },
      // クレカ詳細更新
      async update() {
        // console.log(this.creditDatas);
        await axios.post('/api/update/creditDetail', this.creditDatas)
        .then(respons => {
          console.log(this.creditDatas);
          alert("クレカ情報更新！");
        })
        .catch(error => {
          console.error('エラー：', error);
        });
      },
      // クレカ詳細削除
      async deleteData(data) {
        await axios.post('/api/delete/creditDetail', data)
        .then(respons => {
          console.log(data);
          alert("クレカ情報削除！");
        })
        .catch(error => {
          console.error('エラー：', error);
        });
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
  .credit-button {
    margin: 10px;
    height: 40px;
    width: 60px;
  }
  .credit-table-data {
    width: 95%;
    margin: auto;
    margin-top: 10px;
    border: 1px solid;
  }
  tr {
    height: 40px;
  }
  .credit-table-creditDate {
    width: 20%;
    border: 1px solid;
  }
  .credit-table-amount {
    width: 30%;
    border: 1px solid;
  }
  .credit-table-purchasedItems {
    width: 40%;
    border: 1px solid;
  }
  .credit-table-button {
    text-align: center;
    width: 5%;
    border: 1px solid;
  }
  </style>