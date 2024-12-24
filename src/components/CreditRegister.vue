<template>
    <h1>情報登録</h1>
    <div style="display: block; text-align: center;">
        <form @submit.prevent="submitExpense" style="width: fit-content; margin: auto;">
            <div class="inputText">
                <label>年　　　　　　</label>
                <input type="text" v-model="dataCredit.creditYear" required>
            </div>
            <div class="inputText">
                <label>月　　　　　　</label>
                <input type="text" v-model="dataCredit.creditMonth" required>
            </div>
            <div class="inputText">
                <label>楽天　　　　　</label>
                <input type="text" v-model="dataCredit.rcreditSum">
            </div>
            <div class="inputText">
                <label>楽天ポイント　</label>
                <input type="text" v-model="dataCredit.rcreditPoint">
            </div>
            <div class="inputText">
                <label>三井　　　　　</label>
                <input type="text" v-model="dataCredit.mcreditSum">
            </div>
            <div class="inputText">
                <label>三井ポイント　</label>
                <input type="text" v-model="dataCredit.mcreditPoint">
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
            dataCredit: {
                // 年
                creditYear: '',
                // 月
                creditMonth: '',
                // 楽天クレカ
                rcreditSum: 0,
                // 楽天ポイント
                rcreditPoint: 0,
                // 楽天クレカ最終合計
                rcreditSumLast: 0,
                // 三井クレカ
                mcreditSum: 0,
                // 三井ポイント
                mcreditPoint: 0,
                // 三井クレカ最終合計
                mcreditSumLast: 0,
            },
        };
    },

    methods: {
        async submitExpense() {
            console.log('送信処理')
            // 楽天クレカ最終合計計算
            this.dataCredit.rcreditSumLast = this.dataCredit.rcreditSum - this.dataCredit.rcreditPoint;

            // 三井クレカ最終合計計算
            this.dataCredit.mcreditSumLast = this.dataCredit.mcreditSum - this.dataCredit.mcreditPoint;

            // Axioを使ってAPIにデータを送信
            await axios.post('/api/regist/credit', this.dataCredit)
                .then(response => {
                    console.log('登録処理:', response.data);
                    // フォームをリセット
                    this.dataCredit = {
                        // 年
                        creditYear: '',
                        // 月
                        creditMonth: '',
                        // 楽天クレカ
                        rcreditSum: 0,
                        // 楽天ポイント
                        rcreditPoint: 0,
                        // 楽天クレカ最終合計
                        rcreditSumLast: 0,
                        // 三井クレカ
                        mcreditSum: 0,
                        // 三井ポイント
                        mcreditPoint: 0,
                        // 三井クレカ最終合計
                        mcreditSumLast: 0,
                    };
                    // メニュー画面に戻る
                    this.$router.push({name: "menu"});
                })
                .catch(error => {
                    console.error('エラー：', error);
                });
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