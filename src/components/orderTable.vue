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
          <td class="center">{{ item.price | currencyFormat }}</td>
          <td class="center">{{ item.amount }}</td>
          <td class="center">{{ item.instrument }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
<script setup>
    import {ref, computed, onMounted} from 'vue'
    import axios from 'axios'
    
    const currencyFormat = (value) => {
    return value.toFixed(2)
    }
  let ordersData = ref([]);



  function fetchData() {
  axios.get('http://localhost:3000/orderList')
    .then(response => {
      ordersData.value = response.data;
      console.log(ordersData.value);
    })
    .catch(error => {
      console.log(error);
    });
}


onMounted(() => {
   fetchData()
})
const computedData = computed(() => {
    return ordersData.value
})
  </script>

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