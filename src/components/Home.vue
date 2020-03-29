<template>
    <div>
        <v-parallax
                height="560"
                :src="parallax"
                class="pt-0 ma-0"
        >
            <v-container class="px-10">
                <v-card
                        style="transition: height .4s; border-radius: 0 !important;"
                        class="ma-0 pa-0"
                >
                    <v-row class="ma-0 pa-0">
                        <v-col cols="1"
                               class="pa-0 ma-0"
                        >
                            <v-list
                                    class="pa-0 ma-0"
                                    height="100%"
                                    style="border-radius: 0 !important;"
                            >
                                <v-list-item-group v-model="slide"
                                                   color="secondary"
                                >
                                    <v-list-item class="py-7">
                                        <v-list-item-content>
                                            <v-list-item-icon class="justify-center">
                                                <v-icon x-large>info</v-icon>
                                            </v-list-item-icon>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item class="py-7">
                                        <v-list-item-content>
                                            <v-list-item-icon class="justify-center">
                                                <v-icon x-large>settings</v-icon>
                                            </v-list-item-icon>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                                <v-list-item-group
                                        color="secondary"
                                >
                                    <v-list-item class="py-7"
                                                 @click="run()"
                                                 :disabled="running"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-icon class="justify-center">
                                                <v-progress-circular v-if="running"
                                                                     indeterminate
                                                                     size="25"
                                                                     color="primary"
                                                                     class="pa-0 ml-2"
                                                ></v-progress-circular>
                                                <v-icon x-large
                                                        v-else>play_arrow
                                                </v-icon>
                                            </v-list-item-icon>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-col>
                        <v-col cols="11"
                               class="pa-0 ma-0"
                        >
                            <v-window
                                    v-model="slide"
                            >
                                <v-window-item>
                                    <v-card-title>Моделирование деформирования оболочечных конструкций</v-card-title>
                                    <v-card-text
                                            class="text-left py-2"
                                    >
                                        <v-fade-transition>
                                            <p>Выполняется расчет напряженно-деформированного состояния
                                                <span style="text-decoration: underline; cursor: pointer"
                                                      @click="showParameters = true">{{shellsRussianCaseWhich[shellIndex]}}</span>
                                                оболочки
                                            </p>
                                        </v-fade-transition>
                                        <v-btn tile
                                               :disabled="!errorCalc"
                                               v-bind:height=manageButtonHeight
                                               v-bind:width=140
                                               x-small
                                               @click="errorReset()"
                                               class="modeling-dark pa-5"
                                        >
                                            Сброс ошибки<span v-if="errorCalc">: {{this.status}}</span>
                                        </v-btn>
                                    </v-card-text>
                                </v-window-item>
                                <v-window-item>
                                    <v-tabs tile
                                            v-if="showElementIndex === 1"
                                            class="pa-0 ma-0"
                                    >
                                        <v-tab>Геометрические параметры
                                        </v-tab>
                                        <v-tab>Физические параметры
                                        </v-tab>
                                        <v-tab>Точность расчета
                                        </v-tab>
                                        <v-tab>Ребро
                                        </v-tab>
                                        <v-tab>Производительность
                                        </v-tab>
                                        <v-tab-item>
                                            <geometry></geometry>
                                        </v-tab-item>
                                        <v-tab-item>
                                            <physical></physical>
                                        </v-tab-item>
                                        <v-tab-item>
                                            <accuracy></accuracy>
                                        </v-tab-item>
                                        <v-tab-item>
                                            <edge></edge>
                                        </v-tab-item>
                                        <v-tab-item>
                                            <extra></extra>
                                        </v-tab-item>
                                    </v-tabs>
                                </v-window-item>
                            </v-window>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>

        </v-parallax>
        <v-container class="px-10 py-0">
            <v-container class="py-0">
                <v-row>
                    <v-btn v-for="i in showElementLabel.length" :key="i"
                           v-bind:height=showButtonHeight
                           block tile
                           @click="showElementIndex = i"
                           :class="showElementIndex === i? 'chosen-btn' : 'modeling-dark'"
                    >
                        <v-icon left>{{showElementIcon[i-1]}}
                        </v-icon>
                        {{showElementLabel[i-1]}}
                    </v-btn>
                </v-row>
            </v-container>
            <v-card v-if="showElementIndex === 1">
                <ModelingChart :data="json" :status="status" class="ma-0 pb-10"></ModelingChart>
            </v-card>
            <v-card v-if="showElementIndex === 2">
                <v-card-title>В каком формате вы хотите выгрузить данные?</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="3"></v-col>
                        <v-col cols="3">
                            <v-combobox label="Форматы" outlined multiple :items="dataTypes"></v-combobox>
                        </v-col>
                        <v-col cols="3">
                            <v-btn class="modeling-dark" height="57" dark>Выгрузить</v-btn>
                        </v-col>
                        <v-col cols="3"></v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card tile
                    v-if="showElementIndex === 3"
                    disabled
            >
                Нужна база данных
                <!--                <Log :running="running"></Log>-->
            </v-card>
            <v-snackbar
                    v-model="snackbar"
                    :multi-line="true"
            >
                {{infoMessage}}
                <v-progress-circular v-if="errorNetwork"
                                     class="ml-5"
                                     indeterminate
                                     color="primary"
                ></v-progress-circular>
            </v-snackbar>
        </v-container>

    </div>
</template>

