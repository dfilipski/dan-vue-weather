<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VTextField, VCard, VCardTitle, VCardText } from 'vuetify/components'
import { getWeather } from '../weatherApi.ts'

let city = ''
let weather = ref(await getWeather("Thompson's Station"))

async function updateWeather() {
  weather.value = await getWeather(city)
  console.log(`Getting weather for ${city}...`)
  city = ''
}

</script>

<template>
  <div style="display: flex; flex-direction: row; gap: 10px; align-items: center;">
    <v-text-field label="City:" v-model="city" placeholder="Enter a City" type="text"/>
    <div>
      <v-btn color="primary" @click="updateWeather">Get<br/>Weather</v-btn>
    </div>
  </div>
  <v-card class="mx-auto" max-width="400">

    <v-card-title>Weather in {{ weather.name }}</v-card-title>
    <v-card-text>
      The temperature is {{ weather.main.temp }}ºF.<br />
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