<template>
  <ErrorMessage v-if="hasError" message="Couldn't fetch the pairs!" />
  <div
    v-if="!hasError && !isLoading"
    class="relative overflow-x-auto shadow-md"
  >
    <table>
      <thead>
        <tr>
          <th>Pair</th>
          <th>Price</th>
          <th>Signal</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pair in pairs">
          <td>{{ pair.name }}</td>
          <td>{{ formatAmount(pair.price) }}</td>
          <td>{{ pair.signal }}</td>
          <td>{{ formatDate(pair.updated_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPairs } from '../api.ts'
import { formatAmount, formatDate } from '../helpers/format-helper.ts'
import ErrorMessage from './shared/ErrorMessage.vue'
import type { Pair } from '../models/pair.ts'

const hasError = ref<boolean>(false)
const pairs = ref<Pair[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
  await refresh()
})

async function refresh() {
  isLoading.value = true
  pairs.value = []
  try {
    pairs.value = await getPairs()
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
