<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VCard, VCardTitle, VCardText } from 'vuetify/components'
import { getWeatherDataForLocation } from '../weatherApi.ts'

const parameters = {
  "latitude": 35.802,
  "longitude": -86.9114,
  "hourly": "temperature_2m",
  "timezone": "auto",
  "wind_speed_unit": "mph",
  "temperature_unit": "fahrenheit",
  "precipitation_unit": "inch",
}

const weather = await getWeatherDataForLocation(parameters)
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>Weather</v-card-title>
    <v-card-text>
      The temperature is {{ weather.current.temperature }}.
    </v-card-text>
  </v-card>
</template>

<style scoped>
.mx-auto {
  margin: 20px;
}
</style>