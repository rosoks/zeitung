import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //! Old version
    /*
    components: [],
    currentPlacable: null
    */
    //* New code
    //? service variables
    is_drag: null,
    mode: null,
    is_resize: null,
    is_rotate: null,
    transform_object: {
      translate: {
        phone: {
          x: null,
          y: null
        },
        laptop: {
          x: null,
          y: null
        },
        desktop: {
          x: null,
          y: null
        }
      },
      rotate: null,
      scale: null,
      resize: {
        width: null,
        height: null
      }
    },

    //? general variables
    elements: [],
    currentELement: null
  },
  getters: {
    //! Old version
    /*
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
    },
    getStyleObject: state => id => {
      return state.components[id].styleObject;
    }
    */
    //* New code

    //? elements getters
    getElements: state => {
      return state.elements;
    },
    getElement: state => id => {
      return state.elements[id];
    },
    getNumberElements: state => {
      return state.elements.length;
    },
    getCurrentElement: state => {
      return state.currentELement;
    },

    //? element variables getters
    getIsDrag: state => id => {
      return state.elements[id].is_drag;
    },
    getIsRotate: state => id => {
      return state.elements[id].is_rotate;
    },
    getIsResize: state => id => {
      return state.elements[id].is_resize;
    },
    getMode: state => id => {
      return state.elements[id].mode;
    },

    //? transform_object getters
    getTranslate: (state, id, mode) => {
      return state.elements[id].transform_object.translate[mode];
    },
    getRotate: state => id => {
      return state.elements[id].transform_object.rotate;
    },
    getScale: state => id => {
      return state.elements[id].transform_object.scale;
    },
    getResize: state => id => {
      return state.elements[id].transform_object.resize;
    }
  },
  mutations: {
    //! Old version
    /*
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
    },
    setPlacerParams: (state, payload) => {
      state.components[payload.id].placerParams = payload.placerParams;
    },
    setStyleParams: (state, payload) => {
      state.components[payload.id].styleObject = payload.styleObject;
      console.log('Style vuex: ' + state.components[payload.id].styleObject);
    },
    deleteComponent: (state, payload) => {
      state.components.splice(payload, 1);
    }
    */
    //* New code

    //? elements mutations
    addElement: (state, payload) => {
      state.elements.push(payload);
    },
    setElement: (state, payload) => {
      state.elements[payload.id] = payload.data;
    },
    setCurrentELement: (state, payload) => {
      state.currentELement = payload;
    },

    //? element variables mutations
    setIsDrag: (state, payload) => {
      state.elements[payload.id].is_drag = payload.data;
    },
    setIsRotate: (state, payload) => {
      state.elements[payload.id].is_rotate = payload.data;
    },
    setIsResize: (state, payload) => {
      state.elements[payload.id].is_resize = payload.data;
    },
    setMode: (state, payload) => {
      state.elements[payload.id].mode = payload.data;
    },

    //? transform_object mutations
    setTranslate: (state, payload) => {
      state.elements[payload.id].transform_object.translate[payload.mode] =
        payload.data;
    },
    setRotate: (state, payload) => {
      state.elements[payload.id].transform_object.rotate = payload.data;
    },
    setScale: (state, payload) => {
      state.elements[payload.id].transform_object.scale = payload.data;
    },
    setResize: (state, payload) => {
      state.elements[payload.id].transform_object.resize = payload.data;
    }
  },
  actions: {},
  modules: {}
});
