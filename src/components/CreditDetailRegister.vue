<template>
    <h1>情報登録</h1>
    <div style="display: block; text-align: center;">
        <button @click="back">戻る</button>
        <form @submit.prevent="submitExpense" style="width: fit-content; margin: auto;">
            <div class="inputText">
                <label>年　　　　　</label>
                <input type="text" v-model="dataCreditDetail.creditDetailYear" requir>
            </div>
            <div class="inputText">
                <label>月　　　　　</label>
                <input type="text" v-model="dataCreditDetail.creditDetailMonth" required>
            </div>
            <div class="inputText">
                <label>年月日　　　</label>
                <input type="date" v-model="dataCreditDetail.creditDate">
            </div>
            <div class="inputText">
                <label>金額　　　　</label>
                <input type="text" v-model="dataCreditDetail.amount">
            </div>
            <div class="inputText">
                <label>買ったもの　</label>
                <input type="text" v-model="dataCreditDetail.purchasedItems">
            </div>
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
        };
    },

    created() {
        this.dataCreditDetail.creditDetailYear = this.year;
        this.dataCreditDetail.creditDetailMonth = this.month;
    },

    methods: {
        async submitExpense() {
            console.log('送信処理')

            // Axioを使ってAPIにデータを送信
            await axios.post('/api/regist/creditDetail', this.dataCreditDetail)
                .then(response => {
                    console.log('登録処理:', response.data);
                    // フォームをリセット
                    this.dataCreditDetail = {
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
                    };
                })
                .catch(error => {
                    console.error('エラー：', error);
                });
        },
        back() {
            this.$router.back();
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