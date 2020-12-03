<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <menu-bubble />
    </div>
  </div>
</template>

<script>
import MenuBubble from "@/components/MenuBubble.vue";

export default {
  name: "About",
  components: {
    MenuBubble
  }
};
</script>
