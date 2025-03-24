<script setup lang="ts">
import WeatherCard from './components/WeatherCard.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <WeatherCard />
    </template>
    <template #fallback>
      <div>Loading weather data...</div>
    </template>
  </Suspense>
</template>