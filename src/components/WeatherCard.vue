<script setup lang="ts">
import { computed, ref } from 'vue'
import { VBtn, VTextField, VCard, VCardTitle, VCardText, VCardActions, VSpacer, VIcon } from 'vuetify/components'
import { getWeather } from '../services/weatherApi.ts'
import { Units } from '../types/Units.ts'
import { WeatherIcons } from '../utils/WeatherIcons.ts'
import { useMouseInElement } from '@vueuse/core'

const target = ref(null)

const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

const cardTransform = computed(() => {
  const MAX_ROTATION = 8

  const rX = (
    MAX_ROTATION / 2 -
    (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2)

  const rY = (
    (elementX.value / elementWidth.value) * MAX_ROTATION -
    MAX_ROTATION / 2
  ).toFixed(2)

  return isOutside.value ? '' : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`
})

let city = ref('')
let units = Units.Imperial
let weather = ref(await getWeather("Thompson's Station", units))

async function updateWeather() {
  if (city.value === '') {
    city.value = weather.value.name
  }
  weather.value = await getWeather(city.value, units)
  console.log(`Getting weather for ${city.value}...`)
  city.value = ''
}

async function toggleUnits() {
  units = units === Units.Imperial ? Units.Metric : Units.Imperial
  weather.value = await getWeather(weather.value.name, units)
  console.log(`Toggling units to ${units}...`)
}

</script>

<template>
  <div style="width: 400px; margin: auto;">
    <div style="display: flex; flex-direction: row; gap: 10px;">
      <v-text-field label="City:" v-model.trim="city" placeholder="Enter a City" @keyup.enter="updateWeather"
        type="text" density="compact" />
      <v-btn @click="updateWeather" style="height: 60px;">Get<br />Weather</v-btn>
      <v-btn @click="toggleUnits" style="height: 60px;">Toggle<br />Units</v-btn>
    </div>
  </div>
  <v-card class="mx-auto" max-width="400" margin="auto" ref="target">
    <v-card-title>
      <v-icon>{{ WeatherIcons[weather.weather[0].id] || 'mdi-weather-partly-cloudy' }}</v-icon>
      Weather in {{ weather.name }}
    </v-card-title>
    <v-card-text>
      The temperature is {{ weather.main.temp }}º{{ units === Units.Imperial ? "F" : "C" }}.<br />
      The humidity is {{ weather.main.humidity }}%.<br />
      The description is {{ weather.weather[0].description }}.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="updateWeather" style="margin: auto;">Refresh</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
@import '../styles/vuetifyStyles.css';

.v-card {
  transform: v-bind(cardTransform);
  transition: transform 0.25s ease-out;
}
</style>