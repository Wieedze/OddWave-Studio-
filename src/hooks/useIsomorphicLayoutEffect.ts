// useLayoutEffect on the client, useEffect on the server (SSG) to avoid the
// React warning during pre-render.

import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from '@/helpers';

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
