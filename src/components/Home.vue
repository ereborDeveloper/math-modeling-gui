<template>
    <div id="modeling">
        <v-card>
            <v-parallax
                    style="border-radius: 5px 5px 0 0"
                    height="300"
                    src="https://www.ice.org.uk/ICEDevelopmentWebPortal/media/what-is-civil-engineering/projects/weald-and-downland-gridshell.jpg?ext=.jpg"
            >
                <v-row>
                    <v-col cols="8">
                        <v-card class="ma-2 pa-2 dark-transparent"
                                dark>
                            <v-card-title>Моделирование деформирования оболочечных конструкций</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="text-left">Выполняется расчет напряженно-деформированного состояния
                                <span style="text-decoration: underline; cursor: pointer"
                                      @click="showParameters = true">{{shellsRussianCaseWhich[shellIndex - 1]}}</span>
                                оболочки
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="4">
                        <v-card class="ma-2 pa-2 dark-transparent"
                                dark>
                            <v-container fluid>
                                <v-row>
                                    <v-btn tile
                                           block
                                           v-bind:height=manageButtonHeight
                                           x-small
                                           @click="run()"
                                           :disabled="errorNetwork || errorCalc || running"
                                           class="modeling-dark"
                                    >
                                        {{runButtonValue}}
                                        <v-progress-circular v-if="running" class="ml-5"
                                                             indeterminate
                                                             color="primary"
                                        ></v-progress-circular>
                                    </v-btn>
                                    <v-btn tile
                                           :disabled="!errorCalc"
                                           block
                                           v-bind:height=manageButtonHeight
                                           x-small
                                           @click="errorReset()"
                                           class="modeling-dark"
                                    >
                                        Сброс ошибки<span v-if="errorCalc">: {{this.status}}</span>
                                    </v-btn>
                                </v-row>
                                <v-row>
                                    <v-btn tile
                                           block
                                           v-bind:height=manageButtonHeight
                                           x-small
                                           class="modeling-dark"
                                           disabled>Расширенные настройки кэширования<br> и многопоточного расчета
                                    </v-btn>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-col>
                </v-row>
            </v-parallax>
        </v-card>
        <v-container fluid class="py-0">
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

        <v-card v-if="showElementIndex === 2">
            <ModelingChart :data="json" :status="status" class="ma-0 pb-10"></ModelingChart>
        </v-card>
        <v-card v-if="showElementIndex === 3">
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
                v-if="showElementIndex === 4"
        >
            <Log :running="running"></Log>
        </v-card>
        <v-tabs tile
                v-if="showElementIndex === 1"
                class="elevation-1"
        >
            <v-tab>Геометрические параметры
            </v-tab>
            <v-tab>Физические параметры
            </v-tab>
            <v-tab>Точность расчета
            </v-tab>
            <v-tab-item>
                <v-card class="pa-10">
                    <v-row>
                        <v-col cols="4">
                            <p>Изображение поверхности</p>
                            <v-img style="border:1px #C2C2C2 solid; border-radius: 5px;"
                                   :src="shellsUrl[shellIndex-1]"></v-img>
                        </v-col>
                        <v-col cols="3">
                            <p>Тип поверхности</p>
                            <v-radio-group style="border:1px #C2C2C2 solid; border-radius: 5px;" v-model="shellIndex"
                                           class="pt-4 px-4">
                                <v-radio
                                        v-for="n in shells.length"
                                        :key="n"
                                        :label="shells[n-1]"
                                        :value="n"
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="2">
                            <p>Параметры Ляме</p>
                            <v-text-field outlined label="A" v-model="A[shellIndex-1]" disabled></v-text-field>
                            <v-text-field outlined label="B" v-model="B[shellIndex-1]" disabled></v-text-field>
                            <p>Параметры кривизны</p>
                            <v-text-field outlined label="kx" v-model="kx[shellIndex-1]" disabled></v-text-field>
                            <v-text-field outlined label="ky" v-model="ky[shellIndex-1]" disabled></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <p>Значение переменных</p>
                            <v-text-field outlined label="R1" v-model="R1"
                                          v-if="kx[shellIndex-1] === '1 / R1' "></v-text-field>
                            <v-text-field outlined label="R2" v-model="R2"
                                          v-if="ky[shellIndex-1] === '1 / R2' "></v-text-field>
                            <v-text-field outlined label="r" v-model="r"
                                          v-if="ky[shellIndex-1] === '1 / r' || A[shellIndex-1] === 'r'"></v-text-field>
                            <v-text-field outlined label="Theta" v-model="theta"
                                          v-if="B[shellIndex-1] === 'x * sin(Theta)'"></v-text-field>
                            <v-text-field outlined label="d" v-model="d"
                                          v-if="B[shellIndex-1] === 'd + r * sin(x)'"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card class="pa-10">
                    <v-row>
                        <v-col cols="2">
                            <p>Коэффициенты Пуассона</p>
                            <v-text-field outlined label="mu12" v-model="mu12"></v-text-field>
                            <v-text-field outlined label="mu21" v-model="mu21"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <p>Модуль упругости материала</p>
                            <v-text-field outlined label="E1" v-model="E1"></v-text-field>
                            <v-text-field outlined label="E2" v-model="E2"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <p>Параметры оболочки</p>
                            <v-text-field outlined label="h" v-model="h"></v-text-field>
                            <v-text-field outlined label="z" v-model="z"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <p>Постоянная Больцмана, G</p>
                            <v-text-field outlined label="k" v-model="k"></v-text-field>
                            <v-text-field outlined label="G = E/2(1 + mu12)" v-model="G"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <p>Интегрирование по X</p>
                            <v-text-field outlined label="a0" v-model="a0"></v-text-field>
                            <v-text-field outlined label="a1" v-model="a1"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <p>Интегрирование по Y</p>
                            <v-text-field outlined label="b0" v-model="b0"></v-text-field>
                            <v-text-field outlined label="b1" v-model="b1"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card class="pa-10">
                    <v-radio-group v-model="method">
                        <v-radio label="Метод Ньютона"
                                 :value="1"></v-radio>
                        <v-radio label="Метод BFGS"
                                 :value="0" disabled></v-radio>
                    </v-radio-group>
                    <v-row>
                        <v-col cols="2">
                            <v-text-field outlined
                                          label="N" v-model="n"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field outlined
                                          label="Считать до q" v-model="qMax"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field outlined
                                          label="Шаг по q" v-model="qStep"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-tab-item>
        </v-tabs>

        <v-snackbar
                v-model="snackbar"
                :multi-line="true"
        >
            {{infoMessage}}
            <v-progress-circular v-if="errorNetwork" class="ml-5"
                                 indeterminate
                                 color="primary"
            ></v-progress-circular>
        </v-snackbar>
    </div>
