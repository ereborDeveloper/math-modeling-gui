<template>
    <v-card class="pa-10">
        <v-radio-group v-model="method">
            <v-radio label="Метод Ньютона"
                     :value="1"></v-radio>
            <v-radio label="Метод BFGS"
                     :value="0"
                     disabled></v-radio>
        </v-radio-group>
        <v-row>
            <v-col cols="2">
                <v-text-field outlined
                              label="N"
                              v-model="n"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field outlined
                              label="Считать до q"
                              v-model="qMax"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field outlined
                              label="Шаг по q"
                              v-model="qStep"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field outlined
                              label="Количество повторений Ньютона"
                              v-model="stepCount"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field outlined
                              label="Точность"
                              v-model="eps"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "Accuracy"
    }
</script>

<style scoped>

</style>