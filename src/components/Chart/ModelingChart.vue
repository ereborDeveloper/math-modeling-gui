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
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="9">
                <v-card  v-bind:width="chartScale">
                    <line-chart ref="chart" :chart-data="deflection"
                                :options="{responsive: true, maintainAspectRatio: true, pointDotRadius: 1, pointDotStrokeWidth: 1, pointHitDetectionRadius: 1,
                    scales: {
                        xAxes: [{
                            ticks: {
                                maxTicksLimit:10,
                                beginAtZero: true,
                                max: 4,
                                min: 0
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'q'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                autoSkip: false,
                                beginAtZero: true,

                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'W'
                            }
                        }]

                }}"
                    ></line-chart>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import LineChart from './LineChart.js'
    import {saveAs} from 'file-saver'

    export default {
        props: ["data"],
        components: {
            LineChart
        },
        data() {
            return {
                minW: 0,
                maxW: 0.3,
                minQ: 0,
                maxQ: 3.3,
                chartScale: 900,
                deflection: {},
                json: [],

            }
        },
        computed: {
            chartData: function () {
                return this.data;
            },
            chartComputedScale: function () {
                return this.chartScale;
            }
        },
        watch: {
            data: function () {
                this.fillData();
            }
        },
        mounted() {
            this.fillData()
        },
        methods: {
            fillData() {
                var json = [];
                var lbl = [];
                var dt0 = [];
                var dt1 = [];
                for (var k in this.chartData) {
                    let w0 = this.chartData[k][0];
                    let w1 = this.chartData[k][1];
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
                    json.push(ob)
                }
                json.sort(function (a, b) {
                    return a.q - b.q;
                });
                for (var obj in json) {
                    const q = Number(json[obj].q);
                    if (q >= this.minQ && q <= this.maxQ) {
                        lbl.push(q.toFixed(2));
                        dt0.push(json[obj].W[0]);
                        dt1.push(json[obj].W[1]);
                    }
                }
                this.deflection = {
                    labels: lbl,
                    datasets: [{
                        label: 'W(q) (a/2; b/2)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: dt0,
                        fill: false
                    },
                        {
                            label: 'W(q) (a/4; b/4)',
                            borderColor: 'rgb(99, 255, 132)',
                            data: dt1,
                            fill: false
                        }
                    ]
                };
            },
            savePNG() {
                this.$refs.chart.$refs.canvas.toBlob(function (blob) {
                    saveAs(blob, "chart.png");
                });
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