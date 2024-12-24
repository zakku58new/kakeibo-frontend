<template>
    <h1>情報登録</h1>
    <div style="display: block; text-align: center;">
        <form @submit.prevent="submitExpense" style="width: fit-content; margin: auto;">
            <div class="inputText">
                <label>年　　</label>
                <input type="text" @blur="search" v-model="expense.dateYear" required>
            </div>
            <div class="inputText">
                <label>月　　</label>
                <input type="text" @blur="search" v-model="expense.month" required>
            </div>
            <!-- <button type="button" @click="search">検索</button>
            <br><br> -->
            <div class="inputText">
                <label>口座　</label>
                <input type="text" v-model="expense.bank">
            </div>
            <div class="inputText">
                <label>給料　</label>
                <input type="text" v-model="expense.income">
            </div>
            <div class="inputText">
                <label>電気代</label>
                <input type="text" v-model="expense.electricityBill">
            </div>
            <div class="inputText">
                <label>ガス代</label>
                <input type="text" v-model="expense.gasBill">
            </div>
            <div class="inputText">
                <label>水道代</label>
                <input type="text" v-model="expense.waterBill">
            </div>
            <div class="inputText">
                <label>生活　</label>
                <input type="text" v-model="expense.foodExpense">
            </div>
            <div class="inputText">
                <label>家賃　</label>
                <input type="text" v-model="expense.rentalCost">
            </div>
            <button type="submit">登録</button>
            <button @click="back">戻る</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            expense: {
                dateYear: '',
                month: '',
                bank: 0,
                income: 0,
                electricityBill: 0,
                gasBill: 0,
                waterBill: 0,
                foodExpense: 0,
                rentalCost: 0,
            },
        };
    },

    methods: {
        async submitExpense() {
            console.log('送信処理')
            // Axioを使ってAPIにデータを送信
            await axios.post('/api/regist', this.expense)
                .then(response => {
                    console.log('登録処理:', response.data);
                    // フォームをリセット
                    this.expense = {
                        dateYear: '',
                        month: '',
                        bank: 0,
                        income: 0,
                        electricityBill: 0,
                        gasBill: 0,
                        waterBill: 0,
                        foodExpense: 0,
                        rentalCost: 0,
                    };
                    this.$router.push({name: "menu"});
                })
                .catch(error => {
                    console.error('エラー：', error);
                });
        },
        async search() {
            await axios.get('/api/serch/data', {
                params: {
                    year: this.expense.dateYear,
                    month: this.expense.month,
                }
            }).then(respons => {
                // 口座
                this.expense.bank = respons.data.bank;
                // 給料
                this.expense.income = respons.data.income;
                // 電気代
                this.expense.electricityBill = respons.data.electricityBill;
                // ガス代
                this.expense.gasBill = respons.data.gasBill;
                // 水道代
                this.expense.waterBill = respons.data.waterBill;
                // 生活
                this.expense.foodExpense = respons.data.foodExpense;
                // 家賃
                this.expense.rentalCost = respons.data.rentalCost;
            }).catch(error => console.log(error));
        },
        back() {
            this.$router.push({name: "menu"});
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
    }
</style>