<template>
  <div class="about">
    <div class="add-buttons">
      <v-btn @click="deleteComponent(currentId)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn @click="setComponent()" class="add-component">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </div>

    <v-row class="mt-6">
      <v-col cols="12" sm="6" md="3">
        This is an about page
      </v-col>
      <v-col cols="12" sm="6" md="3">
        {{ numberOfComponents }}
      </v-col>
    </v-row>

    <v-row class="ml-3">
      {{ screen_type }}
    </v-row>
    <v-row>
      <v-btn @click="getComponents()">
        <v-icon>mdi-text</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-4">
      <v-btn @click="setScaleOrResize()">Scale/Resize</v-btn>
    </v-row>
    <v-row class="mt-4">
      <v-btn @click="setChanger()">Editor/Placer</v-btn>
    </v-row>
    <v-row class="mt-4">
      <v-btn @click="setScalableOrShapeless()">Scalable/Shapeless</v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-container fluid>
          <v-text-field
            label="Background"
            solo-inverted
            no-resize
            rows="1"
            v-model="styleData_background"
          ></v-text-field>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-container fluid>
          <v-text-field
            label="Border"
            solo-inverted
            no-resize
            rows="1"
            v-model="styleData_border"
          ></v-text-field>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-container fluid>
          <v-text-field
            label="Z-index"
            solo-inverted
            no-resize
            rows="1"
            v-model="styleData_zindex"
          ></v-text-field>
        </v-container>
      </v-col>
    </v-row>

    <div class="content">
      <div
        class="placable"
        v-for="element in components"
        :key="element"
        :array_key="components"
        @click="changeChangable(componentId[components.indexOf(element)])"
      >
        <component
          :class="className"
          :id="componentId[components.indexOf(element)]"
          :styleObject="styleObject"
          :is="MoveableComponent"
          v-css
        ></component>
      </div>
    </div>

    <div class="justify-right">
      <div class="right-sidebar"></div>
    </div>
  </div>
</template>

<script>
import MoveableComponent from "../components/MoveableComponent.vue";

export default {
  name: "About",

  data: () => ({
    MoveableComponent: MoveableComponent,
    isPlacable: null,
    className: null,
    styleObject: "background: #132639; border: solid #66ffff;",
    styleData: null,
    styleData_background: null,
    styleData_border: null,
    styleData_zindex: null,
    invoke: false,

    data_changer: "editor"
  }),

  computed: {
    checkPlacable: function() {
      return this.$store.getters.getPlacable;
    },
    components: function() {
      return this.$store.getters.getComponents;
    },
    numberOfComponents: function() {
      return this.$store.getters.getComponents.length;
    },
    currentId: function() {
      return this.$store.getters.getCurrentPlacable;
    },
    changer: function() {
      return this.$store.getters.getChanger(this.currentId);
    },
    placerParams: function() {
      return this.$store.getters.getPlacerParams(this.currentId);
    },
    componentId: function() {
      let component_array = this.$store.getters.getComponents.keys();
      let array = [];
      for (let key of component_array) {
        array.push(key);
      }
      return array;
    },
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
    }
  },

  methods: {
    setPlacable: function() {
      this.$store.commit("setPlacable", true);
    },
    setComponent: function() {
      let index = this.numberOfComponents;
      let dataToPush = {
        changer: "placer",
        placerParams: {
          scalable: true,
          resizable: false,
          keepRatio: true
        },
        editorParams: {},
        style: null,
        content: null
      };
      this.className = index;
      this.styleObject = dataToPush.style;
      this.$store.commit("setComponent", dataToPush);
      this.$store.commit("setCurrentPlacable", index);
    },
    getComponents: function() {
      let components = this.$store.getters.getComponents;
      console.log(components);
    },
    changeChangable: function(id) {
      this.$store.commit("setCurrentPlacable", id);
    },
    setScaleOrResize: function() {
      let params = this.placerParams;
      if (params.scalable == true) {
        params.scalable = false;
        params.resizable = true;
      } else {
        params.scalable = true;
        params.resizable = false;
      }
      let data = {
        id: this.currentId,
        placerParams: params
      };
      this.$store.commit("setPlacerParams", data);
    },
    setScalableOrShapeless: function() {
      let params = this.placerParams;
      params.keepRatio = !params.keepRatio;
      let data = {
        id: this.currentId,
        placerParams: params
      };
      this.$store.commit("setPlacerParams", data);
    },
    setChanger: function() {
      this.data_changer = this.changer;
      if (this.data_changer == "placer") {
        this.data_changer = "editor";
      } else {
        this.data_changer = "placer";
      }
      let data = {
        id: this.currentId,
        changer: this.data_changer
      };
      this.$store.commit("setChanger", data);
    },
    deleteComponent: function() {
      //let data = [
      //  "i", 'can', 'do', 'it', 'several', 'times'
      //];
      //console.log(data);
      //data.splice(2, 1);
      //console.log(data);
      //let nul = data.find(element => element == null);
      //let nul_number = data.indexOf(nul);
      //data[nul_number] = 'suck';
      //console.log(data);
      //let empty_data = [];
      //console.log(empty_data.length);
      //this.$emit('remove');

      this.$store.commit("deleteComponent", this.currentId);
    },
    logParameters: function(el) {
      console.log(el);
    }
  },

  watch: {
    invoke() {
      this.styleData =
        "background: " +
        this.styleData_background +
        "; " +
        "border: " +
        this.styleData_border +
        "; " +
        "z-index: " +
        this.styleData_zindex +
        "; ";
      let data = {
        id: this.currentId,
        styleObject: this.styleData
      };
      this.$store.commit("setStyleParams", data);
      console.log(this.$store.getters.getStyleObject(this.currentId));
      this.invoke = false;
    },
    styleData_background() {
      this.invoke = true;
    },
    styleData_border() {
      this.invoke = true;
    },
    styleData_zindex() {
      this.invoke = true;
    }
  },

  directives: {
    css: {
      bind: function(el, bind, vnode) {
        let thus = vnode.context;
        thus.logParameters(el.style);
      }
    }
  }
};
</script>

<style>
@import "../assets/css/moveable.css";

html {
  overflow: scroll;
  background: #132639;
}

body::-webkit-scrollbar {
  overflow-x: hidden;
  width: 0.25rem;
}

body::-webkit-scrollbar-track {
  background: #1e1e24;
}

body::-webkit-scrollbar-thumb {
  background: #6649b8;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}

.about {
  background-color: #132639;
}

.justify-right {
  display: flex;
  justify-content: right;
  align-items: end;
}

.right-sidebar {
  bottom: 0px;
  position: fixed;
  border: solid #333;
  background: #333;
  transition: all 1s ease;
  /*transition: border 1000ms ease;*/
  width: 33%;
  height: 1%;
  z-index: 10000;
}

.right-sidebar:hover {
  height: 100%;
  border: solid #fff;
}
.add-buttons {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

html {
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-color: #6649b8 #1e1e24;
  scrollbar-width: thin;
}

.placable {
  position: absolute;
  width: fit-content;
  height: fit-content;
}
</style>
