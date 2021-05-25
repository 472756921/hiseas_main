import { useState } from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// Sentry.init({
//     dsn: 'http://9520c4d8bda446bea9126067f385f81d@localhost:8000/sentry/2',
//     integrations: [new Integrations.BrowserTracing()],
//     tracesSampleRate: 1.0,
// });

export function useQiankunStateForSlave() {
    const [masterState, setMasterState] = useState({});

    return {
        masterState,
        setMasterState,
    };
}
