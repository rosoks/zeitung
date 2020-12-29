<template>
  <v-app>
    <div class="background"></div>
    <div class="content">
      <div class="logo section">
        <router-link
          to="/editor"
          style="right: 0; transform: rotate(-90deg); margin-right: 3vw; margin-bottom: 10vh"
          class="arrow"
        >
          <div class="arrow-top"></div>
          <div class="arrow-bottom"></div>
        </router-link>
        <div
          id="logo"
          class="txt-type"
          data-wait="2000"
          data-words='["zeitung", "you", "create", "own", "story"]'
        ></div>
        <a href="#vue" class="arrow">
          <div class="arrow-top"></div>
          <div class="arrow-bottom"></div>
        </a>
      </div>
      <div id="vue" class="section">
        <div class="center">
          <router-link
            to="/content"
            style="right: 0; transform: rotate(-90deg); margin-right: 3vw; margin-bottom: 45vh"
            class="arrow"
          >
            <div class="arrow-top"></div>
            <div class="arrow-bottom"></div>
          </router-link>
        </div>
        <div class="center">
          <a href="#drupal" class="arrow">
            <div class="arrow-top"></div>
            <div class="arrow-bottom"></div>
          </a>
        </div>
      </div>
      <div id="drupal" class="section">
        <div class="center">
          <a
            href="#vue"
            style="transform: rotate(180deg); top: 0"
            class="arrow"
          >
            <div class="arrow-top"></div>
            <div class="arrow-bottom"></div>
          </a>
        </div>
        <div class="center">
          <router-link
            to="/content"
            style="right: 0; transform: rotate(-90deg); margin-right: 3vw; margin-bottom: 45vh"
            class="arrow"
          >
            <div class="arrow-top"></div>
            <div class="arrow-bottom"></div>
          </router-link>
        </div>
        <div class="center">
          <a href="#drupal+vue" class="arrow">
            <div class="arrow-top"></div>
            <div class="arrow-bottom"></div>
          </a>
        </div>
      </div>
      <div id="drupal+vue" class="section">
        <div class="center">
          <a
            href="#drupal"
            style="transform: rotate(180deg); top: 0"
            class="arrow"
          >
            <div class="arrow-top"></div>
            <div class="arrow-bottom"></div>
          </a>
        </div>
        <div class="inner-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          doloribus exercitationem ipsum voluptas mollitia. Laboriosam,
          recusandae incidunt? Ex eum quaerat nemo voluptate alias sed at.
          Voluptatibus repellat possimus nemo quae!
        </div>
        <div class="center">
          <router-link
            to="/content"
            style="right: 0; transform: rotate(-90deg); margin-right: 3vw; margin-bottom: 45vh"
            class="arrow"
          >
            <div class="arrow-top"></div>
            <div class="arrow-bottom"></div>
          </router-link>
        </div>
        <div class="center">
          <a href="#pending" class="arrow">
            <div class="arrow-top"></div>
            <div class="arrow-bottom"></div>
          </a>
        </div>
      </div>
      <div id="pending" class="end section">
        ...pending updates...
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Main",

  mounted() {
    //? typewriter
    const TypeWriter = function(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    };

    TypeWriter.prototype.type = function() {
      const current = this.wordIndex % this.words.length;

      const fullTxt = this.words[current];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

      let typeSpeed = 300;

      if (this.isDeleting) {
        typeSpeed /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }

      setTimeout(() => this.type(), typeSpeed);
    };

    init();

    function init() {
      const txtElement = document.querySelector(".txt-type");
      const words = JSON.parse(txtElement.getAttribute("data-words"));
      const wait = txtElement.getAttribute("data-wait");

      new TypeWriter(txtElement, words, wait);
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: ibm;
  src: url(../assets/font/3270_Medium_500.ttf);
}
:root {
  overflow: hidden;
  --root-back: none;
}
* {
  transition: all 1s;
  font-family: ibm;
}
.logo {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  color: white;
}
.end {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.letter {
  margin: 50px;
  height: 100px;
  width: 100px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 3rem;
}

.container h1,
h2 {
  font-weight: 200;
  margin: 0.4rem;
}

.container h1 {
  font-size: 3.5rem;
}

.container h2 {
  font-size: 2rem;
  color: #aaa;
}

/* Cursor */
.txt-type > .txt {
  font-family: ibm;
  font-size: 30px;
  letter-spacing: 50px;
  border-right: 0.2rem solid #777;
  animation: blick 1s;
}
@keyframes blick {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.content {
  scroll-snap-type: mandatory;
  scroll-snap-type: y mandatory;
  scroll-snap-points-y: repeat(100%);
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  z-index: 10;
}
.content .section {
  scroll-snap-align: start;
  position: relative;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
}
.content .section:first-child {
  background: url(https://i.gifer.com/3s0Q.gif);
  /*background: url(https://i.gifer.com/Jde.gif);*/
  background-size: cover;
  background-attachment: fixed;
}
.content .section:nth-child(2) {
  background: url(https://images.hdqwalls.com/wallpapers/vue-js-kk.jpg);
  background-size: cover;
  background-attachment: fixed;
}
.content .section:nth-child(3) {
  background: url(https://cdn.lynda.com/course/122926/122926-637286146547636284-16x9.jpg);
  background-size: cover;
  background-attachment: fixed;
}
.content .section:nth-child(4) {
  background: url(https://sciencentric.de/wp-content/uploads/2019/12/drupal-vue-1.jpg);
  background-size: cover;
  background-attachment: fixed;
}
.content .section:last-child {
  background: url(https://media1.giphy.com/media/3ohhworA3pfJPQVvnq/giphy.gif);
  background-size: cover;
  background-attachment: fixed;
}

//? inner content
.inner-content {
  flex-direction: column;
  margin-top: 25vh;
  font-size: 40px;
  position: relative;
  width: 50vw;
}

//?arrow
.arrow {
  cursor: pointer;
  bottom: 0;
  height: 120px;
  position: absolute;
  transition: transform 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;

  $transition-time: 0.15s;

  &-top,
  &-bottom {
    background-color: #666;
    height: 4px;
    left: -5px;
    position: absolute;
    top: 50%;
    width: 100%;

    &:after {
      background-color: #fff;
      content: "";
      height: 100%;
      position: absolute;
      top: 0;
      transition: all $transition-time;
    }
  }

  &-top {
    transform: translateX(27px) rotate(135deg);
    /*transform-origin: top right;*/

    &:after {
      left: 100%;
      right: 0;
      transition-delay: 0s;
    }
  }

  &-bottom {
    transform: translateX(-27px) rotate(45deg);
    /*transform-origin: top right;*/

    &:after {
      left: 0;
      right: 100%;
      transition-delay: $transition-time;
    }
  }

  &:hover & {
    &-top:after {
      left: 0;
      transition-delay: $transition-time;
    }

    &-bottom:after {
      right: 0;
      transition-delay: 0s;
    }
  }

  &:active {
    transform: scale(0.9);
  }
}

//? cross
.cross {
  cursor: pointer;
  height: 120px;
  position: absolute;
  transition: transform 0.1s;
  width: 80px;

  $transition-time: 0.15s;

  &-top,
  &-bottom {
    background-color: #666;
    height: 4px;
    left: -5px;
    position: absolute;
    top: 50%;
    width: 100%;

    &:after {
      background-color: #fff;
      content: "";
      height: 100%;
      position: absolute;
      top: 0;
      transition: all $transition-time;
    }
  }

  &-top {
    transform: rotate(135deg);
    /*transform-origin: bottom right;*/

    &:after {
      left: 100%;
      right: 0;
      transition-delay: 0s;
    }
  }

  &-bottom {
    transform: rotate(45deg);
    /*transform-origin: top right;*/

    &:after {
      left: 0;
      right: 100%;
      transition-delay: $transition-time;
    }
  }

  &:hover & {
    &-top:after {
      left: 0;
      transition-delay: $transition-time;
    }

    &-bottom:after {
      right: 0;
      transition-delay: 0s;
    }
  }

  &:active {
    transform: translateX(-50%) translateY(-50%) scale(0.9);
  }
}
</style>
