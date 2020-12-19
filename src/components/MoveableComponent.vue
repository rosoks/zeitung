<template>
  <Moveable
    ref="moveable"
    class="moveable"
    :style="styleData"
    v-bind="moveable"
    @drag="handleDrag"
    @resize="handleResize"
    @scale="handleScale"
    @rotate="handleRotate"
    @warp="handleWarp"
  >
    <!--<span>Vue Moveable</span>-->
    <!--<span>{{ id }}</span>-->
    <menu-bubble />
  </Moveable>
</template>

<script>
/* eslint-disable no-param-reassign,no-unused-expressions,no-console */
import Moveable from "vue-moveable";
import MenuBubble from "./MenuBubble.vue";

export default {
  name: "MoveableComponent",
  components: {
    Moveable,
    MenuBubble
  },

  props: {
    id: Number,
    styleObject: String
  },

  data: () => ({
    moveable: {
      draggable: true,
      throttleDrag: 1,
      resizable: false,
      throttleResize: 1,
      keepRatio: true,
      scalable: true,
      throttleScale: 1,
      rotatable: true,
      throttleRotate: 1,
      pinchable: true,
      origin: false
    },
    states: {
      scalable: "Scalable",
      resizable: "Resizable",
      warpable: "Warpable"
    },
    currentState: "scalable",
    keepRatioState: true,
    draggableState: true,
    styleData: null,
    style: null
  }),

  methods: {
    handleDrag({ target, transform }) {
      target.style.transform = transform;
    },
    handleResize({ target, width, height }) {
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
    },
    handleScale({ target, transform }) {
      target.style.transform = transform;
    },
    handleRotate({ target, transform }) {
      target.style.transform = transform;
    },
    handleWarp({ target, transform }) {
      target.style.transform = transform;
    },
    clearAllStates() {
      Object.keys(this.states).forEach(key => {
        this.moveable[key] = false;
      });
    },
    allStates() {
      console.log("State of draggable is: " + this.moveable.draggable);
      console.log("State of resizable is: " + this.moveable.resizable);
      console.log("State of scalable is: " + this.moveable.scalable);
      console.log("State of rotatable is: " + this.moveable.rotatable);
      console.log("State of pinchable is: " + this.moveable.pinchable);
    }
  },

  watch: {
    currentState(newState) {
      this.clearAllStates();
      this.moveable[newState] = true;
    },
    keepRatioState(newState) {
      this.moveable.keepRatio = newState;
    },
    draggableState(newState) {
      this.moveable.draggable = newState;
    },

    changerState(newValue) {
      if (newValue == "placer") {
        this.moveable.draggable = true;
        this.moveable.resizable = this.$store.getters.getPlacerParams(
          this.id
        ).resizable;
        this.moveable.scalable = this.$store.getters.getPlacerParams(
          this.id
        ).scalable;
        this.moveable.rotatable = true;
        this.moveable.pinchable = true;
        let data = {
          id: this.id,
          changer: "placer"
        };
        this.$store.commit("setChanger", data);
      } else {
        this.moveable.draggable = false;
        this.moveable.resizable = false;
        this.moveable.scalable = false;
        this.moveable.rotatable = false;
        this.moveable.pinchable = false;
        let data = {
          id: this.id,
          changer: "editor"
        };
        this.$store.commit("setChanger", data);
      }
      this.allStates();
    },
    currentPlacable(newValue) {
      if (newValue != this.id) {
        this.moveable.draggable = false;
        this.moveable.resizable = false;
        this.moveable.scalable = false;
        this.moveable.rotatable = false;
        this.moveable.pinchable = false;
        let data = {
          id: this.id,
          changer: "editor"
        };
        this.$store.commit("setChanger", data);
      } else {
        this.moveable.draggable = true;
        this.moveable.resizable = this.$store.getters.getPlacerParams(
          this.id
        ).resizable;
        this.moveable.scalable = this.$store.getters.getPlacerParams(
          this.id
        ).scalable;
        this.moveable.rotatable = true;
        this.moveable.pinchable = true;
        let data = {
          id: this.id,
          changer: "placer"
        };
        this.$store.commit("setChanger", data);
      }
      this.allStates();
    },
    currentScalable(newValue) {
      if (this.currentPlacable == this.id && this.changerState == "placer") {
        this.moveable.scalable = newValue;
      }
    },
    currentResizable(newValue) {
      if (this.currentPlacable == this.id && this.changerState == "placer") {
        this.moveable.resizable = newValue;
      }
    },
    currentKeepRatio(newValue) {
      if (this.currentPlacable == this.id && this.changerState == "placer") {
        this.moveable.keepRatio = newValue;
      }
      this.allStates();
    },
    style(newValue) {
      console.log(newValue);
    }
  },

  computed: {
    currentPlacable: function() {
      return this.$store.getters.getCurrentPlacable;
    },
    equalToPlacable: function() {
      if (this.id != this.$store.getters.getCurrentPlacable) {
        return false;
      } else {
        return true;
      }
    },
    changerState: function() {
      return this.$store.getters.getChanger(this.id);
    },
    componentParams: function() {
      return this.$store.getters.getComponent(this.id);
    },
    currentScalable: function() {
      return this.$store.getters.getPlacerParams(this.id).scalable;
    },
    currentResizable: function() {
      return this.$store.getters.getPlacerParams(this.id).resizable;
    },
    currentKeepRatio: function() {
      return this.$store.getters.getPlacerParams(this.id).keepRatio;
    },
    cords: function() {
      return this.$refs.moveable.getRect();
    }
  },

  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setStyleParams") {
        console.log(`Updating to ${state.components[this.id].styleObject}`);
        this.styleData = state.components[this.id].styleObject;
      }
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:100&display=swap");

.container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.moveable {
  font-family: "Roboto", sans-serif;
  position: relative;
  width: 300px;
  height: 200px;
  text-align: center;
  font-size: 40px;
  margin: 0 auto;
  font-weight: 100;
  letter-spacing: 1px;
}
</style>
<style src="../assets/css/moveable.css"></style>
