<template>
  <Moveable
    class="moveable"
    v-bind="moveable"
    @drag="handleDrag"
    @resize="handleResize"
    @scale="handleScale"
    @rotate="handleRotate"
    @warp="handleWarp"
  >
    <!--<span>Vue Moveable</span>-->
    <span>{{ id }}</span>
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
    styleObject: Object
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
    draggableState: true
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
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto:100&display=swap");
html,
body {
  font-family: "Open Sans", sans-serif;
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  color: #333;
  letter-spacing: 1px;
  background: #f5f5f5;
  font-weight: 300;
}

a {
  text-decoration: none;
  color: #333;
}

.page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.page:nth-child(2n) {
  background: #f0f0f0;
}
.page.main {
  z-index: 1;
  min-height: 700px;
}

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

.moveable span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.description {
  text-align: center;
}

.buttons.able {
  margin-top: 16px;
}
.buttons.able a {
  min-width: auto;
  padding: 8px 20px;
}
.buttons {
  text-align: center;
  margin: 0;
  padding: 10px;
}

.buttons a {
  position: relative;
  text-decoration: none;
  color: #333;
  border: 1px solid #333;
  padding: 12px 30px;
  min-width: 140px;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  margin: 5px;
  transition: all ease 0.5s;
}

.buttons a:hover,
.buttons a.selected {
  background: #333;
  color: #fff;
}
</style>
