import { DependencyList, useEffect } from 'react';

type Destructor = () => void;

export function useAbortEffect(effect: (signal: AbortSignal) => (void | Promise<void> | Destructor), deps?: DependencyList) {
  useEffect(() => {
    const aborter = new AbortController();
    const destructor = effect(aborter.signal);
    return () => {
      if (typeof destructor === 'function') {
        destructor();
      }
      aborter.abort();
    };
  }, deps);
}
