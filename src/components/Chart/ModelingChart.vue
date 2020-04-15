<template>
    <div>
        <v-row class="justify-center">
            <v-col cols="2">
                <p class="text-left">Отрисовка по W</p>
                <v-row>
                    <v-col cols="6">
                        <v-text-field outlined label="Минимальное W" v-model="minW" @input="fillData()"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined label="Максимальное W" v-model="maxW" @input="fillData()"></v-text-field>
                    </v-col>
                </v-row>
                <p class="text-left">Отрисовка по Q</p>
                <v-row>
                    <v-col cols="6">
                        <v-text-field outlined label="Минимальное Q" v-model="minQ" @input="fillData()"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field outlined label="Максимальное Q" v-model="maxQ" @input="fillData()"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <p class="text-left">Масштаб</p>
                        <v-slider class="pt-3" v-model="chartScale" min="400" max="1230"></v-slider>
                        <v-btn dark @click="savePNG()" height="55">
                            <v-icon left>save</v-icon>
                            Сохранить в PNG
                        </v-btn>
                        <v-btn dark @click="saveChart()" height="55">
                            <v-icon left>save</v-icon>
                            Сохранить на графике
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="9">
                <v-card v-bind:width="chartScale">
                    <scatter-chart ref="chart"
                                   :chart-data="deflection"
                                   :options="{responsive: true,
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    maxTicksLimit:200,
                                                    minTicksLimit:50,
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'W'
                                                }
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    maxTicksLimit:200,
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'q',
                                                }
                                            }]
                                    }}"
                    ></scatter-chart>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ScatterChart from './ScatterChart.js'

    import {saveAs} from 'file-saver'

    export default {
        props: ["data"],
        components: {
            ScatterChart
        },
        data() {
            return {
                minW: 0,
                maxW: 0.5,
                minQ: 0,
                maxQ: 5,
                chartScale: 900,
                deflection: {},
                dt0Color: null,
                dt1Color: null,
                json: [],
                history: []
            }
        },
        computed: {
            chartData: function () {
                return this.data;
            },
            chartName() {
                const shellName = this.$store.state.shells[this.$store.state.shellindex];
                let edge = "";
                if(this.$store.state.edgeData.isedgeenabled) {
                    edge = "; Ребра: по X - " + this.$store.state.edgeData.edgex + ", по Y - " + this.$store.state.edgeData.edgey;
                }
                return shellName + "; N: " + this.$store.state.accuracyData.n + "; Ньютон: " + this.$store.state.accuracyData.stepcount + "; Шаг q: " + this.$store.state.accuracyData.qstep + edge;
            },

        },
        watch: {
            data: function () {
                this.fillData();
            }
        },
        created() {
            this.setColor();
        },
        mounted() {
            this.fillData();
        },
        methods: {
            setColor() {
                this.dt0Color = this.randomColor();
                this.dt1Color = this.randomColor();
            },
            randomColor() {
                const r = (Math.random() * 255).toFixed(0);
                const b = (Math.random() * 255).toFixed(0);
                const g = (Math.random() * 255).toFixed(0);
                return 'rgb(' + r + ', ' + g + ', ' + b + ')';
            },
            fillData() {
                const sets = [];
                let charts = [];
                for (let z in this.history) {
                    charts.push(this.history[z]);
                }
                charts.push({chartName: this.chartName, data: this.chartData});
                for (let i in charts) {
                    const chart = charts[i];
                    const data = chart.data;
                    let ouputEntry = [];
                    for (let k in data) {
                        let w0 = data[k][0];
                        let w1 = data[k][1];
                        if (w0 > this.maxW) {
                            w0 = this.maxW;
                        }
                        if (w0 < this.minW) {
                            w0 = this.minW;
                        }
                        if (w1 > this.maxW) {
                            w1 = this.maxW;
                        }
                        if (w1 < this.minW) {
                            w1 = this.minW;
                        }
                        var ob = {q: k, W: [w0, w1]};
                        ouputEntry.push(ob)
                    }
                    ouputEntry.sort(function (a, b) {
                        return a.q - b.q;
                    });
                    const dt0 = [];
                    const dt1 = [];
                    for (let obj in ouputEntry) {
                        const q = Number(ouputEntry[obj].q).toFixed(6);
                        if (q >= this.minQ && q <= this.maxQ) {
                            dt0.push({x: ouputEntry[obj].W[0], y: q});
                            dt1.push({x: ouputEntry[obj].W[1], y: q});
                        }
                    }
                    sets.push({
                            label: chart.chartName + ': W(q) (a/2; b/2)',
                            borderColor: typeof chart.chartColor0 === "undefined" ? this.dt0Color : chart.chartColor0,
                            data: dt0,
                            pointRadius: 2
                        },
                        {
                            label: chart.chartName + ': W(q) (a/4; b/4)',
                            borderColor: typeof chart.chartColor1 === "undefined" ? this.dt1Color : chart.chartColor1,
                            data: dt1,
                            pointRadius: 2
                        });
                }

                console.log(sets);
                this.deflection = {
                    datasets: sets
                };

            },
            savePNG() {
                this.$refs.chart.$refs.canvas.toBlob(function (blob) {
                    saveAs(blob, "chart.png");
                });
            },
            saveChart() {
                console.log(this.chartName);
                this.history.push({
                    chartName: this.chartName,
                    chartColor0: this.dt0Color,
                    chartColor1: this.dt1Color,
                    data: this.chartData
                });
                this.setColor();
            }
        }
    }
</script>
<style>
    .small {
        max-width: 600px;
        margin: 150px auto;
    }
</style>