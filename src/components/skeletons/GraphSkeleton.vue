<template>
  <Card
    :title="title"
    class="animate-pulse h-[350px] 2xl:h-[914px] xl:h-[786px] lg:h-[658px] md:h-[530px] sm:h-[466px]"
  >
  </Card>
</template>
<script setup lang="ts">
import Card from '../common/Card.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
