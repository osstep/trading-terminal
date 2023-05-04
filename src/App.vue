<script setup>
import { ref, provide } from 'vue';
import tradePanel from './components/tradePanel.vue';
import orderTable from './components/orderTable.vue';

const provideCounter = ref(0)
provide('provideCounter', provideCounter)

</script>

<template>
  <tradePanel/>
  <orderTable/>
</template>

<style scoped>
body {
  width: 1140px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
