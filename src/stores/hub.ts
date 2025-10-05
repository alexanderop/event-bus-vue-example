import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHub = defineStore('hub', () => {
  const value = ref(0)

  function publishCounter(n: number) {
    value.value = n
  }

  return {
    value,
    publishCounter,
  }
})
