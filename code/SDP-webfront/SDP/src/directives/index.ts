import type { App } from 'vue';

import vHtmlxss from './v-htmlxss';
import vClickOutside from './v-click-outside';

export default {
  install(app: App) {
    app.directive(vHtmlxss.name, vHtmlxss.handler);
    app.directive(vClickOutside.name, vClickOutside.handler);
  },
};
