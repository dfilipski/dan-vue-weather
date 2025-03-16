// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Import vuetify styles

// Create Vuetify Instance
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
})

export default vuetify