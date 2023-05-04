  
<script setup>
import { ref, computed, onMounted, inject, watch } from 'vue'
import axios from 'axios'
import api from '../api/api';


// рективный объект для сохранения объект get запроса
let ordersData = ref([]);

//получаем реактивную переменную из компонента tradePanel
const injectedCounter = inject('provideCounter')

// функция получения объекта списка ордеров
function fetchData() {
  api.getData('http://localhost:3000/orderList')
    .then(response => {
      ordersData.value = response.data;
      console.log(ordersData.value);
    })
    .catch(error => {
      console.log(error);
    });
}

// вызываем функцию получения объекта списка ордеров при монтировании компонента
onMounted(() => {
  fetchData()
})

// отслеживаем изменения inject которые происходят при создании ордера и выполняем
// get запрос если изменились данные в базе
watch(injectedCounter, () => {
  console.log('изменения');
  fetchData()
})

// вычисляемый объект на основе объекта списка ордеров
const computedData = computed(() => {
  return ordersData.value
})
</script>

<template>
  <table class="centered-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Creation time</th>
        <th>Change time</th>
        <th>Status</th>
        <th>Side</th>
        <th>Price</th>
        <th>Amount</th>
        <th>Instrument</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in computedData" :key="item.id">
        <td class="center">{{ item.id }}</td>
        <td class="center">{{ item.creationTime }}</td>
        <td class="center">{{ item.ChangeTime }}</td>
        <td class="center">{{ item.status }}</td>
        <td class="center">{{ item.side.toUpperCase() }}</td>
        <td class="center">{{ item.price }}</td>
        <td class="center">{{ item.amount }}</td>
        <td class="center">{{ item.instrument }}</td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.centered-table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}

.centered-table th,
.centered-table td {
  border: 1px solid black;
  padding: 8px;
}

.center {
  text-align: center;
}
</style>