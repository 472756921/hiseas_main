import { useState } from 'react';

export function useQiankunStateForSlave() {
    const [masterState, setMasterState] = useState({});

    return {
        masterState,
        setMasterState,
    };
}