<script>
    import ModelingChart from "@/components/Chart/ModelingChart";
    import {HTTP} from '@/components/http-common.js';
    import Accuracy from "@/components/Settings/Accuracy";
    import Geometry from "@/components/Settings/Geometry";
    import Physical from "@/components/Settings/Physical";
    import Edge from "@/components/Settings/Edge";
    import Extra from "@/components/Settings/Extra";

    export default {
        name: "Home",
        components: {Extra, Physical, Edge, Geometry, Accuracy, ModelingChart},
        data() {
            return {
                length: 4,
                slide: 1,
                parallax: "https://i.ibb.co/9rkhMFz/2.jpg",
                isIntegrateCached: true,
                availableCores: 1,
                method: 1,
                errorCalc: false,
                errorNetwork: false,
                infoMessage: "",
                snackbar: false,
                manageButtonHeight: 64,
                showButtonHeight: 45,
                dataTypes: ["JSON", "XLS", "TXT"],
                showElementLabel: ["График", "Выгрузить данные", "Активность"],
                showElementIcon: ["show_chart", "save_alt", "list"],
                showElementIndex: 1,
                panel: [0],
                tableRows: 50,
                json: [],
                headers: [],
                status: "",
                isOpened: 1,
                shellsRussianCaseWhich: ["пологой", "цилиндрической", "конической", "сферической", "торообразной"],
                running: false
            }
        },
        computed: {
            shellIndex() {
                return this.$store.state.shellindex;
            },

            z: function () {
                return -this.h / 2;
            },
            /**
             * @return {number}
             */
            /*            G: function () {
                            return this.E1 / 2 / (1 + this.mu12);
                        }*/
        },
        watch: {
            status: function () {
                const statusString = this.status.toString();
                if (statusString.includes("Error")) {
                    this.errorNetwork = true;
                    this.infoMessage = "Ошибка сети. Проверьте доступность сервера. Пробуем переподключиться.";
                    this.snackbar = true;
                }
                if (!statusString.includes("Error") && this.errorNetwork) {
                    this.infoMessage = "Соединение восстановлено";
                    this.errorNetwork = false;
                }
                if (statusString === "Ошибка") {
                    this.errorCalc = true;
                    this.infoMessage = "Ошибка в вычислениях. Пожалуйста, проверьте параметры или обратитесь к разработчику.";
                    this.snackbar = true;
                }
            }
        },
        methods: {
            run() {
                this.status = "Запуск";
                this.getData();
                const shellIndex = {shellindex: this.$store.state.shellindex};
                const accuracyData = this.$store.state.accuracyData;
                const geometryData = this.$store.state.geometryData;
                const physicalData = this.$store.state.physicalData;
                const edgeData = this.$store.state.edgeData;
                const inputData = Object.assign(shellIndex, physicalData, geometryData, accuracyData, edgeData);
                console.log(inputData);
                HTTP.post("start", inputData)
                    .then(response => {
                        response.status;
                        this.infoMessage = "Расчет окончен.";
                        this.snackbar = true;
                    })
                    .catch(error => {
                        this.status = error;
                    });
            },
            loadExtraSettings() {
                HTTP.get("settings")
                    .then(response => {
                        this.availableCores = response.data.availableCores;
                        this.isIntegrateCached = response.data.integrateCached;
                    })
                    .catch(error => {
                        this.status = error;
                    });
            },
            saveExtraSettings() {
                HTTP.post("settings", {
                    availableCores: this.availableCores,
                    integrateCached: this.isIntegrateCached
                })
                    .then(() => {
                        this.extraSettings = false;
                    })
                    .catch(error => {
                        this.status = error;
                    });
            },
            getRunningStatus() {
                HTTP.get("running-status")
                    .then(response => {
                        this.running = response.data;
                        if (!this.running) {
                            clearInterval(this.interval);
                        }
                    })
                    .catch(error => {
                        this.status = error;
                    });
            },
            getData() {
                var _self = this;
                this.interval = setInterval(function () {
                    HTTP.get("output")
                        .then(response => {
                            _self.json = response.data;
                        })
                        .catch(error => {
                            _self.status = error;
                        });
                    _self.getRunningStatus();

                }, 1500);
            },
            errorReset() {
                HTTP.post("status-reset")
                    .then(() => {
                        this.errorCalc = false;
                        this.snackbar = false;
                    })
                    .catch(error => {
                        this.status = error;
                    });
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style>
    .v-label, .v-text-field input {
        font-size: 0.9em !important;
    }

    .dark-transparent {
        background: rgba(255, 255, 255, 1) !important;
        color: #fff !important;
    }

    .v-btn {
        min-width: 0 !important;
    }

    .modeling-dark, .modeling-dark:before, .modeling-dark:focus:before, .modeling-dark:focus, .modeling-dark:hover:before {
        color: #fff !important;
        background: #363636 !important;
    }

    .chosen-btn {
        background: #fff !important;
        color: #363636 !important;
        text-shadow: 0 0 1px #66c1ff;
        transition-duration: 0.6s;
    }

    .modeling-dark:hover {
        color: #66c1ff !important;
        text-shadow: 0 0 5px #7c8498;
        transition: 0.6s ease-in;
    }

    .centered-input input {
        text-align: center
    }

    .physical-card {
        margin-top: 0.5em;
        background: linear-gradient(to right, #aaa -20%, #fff 3%, #fff 100%);
    }

    .physical-card-first {
        margin-top: 0.5em;
    }

    .active {
        border-left: #E5E5E5 1px solid;
        border-bottom: #E5E5E5 1px solid;
    }
</style>