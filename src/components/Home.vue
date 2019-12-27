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
                                <v-col cols="2">
                                    <v-text-field
                                            label="N" v-model="n"
                                    ></v-text-field>
                                    <v-text-field
                                            label="Считать до q" v-model="qMax"
                                    ></v-text-field>
                                    <v-text-field
                                            label="Шаг по q" v-model="q"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="5">
                                    <v-radio-group v-model="shellIndex">
                                        <v-radio
                                                v-for="n in shells.length"
                                                :key="n"
                                                :label="shells[n-1]"
                                                :value="n"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field label="A" v-model="A[shellIndex-1]" disabled></v-text-field>
                                    <v-text-field label="B" v-model="B[shellIndex-1]" disabled></v-text-field>
                                    <v-text-field label="kx" v-model="kx[shellIndex-1]" disabled></v-text-field>
                                    <v-text-field label="ky" v-model="ky[shellIndex-1]" disabled></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field label="R1" v-model="R1"
                                                  v-if="kx[shellIndex-1] === '1 / R1' "></v-text-field>
                                    <v-text-field label="R2" v-model="R2"
                                                  v-if="ky[shellIndex-1] === '1 / R2' "></v-text-field>
                                    <v-text-field label="r" v-model="r"
                                                  v-if="ky[shellIndex-1] === '1 / r' || A[shellIndex-1] === 'r'"></v-text-field>
                                    <v-text-field label="Theta" v-model="theta"
                                                  v-if="B[shellIndex-1] === 'x * sin(Theta)'"></v-text-field>
                                    <v-text-field label="d" v-model="d"
                                                  v-if="B[shellIndex-1] === 'd + r * sin(x)'"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <ModelingChart :data="json" :status="status" class="ma-2"></ModelingChart>
    </div>
</template>

<script>
    import ModelingChart from "@/components/Chart/ModelingChart";
    import axios from 'axios';

    export default {
        name: "Home",
        components: {ModelingChart},
        data() {
            return {
                qMax: 3.5,
                q: 0.01,
                d: 0,
                theta: 0,
                r: 0.05,
                R1: 0.05,
                R2: 0.05,
                shellIndex: 1,
                panel: [0],
                n: 1,
                tableRows: 50,
                json: [],
                headers: [],
                status: "",
                isOpened: 1,
                shells: ["Пологая двоякой кривизны", "Цилиндрическая", "Коническая", "Сферическая", "Торообразная"],
                A: ["1", "1", "1", "r", "r"],
                B: ["1", "r", "x * sin(Theta)", "r * sin(x)", "d + r * sin(x)"],
                kx: ["1 / R1", "0", "0", "1 / r", "1 / r"],
                ky: ["1 / R2", "1 / r", "ctg(Theta) / x", "1 / r", "sin(x) / (d + r * sin(x))"],
                running: true
            }
        },
        computed: {
            buttonValue: function () {

                return "Запустить";
                // }
            }
        },
        methods: {
            run() {
                this.getStatus();
                this.getData();

                axios.post('http://localhost:9090/modeling/start', {
                    n: this.n,
                    q: this.q,
                    qMax: this.qMax,
                    shellIndex: this.shellIndex,
                    d: parseFloat(this.d),
                    theta: parseFloat(this.theta),
                    r: parseFloat(this.r),
                    R1: parseFloat(this.R1),
                    R2: parseFloat(this.R2)
                }).then();
            },
            getBStatus() {
                axios.get('http://localhost:9090/modeling/bstatus').then(response => {
                    this.running = response.data;
                    if(!this.running)
                    {
                        clearInterval(this.interval);
                    }
                })
            },
            getStatus() {
                axios.get('http://localhost:9090/modeling/status').then(response => {
                    this.status = response.data;
                })
            },
            getData() {
                var _self = this;
                this.interval = setInterval(function () {
                    axios.get('http://localhost:9090/modeling/output')
                        .then(response => {
                            _self.json = response.data;
                        }).catch(error => {
                        _self.status = error;
                    });
                    _self.getStatus();
                    _self.getBStatus();

                }, 200);
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>

</style>