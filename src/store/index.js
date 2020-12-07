import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    components: [],
    currentPlacable: null
  },
  getters: {
    getCurrentPlacable: state => {
      console.log(state.currentPlacable);
      return state.currentPlacable;
    },
    getComponents: state => {
      return state.components;
    },
    getChanger: state => id => {
      return state.components[id].changer;
    },
    getComponent: state => id => {
      return state.components[id];
    },
    getPlacerParams: state => id => {
      return state.components[id].placerParams;
    }
  },
  mutations: {
    setCurrentPlacable: (state, payload) => {
      state.currentPlacable = payload;
    },
    //setComponent: (state, payload) => {
    //  if (state.components.length == 0) {
    //    state.components.push(payload);
    //  } else {
    //    let nul = state.components.find(element => element == null);
    //    let nul_number = state.components.indexOf(nul);
    //    state.components[nul_number] = payload;
    //  }
    //},
    setComponent: (state, payload) => {
      state.components.push(payload);
    },
    setChanger: (state, payload) => {
      state.components[payload.id].changer = payload.changer;
      console.log("From vuex: " + state.components[payload.id].changer);
    },
    setPlacerParams: (state, payload) => {
      state.components[payload.id].placerParams = payload.placerParams;
      console.log(
        "From vuex: " + state.components[payload.id].placerParams.scalable
      );
      console.log(
        "From vuex: " + state.components[payload.id].placerParams.resizable
      );
    },
    deleteComponent: (state, payload) => {
      state.components.splice(payload, 1);
    }
  },
  actions: {},
  modules: {}
});
