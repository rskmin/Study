const iframe = document.querySelector('#content');
const menuList = document.querySelector('#app-menu-list');

/**
 * @typedef {Object} DirItem
 * @property {string[]} contentList
 * @property {string} dirname
 */

/** @var 目录列表 @type {DirItem[]} */
const dirList = window.__dirList__;

window.addEventListener('load', () => {
  const src = location.hash.slice(1) || `/${dirList[0].dirname}/${dirList[0].contentList[0]}`;
  iframe.src = src;
})

menuList.addEventListener('click', (e) => {
  let { dir, dirname } = e.target.dataset;
  if (dir && dirname) {
    const src = `/${dir}/${dirname}`
    iframe.src = src;
    location.hash = src;
  }
})