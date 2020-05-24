/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (typeof content !== 'string') {
    // eslint-disable-next-line no-param-reassign
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return;
  // eslint-disable-next-line consistent-return
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
