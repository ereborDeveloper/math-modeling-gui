<template>
    <div>
        <v-row class="pa-0 ma-0">
            <v-col cols="6"
                   class="physical-card-first"
                   align-self="center"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                    <span class="caption text-uppercase">Кэширование при
                    интегрировании</span>
                    </v-col>
                    <v-col cols="6">
                        <v-checkbox v-model="isIntegrateCached"></v-checkbox>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6"
                   class="physical-card"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Используемые ядра процессора</span>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field label="По оси X"
                                      v-model="availableCores"
                        ></v-text-field>

                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Extra",
        data() {
            return {
                isIntegrateCached: true,
                availableCores: 6
            }
        }
    }
</script>

<style scoped>

</style>