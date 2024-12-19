<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
        <button @click="close">閉じる</button>
        <div class="data-table">
            <table>
                <tbody>
                    <tr v-for="(data, index) in respons" :key="index">
                        <td><button @click="openMonthPage(data.month, data.dateYear)" class="data-button">{{ data.dateYear }}年{{ data.month }}月　給料：{{ data.income }}円</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        isOpen: {
            type: Boolean,
            Required: true, 
        }
    },

    data() {
        return {
            respons: null,
        };
    },

    mounted() {
        this.getdata();
    },

    methods: {
        close() {
            this.$emit('close');
        },

        openMonthPage(mon, year) {
            this.$emit('openMonthPage', mon, year);
        },

        async getdata() {
            const res = await axios.get('/api/index');
            this.respons = res.data;
        }
    },
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal {
    background: white;
    padding: 20px;
    border-radius: 4px;
    width: 50%;
    height: 60%;
    min-width: 300px;
}
table {
    margin: 10px auto;
}
.data-button {
    width: 600px;
    /* margin: 10px; */
    padding: 10px;
    justify-content: space-between;
}
</style>