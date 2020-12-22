import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

//? translate mutation & getter

function setTranslate(id, mode, cord) {
  /*
  let payload = {
    id: id,
    mode: mode,
    data: cord
  };
  store.commit("setTranslate", payload);
  */

  store.state.elements[id].transform_object.translate[mode] = cord;
}

function getTranslate(id, mode) {
  return store.state.elements[id].transform_object.translate[mode];
}

//? rotate mutation & getter
function setRotate(id, rotation) {
  /*
  let payload = {
    id: id,
    data: rotation
  };
  store.commit("setRotate", payload);
  */
  store.state.elements[id].transform_object.rotate = rotation;
}
function getRotate(id) {
  return store.state.elements[id].transform_object.rotate;
}

//? controller mutations & getters
function setIsDrag(id, is_drag) {
  /*
  let payload = {
    id: id,
    data: is_drag
  };
  store.commit("setIsDrag", payload);
  */
  store.state.elements[id].is_drag = is_drag;
}
function setIsRotate(id, is_rotate) {
  /*
  let payload = {
    id: id,
    data: is_rotate
  };
  store.commit("setIsRotate", payload);
  */
  store.state.elements[id].is_rotate = is_rotate;
}
function setMode(id, mode) {
  /*
  let payload = {
    id: id,
    data: mode
  };
  store.commit("setMode", payload);
  */
  store.state.elements[id].mode = mode;
}
/*
function getIsDrag(id) {
  return store.getters.getIsDrag(id);
}
function getIsRotate(id) {
  return store.getters.getIsRotate(id);
}
function getMode(id) {
  return store.getters.getMode(id);
}
*/

/*
//? transform controller
var is_drag = null;
var mode = null;

var is_resize = null;

var is_rotate = null;

var transform_object = {
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
};
*/

function transform(el, id, mode) {
  let translate_string;
  let rotate_string;
  let scale_string;

  //? data from vuex
  let translate = getTranslate(id, mode);
  let rotate = getRotate(id);

  if (translate.x == null && translate.y == null) {
    translate_string = "";
  } else {
    translate_string =
      "translate(" + translate.x + "px, " + translate.y + "px)";
  }

  if (rotate == null) {
    rotate_string = "";
  } else {
    rotate_string = "rotate(" + rotate + "deg)";
  }

  //! scale transformations
  scale_string = "";
  /*
  if (transform_object.scale == null) {
    scale_string = "";
  } else {
    scale_string = "scaleX(" + transform_object.scale + ")";
  }
  */

  el.style.transform =
    translate_string + " " + rotate_string + " " + scale_string;
  //! resize transformations
  /*
  if (transform_object.resize.width != null) {
    el.style.width = transform_object.resize.width + "px";
  }
  if (transform_object.resize.height != null) {
    el.style.height = transform_object.resize.height + "px";
  }
  */
}

