import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';

interface TestProvidersProps {
  children: ReactNode;
}

const TestProviders: FC<TestProvidersProps> = function TestProviders({ children }) {
  return (
    <div>
      {children}
    </div>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: TestProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
