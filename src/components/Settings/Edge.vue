<template>
    <div>
        <v-row class="pa-0 ma-0">
            <v-col cols="4"
                   class="physical-card-first"
                   align-self="center"
            >
                <v-row>
                    <v-col cols="6"
                           align-self="center"
                           class="ma-0 pa-0">
                        <span class="caption text-uppercase">Добавить ребро</span>
                    </v-col>
                    <v-col cols="6">
                        <v-checkbox v-model="inputData.isedgeenabled"></v-checkbox>
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
                        <span class="caption text-uppercase">Количество ребер</span>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="По оси X"
                                      v-model="inputData.edgex"
                                      ></v-text-field>
                        <v-text-field label="По оси Y"
                                      v-model="inputData.edgey"
                                      ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Edge",
        data() {
            return {
                inputData: null
            }
        },
        watch: {
            inputData: {
                handler(newValue, oldValue) {
                    if (oldValue !== null) {
                        this.$store.commit('updateEdgeData', newValue);
                    }
                },
                deep: true
            }
        },
        created() {
            this.inputData = this.$store.state.edgeData;
        }
    }
</script>

<style scoped>

</style>