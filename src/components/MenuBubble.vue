<template>
  <div class="editor">
    <editor-menu-bubble
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu }"
    >
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon color="#eeeeee">mdi-format-bold</v-icon>
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon color="#eeeeee">mdi-format-italic</v-icon>
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <v-icon color="#eeeeee">mdi-code-tags</v-icon>
        </button>
      </div>
    </editor-menu-bubble>

    <div>
      <editor-content class="editor__content" :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from "tiptap";
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBubble
  },
  props: {
    id: null,
    mode: String
  },
  data() {
    return {
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image()
        ],
        content: `...`,
        onUpdate: ({ getHTML }) => {
          this.html = getHTML();
        }
      }),
      html: ""
    };
  },
  watch: {
    html(newValue) {
      this.$store.state.elements[this.id].transform_object[
        this.mode
      ].content = newValue;
      console.log(
        this.$store.state.elements[this.id].transform_object[this.mode].content
      );
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss">
$color-black: #333333;
$color-white: #eeeeee;
$color-grey: #555555;

@import "@/assets/scss/menububble.scss";
@import "@/assets/scss/editor.scss";
</style>
