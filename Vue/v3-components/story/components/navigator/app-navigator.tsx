import { designComponent } from 'src/use/designComponent';
import { reactive, onBeforeUnmount, provide, inject, getCurrentInstance } from 'vue';

interface Route {
  path?: string;
  hash?: string;
  param?: { [k: string]: string };
}

/**
 * 根据当前hash值获取路由
 */
function getRoute(): Route | null {
  let locationHash = window.location.hash;
  if (locationHash.charAt(0) === '#') {
    locationHash = locationHash.slice(1);
  }
  if (!locationHash) return null;

  const [path, hash] = (decodeURIComponent(locationHash)).split('#')

  return {
    path,
    hash,
  }
}

export const AppNavigator = designComponent({
  name: 'app-navigator',
  props: {
    defaultPath: String,
  },
  provideRefer: true,
  setup(props, setupContext) {
    let initRoute = getRoute();
    !initRoute && (initRoute = { path: props.defaultPath });

    const state = reactive({
      route: initRoute,
    });

    const utils = {
      /**
       * 重新根据当前hash变更路由状态
       */
      reset: () => {
        const route = getRoute()
        !!route && (state.route = route);
      }
    }

    const handler = {
      hashchange: () => utils.reset(),
    };

    // 监听hash值的改变，改变导航路由状态
    window.addEventListener('hashchange', handler.hashchange);
    onBeforeUnmount(() => window.removeEventListener('hashchange', handler.hashchange));

    const methods = {
      /**
       * 页面跳转
       * @param path 目标页面hash值
       * @example go('/normal/color') | go('normal/color')
       */
      go(path: string) {
        window.location.hash = encodeURIComponent(path);
      },
    };

    const refer = {
      state,
      methods,
    };

    return {
      refer,
      render: () => !!setupContext.slots.default ? setupContext.slots.default() : null,
    };
  },
})
