<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VTextField, VCard, VCardTitle, VCardText, VCardActions, VSpacer, VIcon } from 'vuetify/components'
import { getWeather } from '../weatherApi.ts'
import { Units } from '../Units.ts'

let city = ''
let units = Units.Imperial
let weather = ref(await getWeather("Thompson's Station", units))

const weatherIcons: { [key: number]: string } = {
  800: 'mdi-weather-sunny', // clear sky
  801: 'mdi-weather-partly-cloudy', // few clouds
  802: 'mdi-weather-cloudy', // scattered clouds
  803: 'mdi-weather-cloudy', // broken clouds
  804: 'mdi-weather-cloudy', // overcast clouds
  300: 'mdi-weather-rainy', // drizzle
  301: 'mdi-weather-rainy', // drizzle
  500: 'mdi-weather-rainy', // light rain
  501: 'mdi-weather-rainy', // moderate rain
  502: 'mdi-weather-pouring', // heavy intensity rain
  503: 'mdi-weather-pouring', // very heavy rain
  504: 'mdi-weather-pouring', // extreme rain
  200: 'mdi-weather-lightning', // thunderstorm with light rain
  201: 'mdi-weather-lightning', // thunderstorm with rain
  202: 'mdi-weather-lightning', // thunderstorm with heavy rain
  600: 'mdi-weather-snowy', // light snow
  601: 'mdi-weather-snowy', // snow
  602: 'mdi-weather-snowy', // heavy snow
  701: 'mdi-weather-fog', // mist
  711: 'mdi-weather-fog', // smoke
  721: 'mdi-weather-fog', // haze
  731: 'mdi-weather-fog', // sand/dust whirls
  741: 'mdi-weather-fog', // fog
  751: 'mdi-weather-fog', // sand
  761: 'mdi-weather-fog', // dust
  762: 'mdi-weather-fog', // volcanic ash
  771: 'mdi-weather-fog', // squalls
  781: 'mdi-weather-fog' // tornado
}

async function updateWeather() {
  if (city === '') {
    city = weather.value.name
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
  <div style="width: 400px; margin: auto;">
    <div style="display: flex; flex-direction: row; gap: 10px;">
      <v-text-field label="City:" v-model.trim="city" placeholder="Enter a City" @keyup.enter="updateWeather"
        type="text" density="compact" />
      <v-btn color="primary" @click="updateWeather" style="height: 60px;">Get<br />Weather</v-btn>
      <v-btn color="primary" @click="toggleUnits" style="height: 60px;">Toggle<br />Units</v-btn>
    </div>
  </div>
  <v-card class="mx-auto" max-width="400" margin="auto">
    <v-card-title>
      <v-icon>{{ weatherIcons[weather.weather[0].id] || 'mdi-weather-partly-cloudy' }}</v-icon>
      Weather in {{ weather.name }}
    </v-card-title>
    <v-card-text>
      The temperature is {{ weather.main.temp }}º{{ units === Units.Imperial ? "F" : "C" }}.<br />
      The humidity is {{ weather.main.humidity }}%.<br />
      The description is {{ weather.weather[0].description }}.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="updateWeather" style="margin: auto;">Refresh</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.mx-auto {
  margin: 20px;
}
</style>