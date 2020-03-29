<template>
    <v-row class="pa-0 ma-0">
        <v-col cols="5">
            <v-row>
                <v-col cols="8"
                       align-self="center">
                    <transition name="fade">
                        <v-img class="pb-2"
                               :src="shellsUrl[shellIndex]"
                               :key="shellIndex"
                        >
                        </v-img>
                    </transition>
                </v-col>
                <v-col cols="4" class="pa-0 ma-0">
                    <v-list
                            class="pa-0 ma-0"
                    >
                        <v-list-item-group v-model="shellIndex"
                                           color="secondary"
                        >
                            <v-list-item
                                    v-for="i in shells"
                                    :key="i"
                                    class="py-5"
                            >
                                <v-list-item-content
                                >
                                    <v-list-item-title v-text="i"
                                                       class="overline"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="7"
               class="physical-card ma-0"
        >
            <v-row>
                <v-col cols="6"
                       align-self="center"
                >
                    <v-row>
                        <v-col cols="6"
                               align-self="center">
                            <span class="caption text-uppercase">Параметры Ляме</span>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="A"
                                          v-model="A[shellIndex]"
                                          disabled></v-text-field>
                            <v-text-field label="B"
                                          v-model="B[shellIndex]"
                                          disabled></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6" align-self="center"
                >
                    <v-row>
                        <v-col cols="6"
                               align-self="center">
                            <span class="caption text-uppercase">Значение переменных</span>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="inputData.r1"
                                          v-if="shellIndex === 0">
                                <template slot="label">R<sub>1</sub></template>
                            </v-text-field>
                            <v-text-field v-model="inputData.r2"
                                          v-if="shellIndex === 0">
                                <template slot="label">R<sub>2</sub></template>
                            </v-text-field>
                            <v-text-field label="r"
                                          v-model="inputData.r"
                                          v-if="[1, 3, 4].includes(shellIndex)"></v-text-field>
                            <v-text-field label="θ"
                                          v-model="inputData.theta"
                                          v-if="shellIndex === 2"></v-text-field>
                            <v-text-field label="d"
                                          v-model="inputData.d"
                                          v-if="shellIndex === 4"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6"
                       align-self="center"
                >
                    <v-row>
                        <v-col cols="6"
                               align-self="center">
                            <span class="caption text-uppercase">Параметры кривизны</span>
                        </v-col>
                        <v-col cols="6">
                            <v-container>
                                <v-row>
                                    <span>k<sub>x</sub>: </span><span
                                        class="mx-2"
                                        v-html="kx[shellIndex]"></span>
                                </v-row>
                                <v-row>
                                    <span>k<sub>y</sub>: </span><span
                                        class="mx-2"
                                        v-html="ky[shellIndex]"></span>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Geometry",
        data() {
            return {
                item: 1,
                shells: ["Пологая", "Цилиндрическая", "Коническая", "Сферическая", "Торообразная"],
                inputData: null,
                isEdgeActivated: true,
                // shells: this.$store.state.shells,
                A: ["1", "1", "1", "r", "r"],
                B: ["1", "r", "x * sin(θ)", "r * sin(x)", "d + r * sin(x)"],
                kx: [" 1 / R<sub>1</sub>", " 0", "0", " 1 / r", " 1 / r"],
                ky: [" 1 / R<sub>2</sub>", " 1 / r", " ctg(θ) / x", " 1 / r", " sin(x) / (d + r * sin(x))"],
                shellsUrl: ["https://sun9-5.userapi.com/v9GY2NgyB_HztGnlijwk81Jt-wA-olR-t1tgjA/avOT8WgThfs.jpg", "https://sun9-23.userapi.com/luNu0X-j8ewMac3PeE_uQQcCUHXBGCVxu6MZLQ/R7_bGL9trFk.jpg", "https://sun9-51.userapi.com/g3DIuKPekpotrgkqf-bWUtXxBFPATQpMUF0lOg/ivXfJOXz5No.jpg", "https://sun9-16.userapi.com/P1fuz_WSIQThKpjhsikZCaYIbcRNMfKr24PMHQ/Qc4zZV-_5vM.jpg", "https://sun9-46.userapi.com/nGIQwlOFIkAJm9T2xxTgh6O0poobfEtud2CQgw/g0lQnIUL9l0.jpg"],
            }
        },
        computed:
            {
                shellIndex: {
                    get() {
                        return this.$store.state.shellindex
                    },
                    set(value) {
                        this.$store.commit('updateShellIndex', value)
                    }
                }

            },
        watch: {
            inputData: {
                handler(newValue, oldValue) {
                    if (oldValue !== null) {
                        this.$store.commit('updateGeometryData', newValue);
                    }
                },
                deep: true
            }
        },
        created() {
            this.inputData = this.$store.state.geometryData;
        }

    }
</script>

<style>

</style>