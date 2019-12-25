<template>
    <div>
        <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
                <v-expansion-panel-header class="pa-0">
                    <template v-slot:actions>
                        <v-btn @click="run()">{{buttonValue}}</v-btn>
                    </template>
                    <v-img
                            height="80"
                            src="https://www.ice.org.uk/ICEDevelopmentWebPortal/media/what-is-civil-engineering/projects/weald-and-downland-gridshell.jpg?ext=.jpg"
                    ></v-img>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-model="panel">
                    <v-row>
                        <v-col cols="12">
                            <v-label>Входные параметры</v-label>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col cols="1">
                                    <v-text-field
                                            label="N" v-model="n"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn @click="getData()">Получить данные</v-btn>

                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <RandomChart :data="json" class="ma-2"></RandomChart>
    </div>
</template>

<script>
    import RandomChart from "@/components/Chart/RandomChart";
    import axios from 'axios';

    export default {
        name: "Home",
        components: {RandomChart},
        data() {
            return {
                panel: [0],
                n: 1,
                tableRows: 50,
                json: [],
                headers: [],
                running: false,
                isOpened: 1
            }
        },
        computed: {
            buttonValue: function () {
                if (this.running) {
                    return "Остановить";
                } else {
                    return "Запустить";
                }
            }
        },
        methods: {
            run() {
                axios.post('http://localhost:9090/modeling/start', {n: this.n}).then()
            },
            getStatus() {
                axios.get('http://localhost:9090/modeling/status').then(response => {
                    this.running = response.data;
                })
            },
            getData() {
                var _self = this;
                setInterval(function () {
                    axios.get('http://localhost:9090/modeling/output')
                        .then(response => {
                            _self.json = response.data;
                        }).catch(error => {
                        _self.status = error
                    });
                    _self.getStatus();
                }, 200);
            }
        },
        created() {
            this.getStatus();
        }
    }
</script>

<style scoped>

</style>