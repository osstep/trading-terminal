<script setup>
import { reactive, ref, computed, onMounted, inject } from 'vue';
import api from '../api/api';

// рективные переменные
const users = ref([]);
const selectedOption = ref('')
const amountValue = ref(0)
const sideValue = ref('')
const priceValue = ref(0)
const flag = ref(false)

// inject реактивной переменной, которая используется как фраг.
// при измении этой переменной в компоненте orderTable выполняется запрос списка ордеров
const injectedCounter = inject('provideCounter')

// toggle функция для отображения сообщения
const toggleFlag = () => {
    flag.value = !flag.value
}

// функция изменения inject переменной
const increment = () => {
    injectedCounter.value++
    console.log(injectedCounter.value);
}


// функция обработки события создания ордера
const submitForm = (event) => {
    if (amountValue.value && selectedOption.value && amountValue.value > 0) {
        sideValue.value = event.target.id
        priceValue.value = event.target.id == 'buy' ? selectedOption.value.buy : selectedOption.value.sell
        api.createOrder('http://localhost:3000/orderList', formData.value)
            .then(response => {
                console.log(response.data);
                increment()
                flag.value = false
            })
            .catch(error => {
                console.log(error);
            });

    } else {
        flag.value = true
    }
}

//получение данных после монтирования компонента
onMounted(() => {
    api.getData('http://localhost:3000/currencies')
        .then(response => {
            users.value = response.data;
            console.log(users);
        })
        .catch(error => {
            console.log(error);
        });
})

// вычисляемый объект для post запроса
const formData = computed(() => {
    return {
        creationTime: new Date(Date.now()).toDateString() + new Date(Date.now()).toLocaleTimeString(),
        ChangeTime: new Date(Date.now()).toDateString() + new Date(Date.now()).toLocaleTimeString(),
        status: 'Cancelled',
        side: sideValue.value,
        price: priceValue.value,
        amount: amountValue.value,
        instrument: selectedOption.value.currency
    }
})
// вычисляемый объект для компонента
const computedData = computed(() => {
    return users.value
})

</script>

<template>
    <div class="trade-panel__wrapper">
        <div class="trade-panel__item">
            <select v-model="selectedOption">
                <option disabled selected value="">Выберите пару</option>
                <option v-for="option in computedData" :value="option">{{ option.currency }}</option>
            </select>
        </div>
        <div class="trade-panel__item">
            <input v-model="amountValue" type="number">
        </div>
        <div class="trade-panel__item">
            {{ selectedOption.buy }} {{ selectedOption.sell }}
        </div>
        <div class="trade-panel__item trade-panel__button-wrapper">
            <div id="buy" @click="submitForm($event)" class="trade-panel__button trade-panel__button_buy">BUY</div>
            <div id='sell' @click="submitForm($event)" class="trade-panel__button trade-panel__button_sell">SELL</div>
        </div>
        <div class="flag__desc" v-if="flag">выберите торговую пару и введите корректный объем сделки</div>
    </div>
</template>

<style scoped>
.trade-panel__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 200px;
    border: solid 1px;
    width: 200px;
    margin: 0 auto;
    margin-bottom: 30px;
}

.trade-panel__button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;


}

.trade-panel__button {
    border: 1px solid;
    width: 50px;
    height: 30px;
    color: #f1eaea;
    cursor: pointer;


}

.trade-panel__button_buy {
    background-color: rgb(21, 112, 33);

}

.trade-panel__button_sell {
    background-color: rgb(228, 22, 22);
}
.flag__desc {
    text-align: center;
}
</style>