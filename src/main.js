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

  store.state.elements[id].transform_object[mode].translate = cord;
}

function getTranslate(id, mode) {
  return store.state.elements[id].transform_object[mode].translate;
}

//? rotate mutation & getter
function setRotate(id, mode, rotation) {
  /*
  let payload = {
    id: id,
    data: rotation
  };
  store.commit("setRotate", payload);
  */
  store.state.elements[id].transform_object[mode].rotate = rotation;
}
function getRotate(id, mode) {
  return store.state.elements[id].transform_object[mode].rotate;
}

//? style mutation & getter
function setStyle(id, mode, style) {
  store.state.elements[id].transform_object[mode].style = style;
}
function getStyle(id, mode) {
  return store.state.elements[id].transform_object[mode].style;
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

function getIsDrag(id) {
  return store.state.elements[id].is_drag;
}
function getIsRotate(id) {
  return store.state.elements[id].is_rotate;
}
//function getMode(id) {
//  return store.state.elements[id].mode;
//}

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
  let translate_string = store.state.elements[id].translate_string;
  let rotate_string = store.state.elements[id].rotate_string;
  let scale_string = store.state.elements[id].scale_string;
  let style_string = store.state.elements[id].style_string;

  //? data from vuex
  let translate = getTranslate(id, mode);
  let rotate = getRotate(id, mode);
  //let is_drag = getIsDrag(id);
  //let is_rotate = getIsRotate(id);
  let style = getStyle(id, mode);

  //! drag transformations
  //if (is_drag == true) {
  if (translate.x == null && translate.y == null) {
    translate_string = "";
  } else {
    translate_string =
      "translate(" + translate.x + "px, " + translate.y + "px)";
    store.state.elements[id].translate_string = translate_string;
  }
  //}

  //! rotate transformations
  //if (is_rotate == true) {
  if (rotate == null) {
    rotate_string = "";
  } else {
    rotate_string = "rotate(" + rotate + "deg)";
    store.state.elements[id].rotate_string = rotate_string;
  }
  //}

  //! scale transformations
  scale_string = " ";
  /*
  if (transform_object.scale == null) {
    scale_string = "";
  } else {
    scale_string = "scaleX(" + transform_object.scale + ")";
  }
  */

  //! resize transformations
  /*
  if (transform_object.resize.width != null) {
    el.style.width = transform_object.resize.width + "px";
  }
  if (transform_object.resize.height != null) {
    el.style.height = transform_object.resize.height + "px";
  }
  */

  //! style transformations
  if (style == null) {
    style_string = "";
  } else {
    style_string = style;
  }

  //? transform apply
  el.style.transform =
    translate_string + " " + rotate_string + " " + scale_string;

  //? style apply
  el.style.cssText += style_string;
}

Vue.directive("drag", {
  bind: function(el, bind) {
    //! transition set
    el.style.transition = "all 1s";

    //? service variables
    let body = document.body;
    el.id = bind.value.id;
    el.mode = bind.arg;
    el.is_drag = bind.value.is_drag;
    console.log(el.is_drag);
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
      setIsDrag(el.id, el.is_drag);
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
      el.style.transition = "";
      dragStart(e);
    };
    el.mousemove = function(e) {
      dragOn(e, el);
    };
    el.mouseup = function(e) {
      el.style.transition = el.transition;
      dragEnd(e);
    };

    //* code

    if (getIsDrag(el.id) == true) {
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
    el.id = bind.value.id;
    el.is_rotate = bind.value.is_rotate;
    el.mode = bind.arg;

    //* initialize variables in store
    setIsRotate(el.id, el.is_rotate);
    getIsRotate(el.id);

    //var R2D, active, angle, init, rotation, startAngle;

    el.active = false;

    el.angle = 0;

    el.rotation = 0;

    el.startAngle = 0;

    el.center = {
      x: el.getBoundingClientRect().left,
      y: el.getBoundingClientRect().top
    };

    document.ontouchmove = function(e) {
      return e.preventDefault();
    };

    el.init = function() {
      el.addEventListener("mousedown", el.start, false);
      el.addEventListener("mousemove", el.rotate, false);
      document.body.addEventListener("mouseup", el.stop, false);
    };

    el.R2D = 180 / Math.PI;

    el.start = function(e) {
      console.log(el.style.transition);
      el.transition = el.style.transition;
      el.style.transition = "";
      //var height, left, top, width, x, y, _ref;
      e.preventDefault();
      (el._ref = el.getBoundingClientRect()),
        (el.top = el._ref.top),
        (el.left = el._ref.left),
        (el.height = el._ref.height),
        (el.width = el._ref.width);
      el.center.x = el.left + el.width / 2;
      el.center.y = el.top + el.height / 2;
      el.x = e.clientX - el.center.x;
      el.y = e.clientY - el.center.y;
      el.startAngle = el.R2D * Math.atan2(el.y, el.x);
      return (el.active = true);
    };

    el.rotate = function(e) {
      //var d, x, y;
      e.preventDefault();
      el.x = e.clientX - el.center.x;
      el.y = e.clientY - el.center.y;
      el.d = el.R2D * Math.atan2(el.y, el.x);
      el.rotation = el.d - el.startAngle;
      if (el.active) {
        //return (el.style.transform = "rotate(" + (angle + rotation) + "deg)");
        el.endRotation = el.angle + el.rotation;
        setRotate(el.id, el.mode, el.endRotation);
        transform(el, el.id, el.mode);
      }
    };

    el.stop = function() {
      el.style.transition = el.transition;
      console.log(el.style.transition);
      el.angle += el.rotation;
      return (el.active = false);
    };

    if (el.is_rotate == true) {
      el.init();
    }
  },
  update: function(el, bind) {
    //? service variables
    el.id = bind.value.id;
    el.mode = bind.arg;
    el.is_rotate = bind.value.is_rotate;
    //el.mode = getMode(el.id);

    //* initialize variables in store
    setIsRotate(el.id, el.is_rotate);
    setMode(el.id, el.mode);

    transform(el, el.id, el.mode);

    el.center = {
      x: el.getBoundingClientRect().left,
      y: el.getBoundingClientRect().top
    };

    if (el.is_rotate == true) {
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
Vue.directive("current", {
  bind: function(el, bind) {
    el.over = false;
    el.id = bind.value.id;
    el.mousedown = function() {
      //console.log(el.over);
      if (el.over == true) {
        store.state.currentElement = el.id;
        //el.style.background = "red";
        //el.style.transform += "scale(1.5)"
      } else {
        if (store.state.currentElement != el.id) {
          //el.style.background = "#333";
          //el.style.transform += "scale(1)";
        }
      }
    };
    el.mouseover = function() {
      el.over = true;
    };
    el.mouseout = function() {
      el.over = false;
      //el.style.background = "#333";
    };
    el.addEventListener("mousedown", el.mousedown, false);
    el.addEventListener("mouseover", el.mouseover, false);
    el.addEventListener("mouseout", el.mouseout, false);
  },
  unbind: function(el) {
    el.removeEventListener("mousedown", el.mousedown, false);
  }
});
Vue.directive("style", {
  update: function(el, bind) {
    el.id = bind.value.id;
    el.mode = bind.arg;
    el.styling = bind.value.style;
    setStyle(el.id, el.mode, el.styling);

    transform(el, el.id, el.mode);
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
