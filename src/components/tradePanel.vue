<script setup>
import { reactive, ref, computed } from 'vue';
import axios from 'axios';

let users = ref([]);
let selectedOption = ref('')
let amountValue = ref(0)
let sideValue = ref('')
let priceValue = ref(0)


const formData = computed(() => {
    return {
        creationTime: Date.now(),
        ChangeTime : Date.now(),
        status : 'Cancelled',
        side: sideValue.value,
        price: priceValue.value,
        amount: amountValue.value,
        instrument: selectedOption.value.currency
    }
})
const submitForm = (event) =>  {
    sideValue.value = event.target.id
    priceValue.value = event.target.id == 'buy' ? selectedOption.value.buy : selectedOption.value.sell
    axios.post('http://localhost:3000/orderList', formData.value)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

axios.get('http://localhost:3000/currencies')
  .then(response => {
    users.value = response.data;
    console.log(users);
  })
  .catch(error => {
    console.log(error);
  });


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
        <div id='sell' @click="submitForm($event)"  class="trade-panel__button trade-panel__button_sell">SELL</div>
    </div>
</div>

</template>

<style scoped>
.trade-panel__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 150px;
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
</style>