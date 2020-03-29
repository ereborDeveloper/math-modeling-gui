<template>
    <v-row>
        <p class="text-left">Используемые ядра процессора
        </p>
        <v-text-field
                class="centered-input pa-0 ma-0"
                v-model="availableCores"
        >
        </v-text-field>
        <v-checkbox label="Использовать кэширование при
                    интегрировании" v-model="isIntegrateCached"
                    class="pa-0 ma-0">
        </v-checkbox>
    </v-row>
</template>

<script>
    export default {
        name: "Extra",
        data() {
            return {
                isIntegrateCached: true,
                availableCores: 1
            }
        }
    }
</script>

<style scoped>

</style>