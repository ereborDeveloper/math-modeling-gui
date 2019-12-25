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
                var dt = [];
                for (var k in this.chartData) {
                    var ob = {q: k, W: this.chartData[k]};
                    json.push(ob)
                }
                json.sort(function (a, b) {
                    return a.q - b.q;
                });
                for (var obj in json) {
                    lbl.push(json[obj].q);
                    dt.push(json[obj].W);
                }
                this.deflection = {
                    labels: lbl,
                    datasets: [{
                        label: 'W(q)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: dt,
                        fill: false
                    }]
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