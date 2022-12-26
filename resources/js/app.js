import React from "react";
import './bootstrap';
import {createRoot} from 'react-dom/client';
import {createInertiaApp} from "@inertiajs/inertia-react";
import {ToastProvider} from "react-toast-notifications";

const root = createRoot(document.getElementById('app'));


createInertiaApp({
    resolve: name => import(`./Pages/${name}`),
    setup({el, App, props}) {
        root.render(<ToastProvider autoDismiss>

        <App {...props} />
    </ToastProvider>)
        ;
    }
});

