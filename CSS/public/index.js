const iframe = document.querySelector('#content');
const menuList = document.querySelector('#app-menu-list');
menuList.addEventListener('click', (e) => {
  let { dir, dirname } = e.target.dataset;
  if (dir && dirname) {
    iframe.src = `/${dir}/${dirname}`;
  }
})