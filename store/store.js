import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        shells: ["Пологая", "Цилиндрическая", "Коническая", "Сферическая", "Торообразная"],
        shellindex: 0,
        edgeData: {
            isEdgeEnabled: true
        },
        accuracyData: {
            n: 1,
            qstep: 0.01,
            qmax: 3.3,
            stepcount: 10,
            eps: 0.00000001,
            optimizationbreak: 10
        },
        geometryData: {
            d: 0,
            theta: 0,
            r: 0.05,
            r1: 20.5,
            r2: 20.5,
        },
        physicalData: {
            mu12: 0.3,
            mu21: 0.3,
            E1: 210000,
            E2: 210000,
            h: 0.09,
            k: 0.8333333,
            G: 33000,
            z: 0.045,
            a0: 0,
            a1: 5.4,
            b0: 0,
            b1: 5.4
        }
    },
    mutations: {
        updateShellIndex(state, index) {
            state.shellindex = index
        },
        updatePhysicalData(state, data) {
            state.physicalData = data
        },
        updateGeometryData(state, data) {
            state.geometryData = data
        },
        updateAccuracyData(state, data) {
            state.accuracyData = data
        },
        updateEdgeData(state, data) {
            state.edgeData = data
        }
    }
});

