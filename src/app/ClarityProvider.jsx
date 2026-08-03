'use client';

import { useEffect } from 'react';
import { clarity } from '@microsoft/clarity';

export default function ClarityProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      clarity.init('xwgwu4dvdz');
    }
  }, []);

  return null;
}
