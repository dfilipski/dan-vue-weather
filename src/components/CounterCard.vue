<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VCard, VCardTitle, VCardText } from 'vuetify/components'

const count = ref(0)
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>Counter Card</v-card-title>
    <v-card-text>
      The count is {{ count }}.
    </v-card-text>
    <v-btn color="primary" @click="count++">
      Click Me!
    </v-btn>
  </v-card>
</template>

<style scoped>
@import '../styles/vuetifyStyles.css';
</style>