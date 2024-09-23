import NProgress from 'nprogress';
import { router } from '@inertiajs/react';

export const configureNProgress = () => {
    NProgress.configure({ showSpinner: true });

    router.on('start', (event) => {
        const { headers } = event.detail.visit;
        if (headers && headers['X-Inertia-Partial-Component']) return;

        NProgress.start();
        document.body.classList.add('nprogress-busy');
    });

    router.on('finish', (event) => {
        const { headers } = event.detail.visit;
        if (headers && headers['X-Inertia-Partial-Component']) return;

        NProgress.done();
        document.body.classList.remove('nprogress-busy');
    });
};