Vue.directive("drag", {
  bind: function(el, bind) {
    //? service variables
    let body = document.body;
    el.id = bind.value.id;
    el.mode = bind.arg;
    el.is_drag = bind.value.is_drag;
    let translate = getTranslate(el.id, el.mode);

    //* initialize variables in store
    setMode(el.id, el.mode);
    setIsDrag(el.id, el.is_drag);

    //? data variables
    el.dragActive = false;
    el.onElement = false;
    el.currentX = null;
    el.currentY = null;
    el.initialX = translate.x;
    el.initialY = translate.y;
    el.xOffset = 0;
    el.yOffset = 0;
    el.transition;

    //? functions
    function dragStart(e) {
      translate = getTranslate(el.id, el.mode);

      if (el.onElement == true) {
        el.dragActive = true;

        //el.initialX = e.clientX - el.xOffset;
        //el.initialY = e.clientX - el.yOffset;

        if (translate.x == null && translate.y == null) {
          el.initialX = e.clientX - el.xOffset;
          el.initialY = e.clientY - el.yOffset;
        } else {
          el.initialX = e.clientX - translate.x;
          el.initialY = e.clientY - translate.y;
        }
      }
    }
    function dragOn(e, el) {
      if (el.dragActive == true) {
        e.preventDefault();

        el.currentX = e.clientX - el.initialX;
        el.currentY = e.clientY - el.initialY;

        el.xOffset = el.currentX;
        el.yOffset = el.currentY;

        transformate(el.currentX, el.currentY, el);
      }
    }
    function dragEnd() {
      if (el.onElement == true) {
        el.dragActive = false;

        el.initialX = el.currentX;
        el.initialY = el.currentY;
      }
    }
    function transformate(currentX, currentY, el) {
      //el.style.transform =
      //  "translate3d(" + currentX + "px, " + currentY + "px, 0)";
      //translate.x = currentX;
      //translate.y = currentY;
      let cord = {
        x: currentX,
        y: currentY
      };
      setTranslate(el.id, el.mode, cord);
      transform(el, el.id, el.mode);
    }

    //? function variables
    el.mouseover = function() {
      el.onElement = true;
    };
    el.mouseout = function() {
      el.onElement = false;
    };
    el.mousedown = function(e) {
      el.transition = el.style.transition;
      el.style.transition = null;
      dragStart(e);
    };
    el.mousemove = function(e) {
      dragOn(e, el);
    };
    el.mouseup = function(e) {
      el.style.transition = el.transition;
      el.transition = null;
      dragEnd(e);
    };

    //* code

    if (el.is_drag == true) {
      el.addEventListener("mouseover", el.mouseover);
      el.addEventListener("mouseout", el.mouseout);

      body.addEventListener("mousedown", el.mousedown);
      body.addEventListener("mousemove", el.mousemove);
      body.addEventListener("mouseup", el.mouseup);
    }
  },

  update: function(el, bind) {
    //? service variables
    let body = document.body;
    el.id = bind.value.id;
    el.mode = bind.arg;
    el.is_drag = bind.value.is_drag;

    //* initialize variables in store
    setMode(el.id, el.mode);
    setIsDrag(el.id, el.is_drag);

    transform(el, el.id, el.mode);

    //* code

    if (el.is_drag == true) {
      el.addEventListener("mouseover", el.mouseover);
      el.addEventListener("mouseout", el.mouseout);

      body.addEventListener("mousedown", el.mousedown);
      body.addEventListener("mousemove", el.mousemove);
      body.addEventListener("mouseup", el.mouseup);
    } else {
      el.removeEventListener("mouseover", el.mouseover);
      el.removeEventListener("mouseout", el.mouseout);

      body.removeEventListener("mousedown", el.mousedown);
      body.removeEventListener("mousemove", el.mousemove);
      body.removeEventListener("mouseup", el.mouseup);
    }
  },
  undind: function(el) {
    //* code

    el.removeEventListener("mouseover", el.mouseover);
    el.removeEventListener("mouseout", el.mouseout);

    document.body.removeEventListener("mousedown", el.mousedown);
    document.body.removeEventListener("mousemove", el.mousemove);
    document.body.removeEventListener("mouseup", el.mouseup);
  }
});
/*
Vue.directive("resize-dot", {
  inserted: function(el, bind) {
    //? service variables
    is_resize = bind.value;
    let dot = bind.arg;
    let body = document.body;
    let grid = document.querySelector(".transform-grid");

    //? data variables
    let resizeActive = true;
    let resizeDown = false;
    let onDot = null;
    let minimum_size = 150;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    //? functions
    function resizeStart(e, grid) {
      if (resizeActive == true) {
        resizeDown = true;
        original_width = parseFloat(
          getComputedStyle(grid, null)
            .getPropertyValue("width")
            .replace("px", "")
        );
        original_height = parseFloat(
          getComputedStyle(grid, null)
            .getPropertyValue("height")
            .replace("px", "")
        );
        original_x = grid.getBoundingClientRect().left;
        original_y = grid.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
      }
    }
    function resize(e, grid) {
      if (resizeDown == true) {
        e.preventDefault();
        let width;
        let height;

        switch (onDot) {
          case "br":
            width = original_width + (e.clientX - original_mouse_x);
            height = original_height + (e.clientY - original_mouse_y);

            if (width > minimum_size) {
              grid.style.width = width + "px";
            }
            if (height > minimum_size) {
              grid.style.height = height + "px";
            }

            break;

          case "bl":
            width = original_width - (e.clientX - original_mouse_x);
            height = original_height + (e.clientY - original_mouse_y);

            if (width > minimum_size) {
              grid.style.width = width + "px";
              grid.style.left = original_x + (e.clientX - original_mouse_x);
            }
            if (height > minimum_size) {
              grid.style.height = height + "px";
            }

            break;

          case "tr":
            width = original_width + (e.clientX - original_mouse_x);
            height = original_height - (e.clientY - original_mouse_y);

            if (width > minimum_size) {
              grid.style.width = width + "px";
            }
            if (height > minimum_size) {
              grid.style.height = height + "px";
              grid.style.top =
                original_y + (e.clientY - original_mouse_y) + "px";
            }

            break;

          case "tl":
            width = original_width - (e.clientX - original_mouse_x);
            height = original_height - (e.clientY - original_mouse_y);

            if (width > minimum_size) {
              grid.style.width = width + "px";
              grid.style.left =
                original_x + (e.clientX - original_mouse_x) + "px";
            }
            if (height > minimum_size) {
              grid.style.height = height + "px";
              grid.style.top =
                original_y + (e.clientY - original_mouse_y) + "px";
            }

            break;

          default:
            console.log("There isn't such dot!");
            console.log("Value is null!");
        }
      }
    }
    function resizeEnd() {
      resizeDown = false;
      onDot = null;
    }

    //? function variables
    el.mouseover = function() {
      resizeActive = true;
      onDot = dot;
    };
    el.mouseout = function() {
      resizeActive = false;
    };
    el.mousedown = function(e) {
      resizeStart(e, grid);
    };
    el.mouseup = function() {
      resizeEnd();
    };
    el.mousemove = function(e) {
      resize(e, grid);
    };

    //* code

    if (is_resize == true) {
      el.addEventListener("mouseover", el.mouseover);
      el.addEventListener("mouseout", el.mouseout);

      body.addEventListener("mousedown", el.mousedown);
      body.addEventListener("mouseup", el.mouseup);
      body.addEventListener("mousemove", el.mousemove);
    }
  },
  componentUpdated: function(el, bind) {
    //? service variables
    is_resize = bind.value;

    //* code

    if (is_resize == true) {
      el.addEventListener("mouseover", el.mouseover);
      el.addEventListener("mouseout", el.mouseout);

      document.body.addEventListener("mousedown", el.mousedown);
      document.body.addEventListener("mouseup", el.mouseup);
      document.body.addEventListener("mousemove", el.mousemove);
    } else {
      el.removeEventListener("mouseover", el.mouseover);
      el.removeEventListener("mouseout", el.mouseout);

      document.body.removeEventListener("mousedown", el.mousedown);
      document.body.removeEventListener("mouseup", el.mouseup);
      document.body.removeEventListener("mousemove", el.mousemove);
    }
  }
});
*/
Vue.directive("rotate", {
  bind: function(el, bind) {
    //? service variables
    let id = bind.value.id;
    let is_rotate = bind.value;

    //* initialize variables in store
    setIsRotate(id, is_rotate);

    var R2D, active, angle, init, rotation, startAngle;

    active = false;

    angle = 0;

    rotation = 0;

    startAngle = 0;

    el.center = {
      x: el.getBoundingClientRect().left,
      y: el.getBoundingClientRect().top
    };

    document.ontouchmove = function(e) {
      return e.preventDefault();
    };

    init = function() {
      el.addEventListener("mousedown", el.start, false);
      el.addEventListener("mousemove", el.rotate, false);
      document.body.addEventListener("mouseup", el.stop, false);
    };

    R2D = 180 / Math.PI;

    el.start = function(e) {
      var height, left, top, width, x, y, _ref;
      e.preventDefault();
      (_ref = el.getBoundingClientRect()),
        (top = _ref.top),
        (left = _ref.left),
        (height = _ref.height),
        (width = _ref.width);
      el.center.x = left + width / 2;
      el.center.y = top + height / 2;
      x = e.clientX - el.center.x;
      y = e.clientY - el.center.y;
      startAngle = R2D * Math.atan2(y, x);
      return (active = true);
    };

    el.rotate = function(e) {
      var d, x, y;
      e.preventDefault();
      x = e.clientX - el.center.x;
      y = e.clientY - el.center.y;
      d = R2D * Math.atan2(y, x);
      rotation = d - startAngle;
      if (active) {
        //return (el.style.transform = "rotate(" + (angle + rotation) + "deg)");
        let endRotation = angle + rotation;
        setRotate(id, endRotation);
        transform(el, id, setMode(id));
      }
    };

    el.stop = function() {
      angle += rotation;
      return (active = false);
    };

    if (is_rotate == true) {
      init();
    }
  },
  componentUpdated: function(el, bind) {
    //? service variables
    let id = bind.value.id;
    let is_rotate = bind.value;

    //* initialize variables in store
    setIsRotate(id, is_rotate);

    el.center = {
      x: el.getBoundingClientRect().left,
      y: el.getBoundingClientRect().top
    };

    if (is_rotate == true) {
      el.addEventListener("mousedown", el.start, false);
      el.addEventListener("mousemove", el.rotate, false);
      document.body.addEventListener("mouseup", el.stop, false);
    } else {
      el.removeEventListener("mousedown", el.start, false);
      el.removeEventListener("mousemove", el.rotate, false);
      document.body.removeEventListener("mouseup", el.stop, false);
    }
  }
});
/*
Vue.directive("scale", {
  update: function(el, bind) {
    let scale_value = bind.value;
    console.log(scale_value);
    transform_object.scale = scale_value;
    transform(el);
  }
});
Vue.directive("resize", {
  update: function(el, bind) {
    let resize_value = bind.value;

    transform_object.resize.width = resize_value.width;
    transform_object.resize.height = resize_value.height;
    transform(el);
  }
});
*/

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
