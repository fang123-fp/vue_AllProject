import Vue from 'vue';

import toast from './toast.vue';

const Toast = Vue.extend(toast);
// eslint-disable-next-line import/prefer-default-export
export const createToast = (option) => {
  const toastInstance = new Toast({
    data() {
      return {
        duration: option.duration,
        message: option.message,
      };
    },
  });
  const { $el } = toastInstance.$mount();
  document.body.appendChild($el);
};
