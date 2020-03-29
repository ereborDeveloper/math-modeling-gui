<template>
    <v-form v-model="valid"
            class="pa-0 ma-0">
        <v-row class="pa-0 ma-0">
            <v-col cols="4"
                   class="physical-card-first"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Параметры аппроксимации</span>
                    </v-col>
                    <v-col cols="6"
                           class="py-10 my-2">
                        <v-text-field
                                label="N"
                                v-model="inputData.n"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Считать методом</span>
                    </v-col>
                    <v-col cols="6"
                           class="py-8">
                        <v-radio-group v-model="method"
                        >
                            <v-radio label="Метод Ньютона"
                                     :value="1"></v-radio>
                            <v-radio label="Метод BFGS"
                                     :value="0"
                                     disabled></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Точность метода</span>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                label="Количество повторений Ньютона"
                                v-model="inputData.stepcount"
                        ></v-text-field>

                        <v-text-field
                                label="Точность ε"
                                v-model="inputData.eps"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card-first"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Точность q</span>
                    </v-col>
                    <v-col cols="6">

                        <v-text-field
                                label="Считать до q"
                                v-model="inputData.qmax"
                        ></v-text-field>
                        <v-text-field
                                label="Шаг по q"
                                v-model="inputData.qstep"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"
                   class="physical-card"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Оптимизация и сходимость</span>
                    </v-col>
                    <v-col cols="6">

                        <v-text-field
                                label="Следующее q, если не сходится при ? шагах"
                                v-model="inputData.optimizationbreak"
                        ></v-text-field>
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
        name: "Accuracy",
        data() {
            return {
                method: 1,
                valid: false,
                inputData: null
            }
        },
        watch: {
            inputData: {
                handler(newValue, oldValue) {
                    if (oldValue !== null) {
                        this.$store.commit('updateAccuracyData', newValue);
                    }
                },
                deep: true
            }
        },
        created() {
            this.inputData = this.$store.state.accuracyData;
        }
    }
</script>

<style scoped>

</style>