(function () {
  let ctx = {
    container: null,
  };
  window.appA = {
    bootstrap: function () {
      console.log('bootstrapping');
      return Promise.resolve().then(() => {
        ctx.container = document.getElementById('app');
      });
    },
    mount: function () {
      console.log('mounting');
      return Promise.resolve().then(() => {
        ctx.container.innerHTML = 'hello world. My name is appA';
      });
    },
    unmount: function () {
      console.log('unmounting');
      return Promise.resolve().then(() => {
        ctx.container.innerHTML = '';
      });
    },
  };
})();