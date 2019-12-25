<template>
    <div>
        <v-card>
            <v-card-title>График</v-card-title>
            <v-card-text>
                <line-chart class="small" style="transform: rotate(-90deg)" :chart-data="deflection"
                            :options="{responsive: true, maintainAspectRatio: true, scales: {
            xAxes: [{
                ticks: {
                    maxRotation: -90,
                    minRotation: -90
                }
            }],
            yAxes: [{
                ticks: {
                ticksLength:5,
                    autoSkip: false,
                    maxRotation: -90,
                    minRotation: -90
                }
            }],
            showTooltips: false
        }
}"></line-chart>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import LineChart from './LineChart.js'

    export default {
        props: ["data"],
        components: {
            LineChart
        },
        data() {
            return {
                status: "Получаем статус...",
                deflection: {},
                json: []
            }
        },
        computed: {
            chartData: function () {
                return this.data;
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