<template>
    <v-card class="pa-10">
        <v-form v-model="valid">
            <v-row>
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
                            <v-text-field v-model="mu12">
                                <template slot="label">μ<sub>12</sub></template>
                            </v-text-field>
                            <v-text-field v-model="mu21">
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
                                    v-model="E1">
                                <template slot="label">E<sub>1</sub></template>
                            </v-text-field>
                            <v-text-field
                                    v-model="E2">
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
                                    v-model="h"></v-text-field>
                            <v-text-field
                                    label="z"
                                    v-model="z"></v-text-field>
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
                                    v-model="k"></v-text-field>
                            <v-text-field
                                    label="G"
                                    v-model="G"></v-text-field>
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
                                    v-model="a0">
                                <template slot="label">x<sub>0</sub></template>
                            </v-text-field>
                            <v-text-field
                                    v-model="a1">
                                <template slot="label">x<sub>1</sub></template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                    v-model="b0">
                                <template slot="label">y<sub>0</sub></template>
                            </v-text-field>
                            <v-text-field
                                    v-model="b1">
                                <template slot="label">y<sub>1</sub></template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        name: "Physical",
        data() {
            return {
                valid: false,
                mu12: 0.3,
                mu21: 0.3,
                E1: 210000,
                E2: 210000,
                h: 0.09,
                k: 0.8333333,
                G: 33000,
                z: 0.045,
                a0: 0,
                a1: 5.4,
                b0: 0,
                b1: 5.4
            }
        }
    }
</script>

<style scoped>


</style>