<template>
  <v-app>
    <div class="center">{{ screen_type }}</div>

    <div class="curtain-left" :style="curtain"></div>
    <div class="center">
      <div :style="screen"></div>
    </div>
    <div class="curtain-right" :style="curtain"></div>

    <div v-for="element in elements" :key="element">
      <div
        class="transform"
        style="transition: all 1s;"
        v-drag:[mode]="{ is_drag: draggable, id: element.id }"
        v-rotate="{ is_rotate: rotatable, id: element.id }"
      >
        <menu-bubble></menu-bubble>
      </div>
    </div>

    <div class="leftbar">
      <v-btn @click="addElement()" class="btn">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn class="btn">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn class="btn" v-show="rotatable" @click="setTransform('drag')">
        <v-icon>mdi-drag</v-icon>
      </v-btn>
      <v-btn class="btn" v-show="draggable" @click="setTransform('rotate')">
        <v-icon>mdi-crop-rotate</v-icon>
      </v-btn>
    </div>

    <div class="bottombar">
      <v-btn @click="setScreentype('phone')">
        <v-icon>mdi-cellphone</v-icon>
      </v-btn>
      <v-btn @click="setScreentype('laptop')">
        <v-icon>mdi-laptop</v-icon>
      </v-btn>
      <v-btn @click="setScreentype('desktop')">
        <v-icon>mdi-monitor</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import MenuBubble from "@/components/MenuBubble.vue";

export default {
  name: "Home",

  components: {
    MenuBubble
  },

  data: () => ({
    draggable: true,
    rotatable: false,
    screen:
      "width: 1920px; height: 100vh; position: fixed; background: none; top: 0; border-left: 1px solid #66ffff; border-right: 1px solid #66ffff; transition: all 1s;",
    curtain: () => {
      if (window.innerWidth == 1920) {
        return `width: 0px; z-index: 11;`;
      } else {
        return `width: ${(window.innerWidth - 1920) / 2 - 9}px; z-index: 11;`;
      }
    },
    mode: "desktop"
  }),

  methods: {
    setTransform: function(transform) {
      switch (transform) {
        case "drag":
          this.draggable = true;
          this.rotatable = false;
          break;

        case "rotate":
          this.draggable = false;
          this.rotatable = true;
          break;

        default:
          break;
      }
    },

    setScreentype: function(screen) {
      switch (screen) {
        case "phone":
          console.log("changed");
          this.mode = "phone";
          this.screen =
            "width: 600px; height: 100vh; position: fixed; background: none; top: 0; border-left: 1px solid #66ffff; border-right: 1px solid #66ffff; transition: all 1s;";
          this.curtain = `width: ${(window.innerWidth - 600) / 2 -
            9}px; z-index: 11;`;
          break;

        case "laptop":
          console.log("changed");
          this.mode = "laptop";
          this.screen =
            "width: 1280px; height: 100vh; position: fixed; background: none; top: 0; border-left: 1px solid #66ffff; border-right: 1px solid #66ffff; transition: all 1s;";
          this.curtain = `width: ${(window.innerWidth - 1280) / 2 -
            9}px; z-index: 11;`;
          break;

        case "desktop":
          console.log("changed");
          this.mode = "desktop";
          this.screen =
            "width: 1920px; height: 100vh; position: fixed; background: none; top: 0; border-left: 1px solid #66ffff; border-right: 1px solid #66ffff; transition: all 1s;";
          if (window.innerWidth == 1920) {
            this.curtain = `width: 0px; z-index: 11;`;
          } else {
            this.curtain = `width: ${(window.innerWidth - 1920) / 2 -
              9}px; z-index: 11;`;
          }
          break;
      }
    },

    addElement: function() {
      let payload = {
        //? id
        id: this.numberOfElements,

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

        //? drag variables
        dragActive: false,
        onElement: false,
        currentX: null,
        currentY: null,
        initialX: null,
        initialY: null,
        xOffset: 0,
        yOffset: 0,
        transition: null,

        //? rotate variables
        active: false,
        angle: 0,
        rotation: 0,
        startAngle: 0
      };
      this.$store.commit("addElement", payload);
    }
  },

  computed: {
    screen_type: function() {
      let screen;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          screen = "phone";
          break;
        case "sm":
          screen = "tablet";
          break;
        case "md":
          screen = "laptop";
          break;
        case "lg":
          screen = "desktop";
          break;
        case "xl":
          screen = "4k";
          break;
      }
      return screen;
    },

    elements: function() {
      return this.$store.getters.getElements;
    },
    numberOfElements: function() {
      return this.$store.getters.getNumberElements;
    },
    currentElement: function() {
      return this.$store.getters.getCurrentElement;
    }
  }
};
</script>

<style scoped>
.transform {
  position: absolute;
  width: 100px;
  height: 100px;
  background: #777;
  z-index: 10;
}

.center {
  display: flex;
  justify-content: center;
  justify-self: center;
}
.water {
  position: relative;
  width: 100px;
  height: 1000px;
}

.x-small {
  width: 600px;
  height: 100vh;
  position: absolute;
  background: white;
  z-index: 4;
}
.small {
  width: 960px;
  height: 100vh;
  position: absolute;
  background: whitesmoke;
  z-index: 3;
}
.medium {
  width: 1264px;
  height: 100vh;
  position: absolute;
  background: grey;
  z-index: 2;
}
.large {
  width: 1904px;
  height: 100vh;
  position: absolute;
  background: rebeccapurple;
  z-index: 1;
}

/*
.bottom {
  position: fixed;
  bottom: 0;
}
*/
.leftbar {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 12;
}
.btn {
  width: 5px;
  height: 50px;
}
.bottombar {
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.curtain-left {
  position: fixed;
  left: 0;
  height: 100vh;
  width: 0;
  background: rgba(33, 33, 33, 0.5);
  transition: all 1s;
}
.curtain-right {
  position: fixed;
  right: 0;
  height: 100vh;
  width: 0;
  background: rgba(33, 33, 33, 0.5);
  transition: all 1s;
}
</style>
