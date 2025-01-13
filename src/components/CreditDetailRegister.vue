<template>
    <h1>情報登録</h1>
    <div style="display: block; text-align: center;">
        <button @click="back">戻る</button>
        <form @submit.prevent="addCreditDetail" style="width: fit-content; margin: auto;">
            <div class="inputText">
                <label>年　　　　　</label>
                <input type="text" v-model="dataCreditDetail.creditDetailYear" disabled>
            </div>
            <div class="inputText">
                <label>月　　　　　</label>
                <input type="text" v-model="dataCreditDetail.creditDetailMonth" disabled>
            </div>
            <div class="inputText">
                <label>日　　　　　</label>
                <input type="text" v-model="creditDetailDay">
            </div>
            <div class="inputText">
                <label>金額　　　　</label>
                <input type="text" v-model="dataCreditDetail.amount">
            </div>
            <div class="inputText">
                <label>買ったもの　</label>
                <input type="text" v-model="dataCreditDetail.purchasedItems">
            </div>
            <button type="submit">追加</button>
        </form>
        <table class="credit-table-data">
            <thead>
                <tr>
                    <th class="credit-table-creditDate">年月日</th>
                    <th class="credit-table-amount">金額</th>
                    <th class="credit-table-purchasedItems">買ったもの</th>
                    <th class="credit-table-button"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, key) in creditData" :key="key">
                    <td class="credit-table-creditDate">{{ data.creditDate }}</td>
                    <td class="credit-table-amount">￥{{ data.amount }}</td>
                    <td class="credit-table-purchasedItems">{{ data.purchasedItems }}</td>
                    <td class="credit-table-button"><button @click="deleteRow(key)">削除</button></td>
                </tr>
            </tbody>
        </table>
        <form @submit.prevent="submitExpense" style="width: fit-content; margin: auto;">
            <button type="submit">登録</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['year', 'month'],

    data() {
        return {
            dataCreditDetail: {
                // 年
                creditDetailYear: '',
                // 月
                creditDetailMonth: '',
                // 年月日
                creditDate: '',
                // 金額
                amount: 0,
                // 買ったもの
                purchasedItems: '',
                // チェックボックス
                checkboxStatus: false,
            },
            // 日
            creditDetailDay: '1',
            // 配列
            creditData: [],
        };
    },

    mounted() {
        this.dataCreditDetail.creditDetailYear = this.year;
        this.dataCreditDetail.creditDetailMonth = this.month;
    },

    methods: {
        // クレカ詳細情報をテーブルに追加
        addCreditDetail() {
            // 日付フォーマット変換
            // 年、月、日　→　yyyymmdd
            if (this.dataCreditDetail.creditDetailMonth < 10){
                if (this.creditDetailDay < 10){
                    this.dataCreditDetail.creditDate = this.dataCreditDetail.creditDetailYear + '-0' + this.dataCreditDetail.creditDetailMonth + '-0' + this.creditDetailDay;
                } else {
                    this.dataCreditDetail.creditDate = this.dataCreditDetail.creditDetailYear + '-0' + this.dataCreditDetail.creditDetailMonth + '-' + this.creditDetailDay;
                }
            } else {
                if (this.creditDetailDay < 10){
                    this.dataCreditDetail.creditDate = this.dataCreditDetail.creditDetailYear + '-' + this.dataCreditDetail.creditDetailMonth + '-0' + this.creditDetailDay;
                } else {
                    this.dataCreditDetail.creditDate = this.dataCreditDetail.creditDetailYear + '-' + this.dataCreditDetail.creditDetailMonth + '-' + this.creditDetailDay;
                }
            }

            this.creditData.push(this.dataCreditDetail);

            // フォームをリセット
            this.dataCreditDetail = {
                // 年
                creditDetailYear: this.year,
                // 月
                creditDetailMonth: this.month,
                // 年月日
                creditDate: '',
                // 金額
                amount: 0,
                // 買ったもの
                purchasedItems: '',
                // チェックボックス
                checkboxStatus: false,
            };
            // 日
            this.creditDetailDay = '1';
        },

        // 削除ボタン押下時
        deleteRow(index) {
            // 配列の要素を削除する時
            // <配列>.splice(<始まりのインデックス>, <削除する要素数>)
            this.creditData.splice(index, 1);
        },

        // データ登録
        async submitExpense() {
            console.log('送信処理')
            // Axioを使ってAPIにデータを送信
            await axios.post('/api/regist/creditDetail', this.creditData)
                .then(response => {
                    console.log('登録処理:', response.data);
                    // 登録後家計簿画面に遷移
                    this.$router.push({name: "kakeibo", params: {year: this.year, month: this.month}});
                })
                .catch(error => {
                    console.error('エラー：', error);
                });
        },
        
        back() {
            this.$router.push({name: "kakeibo", params: {year: this.year, month: this.month}});
        },
    },
};
</script>

<style scoped>
    label {
        padding: 5px;
    }
    .inputText {
        display: flex;
        padding: 10px;
    }
    button {
        margin: 20px;
        height: 40px;
        width: 60px;
    }
    .credit-table-data {
        width: 60%;
        margin: auto;
        margin-top: 20px;
        border: 1px solid;
    }
    .credit-table-creditDate {
        width: 15%;
        border: 1px solid;
    }
    .credit-table-amount {
        width: 35%;
        border: 1px solid;
    }
    .credit-table-purchasedItems {
        width: 40%;
        border: 1px solid;
    }
    .credit-table-button {
        width: 10%;
        border: 1px solid;
    }
</style>