</template>

<script>
    import Log from "@/components/Log";
    import ModelingChart from "@/components/Chart/ModelingChart";
    import {HTTP} from '@/components/http-common.js';

    export default {
        name: "Home",
        components: {Log, ModelingChart},
        data() {
            return {
                method: 1,
                errorCalc: false,
                errorNetwork: false,
                serverName: "localhost",
                port: 9090,
                infoMessage: "",
                snackbar: false,
                manageButtonHeight: 57,
                showButtonHeight: 45,
                dataTypes: ["JSON", "XLS", "TXT"],
                showElementLabel: ["Параметры расчета", "График", "Выгрузить данные", "Лог"],
                showElementIcon: ["settings_applications", "show_chart", "save_alt", "list"],
                showElementIndex: 1,
                mu12: 0.3,
                mu21: 0.3,
                E1: 210000,
                E2: 210000,
                h: 0.09,
                k: 0.8333333,
                a0: 0,
                a1: 5.4,
                b0: 0,
                b1: 5.4,
                qMax: 3.5,
                qStep: 0.01,
                d: 0,
                theta: 0,
                r: 0.05,
                R1: 20.5,
                R2: 20.5,
                shellIndex: 1,
                panel: [0],
                n: 1,
                tableRows: 50,
                json: [],
                headers: [],
                status: "",
                isOpened: 1,
                shells: ["Пологая двоякой кривизны", "Цилиндрическая", "Коническая", "Сферическая", "Торообразная"],
                shellsUrl: ["https://sun9-5.userapi.com/v9GY2NgyB_HztGnlijwk81Jt-wA-olR-t1tgjA/avOT8WgThfs.jpg", "https://sun9-23.userapi.com/luNu0X-j8ewMac3PeE_uQQcCUHXBGCVxu6MZLQ/R7_bGL9trFk.jpg", "https://sun9-51.userapi.com/g3DIuKPekpotrgkqf-bWUtXxBFPATQpMUF0lOg/ivXfJOXz5No.jpg", "https://sun9-16.userapi.com/P1fuz_WSIQThKpjhsikZCaYIbcRNMfKr24PMHQ/Qc4zZV-_5vM.jpg", "https://sun9-46.userapi.com/nGIQwlOFIkAJm9T2xxTgh6O0poobfEtud2CQgw/g0lQnIUL9l0.jpg"],
                shellsRussianCaseWhich: ["пологой", "цилиндрической", "конической", "сферической", "торообразной"],
                A: ["1", "1", "1", "r", "r"],
                B: ["1", "r", "x * sin(Theta)", "r * sin(x)", "d + r * sin(x)"],
                kx: ["1 / R1", "0", "0", "1 / r", "1 / r"],
                ky: ["1 / R2", "1 / r", "ctg(Theta) / x", "1 / r", "sin(x) / (d + r * sin(x))"],
                running: false
            }
        },
        computed: {
            runButtonValue: function () {
                if (!this.running) {
                    return "Запуск расчета";
                } else return "Выполняется расчет"
            },
            z: function () {
                return -this.h / 2;
            },
            /**
             * @return {number}
             */
            G: function () {
                return this.E1 / 2 / (1 + this.mu12);
            }
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

                HTTP.post("start", {
                    n: this.n,
                    qstep: this.qStep,
                    qmax: this.qMax,
                    shellindex: this.shellIndex,
                    d: parseFloat(this.d),
                    theta: parseFloat(this.theta),
                    r: parseFloat(this.r),
                    r1: parseFloat(this.R1),
                    r2: parseFloat(this.R2),
                    mu12: parseFloat(this.mu12),
                    mu21: parseFloat(this.mu21),
                    E1: parseFloat(this.E1),
                    E2: parseFloat(this.E2),
                    h: parseFloat(this.h),
                    k: parseFloat(this.k),
                    G: parseFloat(this.G),
                    z: parseFloat(this.z),
                    a0: parseFloat(this.a0),
                    a1: parseFloat(this.a1),
                    b0: parseFloat(this.b0),
                    b1: parseFloat(this.b1)
                }).then(response => {
                        response.status;
                        this.infoMessage = "Расчет окончен.";
                        this.snackbar = true;
                    }
                ).catch(error => {
                    this.status = error;
                });
            },
            getRunningStatus() {
                HTTP.get("running-status").then(response => {
                    this.running = response.data;
                    if (!this.running) {
                        clearInterval(this.interval);
                    }
                }).catch(error => {
                    this.status = error;
                });
            },
            getData() {
                var _self = this;
                this.interval = setInterval(function () {
                    HTTP.get("output")
                        .then(response => {
                            _self.json = response.data;
                        }).catch(error => {
                        _self.status = error;
                    });
                    _self.getRunningStatus();

                }, 200);
            },
            errorReset() {
                HTTP.post("status-reset").then(() => {
                        this.errorCalc = false;
                        this.snackbar = false;
                    }
                ).catch(error => {
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
        background: rgba(0, 0, 0, 0.6) !important;
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

</style>