import { designComponent } from 'src/use/designComponent';
import { reactive, DefineComponent, markRaw, watch } from 'vue';
import { AppNavigator } from './app-navigator';

/**
 * 页面导航 - 通过监听全局路由状态的改变从而改变内容
 */
export const AppNavigatorPage = designComponent({
  setup() {

    const navigator = AppNavigator.use.inject();

    const state = reactive({
      PageComponent: null as null | DefineComponent,
    });

    const utils = {
      reset: async () => {
        let { path } = navigator.state.route;
        if (!path) return;
        if (path.charAt(0) === '/') {
          path = path.slice(1);
        }
        const Component = (await import('story/pages/' + path)).default
        state.PageComponent = markRaw(Component);
      },
    };

    watch(() => navigator.state.route.path, utils.reset, { immediate: true });

    return {
      render: () => {
        const { PageComponent } = state;
        return !!PageComponent ? <PageComponent /> : null;
      }
    }
  },
})