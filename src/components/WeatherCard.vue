<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VTextField, VCard, VCardTitle, VCardText } from 'vuetify/components'
import { getWeather } from '../weatherApi.ts'
import { Units } from '../Units.ts'

let city = ''
let units = Units.Imperial
let weather = ref(await getWeather("Thompson's Station", units))

async function updateWeather() {
  if (city === '') {
    return
  }
  weather.value = await getWeather(city, units)
  console.log(`Getting weather for ${city}...`)
  city = ''
}

async function toggleUnits() {
  units = units === Units.Imperial ? Units.Metric : Units.Imperial
  weather.value = await getWeather(weather.value.name, units)
  console.log(`Toggling units to ${units}...`)
}

</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 10px;">
    <v-text-field label="City:" v-model.trim="city" placeholder="Enter a City" @keyup.enter="updateWeather" type="text"
      density="compact" />
    <v-btn color="primary" @click="updateWeather" style="height: 60px;">Get<br />Weather</v-btn>
    <v-btn color="primary" @click="toggleUnits" style="height: 60px;">Toggle<br />Units</v-btn>
  </div>
  <v-card class="mx-auto" max-width="400">

    <v-card-title>Weather in {{ weather.name }}</v-card-title>
    <v-card-text>
      The temperature is {{ weather.main.temp }}º{{ units === Units.Imperial ? "F" : "C" }}.<br />
      The humidity is {{ weather.main.humidity }}%.<br />
      The description is {{ weather.weather[0].description }}. {{ city }}
    </v-card-text>
  </v-card>
</template>

<style scoped>
.mx-auto {
  margin: 20px;
}
</style>