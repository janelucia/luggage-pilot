<template>
  <div>
    <AddInformation v-if="addInformation" @generated="addInformation = false" />
    <PacklistView v-else @reset="addInformation = true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddInformation from '@/components/AddInformation.vue'

const addInformation = ref(true)
</script>

