'use client';

import { ReactNode, useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { isDarkMode } = useDarkMode(true);
  const theme = isDarkMode ? 'black' : 'cupcake';

  useEffect(() => {
    const daisyui = document.getElementById('daisyui-theme');
    if (daisyui) {
      daisyui.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div className="min-h-screen" id="daisyui-theme">
      {children}
    </div>
  );
};
