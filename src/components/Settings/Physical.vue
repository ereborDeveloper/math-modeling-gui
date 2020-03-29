<template>
    <v-form v-model="valid" class="pa-0 ma-0">
        <v-row class="pa-0 ma-0">
            <v-col cols="4"
                   class="physical-card-first"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Коэффициенты Пуассона</span>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="inputData.mu12">
                            <template slot="label">μ<sub>12</sub></template>
                        </v-text-field>
                        <v-text-field v-model="inputData.mu21">
                            <template slot="label">μ<sub>21</sub></template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card">
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Модули упругости материала</span>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                v-model="inputData.E1">
                            <template slot="label">E<sub>1</sub></template>
                        </v-text-field>
                        <v-text-field
                                v-model="inputData.E2">
                            <template slot="label">E<sub>2</sub></template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card">
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Параметры оболочки</span>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                label="h"
                                v-model="inputData.h"></v-text-field>
                        <v-text-field
                                label="z"
                                v-model="inputData.z"></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card-first">
                <v-row>
                    <v-col cols="6"
                           align-self="center">
                        <span class="caption text-uppercase">Постоянная Больцмана, G</span>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                label="k"
                                v-model="inputData.k"></v-text-field>
                        <v-text-field
                                label="G"
                                v-model="inputData.G"></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card">
                <v-row>
                    <v-col cols="6"
                           align-self="center">
                        <span class="caption text-uppercase">Интегрирование</span>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                                v-model="inputData.a0">
                            <template slot="label">x<sub>0</sub></template>
                        </v-text-field>
                        <v-text-field
                                v-model="inputData.a1">
                            <template slot="label">x<sub>1</sub></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                                v-model="inputData.b0">
                            <template slot="label">y<sub>0</sub></template>
                        </v-text-field>
                        <v-text-field
                                v-model="inputData.b1">
                            <template slot="label">y<sub>1</sub></template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card"
            ></v-col>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: "Physical",
        data() {
            return {
                valid: false,
                inputData: null
            }
        },
        watch: {
            inputData: {
                handler(newValue, oldValue) {
                    if (oldValue !== null) {
                        this.$store.commit('updatePhysicalData', newValue);
                    }
                },
                deep: true
            }
        },
        created() {
            this.inputData = this.$store.state.physicalData;
        }

    }
</script>

<style scoped>


</style>