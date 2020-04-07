<template>
    <v-parallax
            height="1000"
            :src="parallax"
            class="pt-0 ma-0"
    >
        <v-container class="pt-0 ma-0">
            <v-row>
                <v-col cols="3">
                    <v-card class="ma-2">
                        <v-card-title>
                            Одномерное уравнение
                        </v-card-title>
                        <v-card-subtitle class="text-left">
                            Входные параметры
                        </v-card-subtitle>
                        <v-card-text>
                            <v-text-field v-for="key in Object.keys(inputData)"
                                          :key="key"
                                          v-model="inputData[key]"
                                          :label="key"
                                          @change="setChartData"
                            ></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="9">
                    <v-card width="900"
                            height="900"
                            class="ma-2"
                    >
                        <scatter-chart
                                :chart-data="chartData"
                                :options="{responsive: true,
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    maxTicksLimit:200,
                                                    minTicksLimit:50,
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'x'
                                                }
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    maxTicksLimit:200,
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'c',
                                                }
                                            }]
                                    }}"
                        ></scatter-chart>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-parallax>
</template>

<script>
    import ScatterChart from '@/components/Chart/ScatterChart.js'

    export default {
        name: "Ecology.vue",
        components: {ScatterChart},
        data() {
            return {
                parallax: "https://images.pexels.com/photos/875858/pexels-photo-875858.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                chartData: {},
                inputData: {
                    M: 10,
                    H: 20,
                    U: 2,
                    K: 10,
                    coef: 4,
                    steps: 600
                },
            }
        },
        computed:
            {
                xMax() {
                    return Math.pow(this.inputData.H, 2) * this.inputData.U / (2 * this.inputData.K)
                },
                edgeX() {
                    return this.inputData.coef * this.xMax;
                },
                xStep() {
                    return this.edgeX / this.inputData.steps;
                },
                zStep() {
                    return 4 * this.inputData.H / this.inputData.steps;
                },
                cc() {
                    return 2 * this.inputData.K + Math.pow(this.zStep, 2) / this.xStep * this.inputData.U;
                }
            },
        created() {
            this.setChartData();
        },
        methods: {
            setChartData() {
                console.log(this.edgeX);
                var sets = [];
                const dt0 = this.getAnalyticalData();
                const dt1 = this.sweepMethod();
                console.log(dt1);
                sets.push({
                        label: 'Аналитическое решение',
                        borderColor: "#5fa0ff",
                        data: dt0,
                        pointRadius: 2
                    },
                    {
                        label: 'Численное решение',
                        borderColor: "#e0b1ff",
                        data: dt1,
                        pointRadius: 2
                    });

                this.chartData = {
                    datasets: sets
                };
            },
            getAnalyticalData() {
                const _s = this;
                let output = [];
                let x = this.xStep;
                for (let i = 0; i < _s.inputData.steps; i++) {
                    output.push({x: x, y: _s.f(x)});
                    x = x + this.xStep;
                }
                return output;
            },
            f(x) {
                const _s = this.inputData;
                return (_s.M / (Math.pow(_s.U * Math.PI * _s.K * x, 0.5))) * Math.exp(-Math.pow(_s.H, 2) * _s.U / (4 * _s.K * x));
            },
            sweepMethod() {
                let output = [];
                const _s = this.inputData;
                let x = this.xStep;
                let A = new Array(_s.steps).fill(0);
                for (let i = 1; i < _s.steps - 1; i++) {
                    A[i] = _s.K;
                }
                let B = new Array(_s.steps).fill(0);
                B[0] = -1;
                B[_s.steps - 1] = 0;
                for (let i = 1; i < _s.steps - 1; i++) {
                    B[i] = _s.K;
                }
                let C = new Array(_s.steps).fill(0);
                C[0] = -1;
                C[_s.steps - 1] = -1;
                for (let i = 1; i < _s.steps - 1; i++) {
                    C[i] = this.cc;
                }
                let F = new Array(_s.steps).fill(0);
                F[Math.ceil(_s.H / this.zStep)] = _s.M / (_s.U * this.zStep);
                for (let i = 1; i < _s.steps; i++) {
                    F[i] = -(Math.pow(this.zStep, 2) / this.xStep * _s.U * F[i]);
                }
                for (let i = 0; i < _s.steps; i++) {
                    let alfa = new Array(_s.steps).fill(0);
                    let beta = new Array(_s.steps).fill(0);
                    let X = new Array(_s.steps).fill(0);
                    alfa[0] = B[0] / C[0];
                    beta[0] = -F[0] / C[0];
                    for (let j = 1; j < _s.steps; j++) {
                        alfa[j] = B[j] / (C[j] - alfa[j - 1] * A[j]);
                        beta[j] = (A[j] * beta[j - 1] - F[j]) / (C[j] - alfa[j - 1] * A[j]);
                    }
                    X[_s.steps - 1] = beta[_s.steps - 1];
                    for (let k = _s.steps - 2; k >= 0; k--) {
                        X[k] = (alfa[k] * X[k + 1] + beta[k]);
                    }
                    output.push({x: x, y: X[1]});
                    for (let j = 1; j < _s.steps; j++) {
                        F[j] = -((Math.pow(this.zStep, 2) / this.xStep) * _s.U * X[j]);
                    }
                    x = x + this.xStep;
                }
                return output;
            }
        }
    }
</script>

<style scoped>

</style>