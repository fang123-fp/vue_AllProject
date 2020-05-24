import Vue from 'vue';
import dialog from './co-dialog.vue';


const Dialog = Vue.extend(dialog);

// eslint-disable-next-line import/prefer-default-export
export const createDialog = (option) => new Promise((resolve, reject) => {
  const instance = new Dialog({
    data() {
      return {
        title: option.title,
        message: option.message,
      };
    },
    methods: {
      resolve, reject,
    },
  });
  const { $el } = instance.$mount();
  document.body.appendChild($el);
});
