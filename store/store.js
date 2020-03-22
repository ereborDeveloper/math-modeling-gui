import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        shells: ["Пологая", "Цилиндрическая", "Коническая", "Сферическая", "Торообразная"],
        shellindex: 1,
        inputAccuracy: {
            n: 1,
            qstep: 0.01,
            qmax: 3.3,
            stepcount: 10,
            eps: 0.00000001,
        },
        inputPhysical: {

        }
    },
    mutations: {
        updateShellIndex (state, index) {
            state.shellindex = index
        }
    }
});

