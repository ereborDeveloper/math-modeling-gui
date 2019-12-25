<template>
    <div>
        <v-card>
            <v-card-title>Рассчет</v-card-title>
            <v-card-text>
                <v-row>
                <v-col cols="3">Статус: {{computedStatus}}</v-col>
                <v-col cols="6">
                <line-chart style="transform: rotate(-90deg)" :chart-data="deflection"
                            :options="{responsive: true, maintainAspectRatio: true, scales: {
            xAxes: [{
                ticks: {
                    maxTicksLimit:10,
                    maxRotation: -90,
                    minRotation: -90,
                                        beginAtZero: true,

                    max: 4,
                    min: 0
                }
            }],
            yAxes: [{
                ticks: {
                    autoSkip: false,
                    maxRotation: -90,
                    minRotation: -90,
                    beginAtZero: true,
                    max: 0.3,
                    min: 0
                }
            }],
            showTooltips: false
        }
}"></line-chart>
                </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import LineChart from './LineChart.js'

    export default {
        props: ["data", "status"],
        components: {
            LineChart
        },
        data() {
            return {
                deflection: {},
                json: []
            }
        },
        computed: {
            chartData: function () {
                return this.data;
            },
            computedStatus: function () {
                return this.status;
            }
        }, watch: {
            data: function () {
                // this._chart.destroy();
                //this.renderChart(this.data, this.options);
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
                    var ob = {q: k, W: this.chartData[k]};
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