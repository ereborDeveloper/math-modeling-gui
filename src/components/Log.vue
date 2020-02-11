<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th v-for="header in headers"
                        v-bind:key="header.text"
                        class="text-left">{{header.text}}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in log.slice(1, log.length - 1)"
                    v-bind:key="item.status">
                    <td>
                        <v-icon v-if="item.time !== null"
                                color="green">done
                        </v-icon>
                        <v-icon v-else>query_builder</v-icon>
                    </td>
                    <td class="text-left">
                        <span class="cell"
                              style="cursor: pointer">{{item.status}}</span>
                    </td>
                    <td class="text-left">
                        <span class="cell"
                              style="cursor: pointer">{{item.time}}</span>
                    </td>
                </tr>
                <tr v-for="item in log.slice( log.length - 1, log.length)"
                    v-bind:key="item.status">
                    <td>
                    </td>
                    <td class="text-left">
                        <span class="cell"
                              style="cursor: pointer">{{item.status}}</span>
                    </td>
                    <td class="text-left">
                        <span class="cell"
                              style="cursor: pointer">{{item.time}}</span>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
    import {HTTP} from '@/components/http-common.js';

    export default {
        name: "Log",
        props: ["running"],
        data() {
            return {
                log: [],
                expandedIndex: -1,
                headers: [
                    {text: 'Статус', value: 'n', sortable: false, align: 'center'},
                    {text: "Этап", sortable: false, value: "status", align: 'center'},
                    {text: "Время выполнения", sortable: false, value: "time", align: 'center'}
                ]
            }
        },
        watch: {
            running: function (value) {
                if (value) {
                    this.update();
                }
            }
        },
        methods: {
            getLogs() {
                HTTP.get("log").then(response => {
                    this.log = [];
                    for (var key in response.data) {
                        this.log.push({status: key, time: response.data[key]});
                    }
                }).catch(error => {
                    this.log.push({status: error, time: new Date()});
                });
            },
            update() {
                var _self = this;
                var update = setInterval(function () {
                    if (!_self.running) {
                        clearInterval(update);
                    }
                    _self.getLogs();
                }, 100);
            }
        },
        created() {
            this.update();
        },
    }
</script>

<style scoped>

</style>