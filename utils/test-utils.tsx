import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import ToastProvider from '../src/providers/toast';

interface TestProvidersProps {
  children: ReactNode;
}

const TestProviders: FC<TestProvidersProps> = function TestProviders({ children }) {
  return (
    <ToastProvider>
      <Router>
        {children}
      </Router>
    </ToastProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: TestProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
