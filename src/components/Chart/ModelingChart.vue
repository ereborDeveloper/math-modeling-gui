<template>
    <div>
        <v-row class="justify-center">
            <v-col cols="3">
                <p>Ограничения по W</p>
                <v-text-field outlined label="Минимальное W" v-model="minW" @input="fillData()"></v-text-field>
                <v-text-field outlined label="Максимальное W" v-model="maxW" @input="fillData()"></v-text-field>
            </v-col>
            <v-col cols="4">
                Масштаб:
                <v-slider v-model="chartScale" min="400" max="1600"></v-slider>
            </v-col>
            <v-col cols="2">
                <v-btn dark @click="savePNG()">
                    <v-icon left>save</v-icon>
                    Сохранить в PNG
                </v-btn>
            </v-col>
            <v-col cols="3">
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-card max-width="inherit" v-bind:width="chartScale">
                <line-chart ref="chart" :chart-data="deflection"
                            :options="{responsive: true, maintainAspectRatio: true, pointDotRadius: 1, pointDotStrokeWidth: 1, pointHitDetectionRadius: 2,
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
                maxW: 1,
                chartScale: 600,
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
                    lbl.push(Number(json[obj].q).toFixed(2));
                    dt0.push(json[obj].W[0]);
                    dt1.push(json[obj].W[1]);
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
            savePNG(){
                this.$refs.chart.$refs.canvas.toBlob(function(blob) {
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