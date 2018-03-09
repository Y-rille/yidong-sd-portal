import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install({
        onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
        onUpdated: () => location.reload(),
    });
}

import Root from './root'
import { AppContainer } from 'react-hot-loader';

ReactDOM.render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById('mainContainer')
);

declare var module: any
if (module.hot) {
    module.hot.accept();
}