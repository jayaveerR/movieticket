'use client';

import { BrowserRouter as Router } from 'react-router-dom';

export default function RouterProvider({ children }: { children: React.ReactNode }) {
  return <Router>{children}</Router>;
}
