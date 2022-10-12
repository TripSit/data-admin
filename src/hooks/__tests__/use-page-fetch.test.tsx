import React, { FC } from 'react';
import { render, screen } from 'test-utils';
import usePageFetch from '../use-page-fetch';
import tsApi from '../../ts-api';

jest.mock('../../ts-api');

test('Initial state is null', () => {
  (tsApi.get as jest.Mock).mockResolvedValue({
    data: {},
  });

  const TestComponent: FC = function TestComponent() {
    const { data, error } = usePageFetch('/');
    return (
      <>
        <div data-testid="data" data-value={data === null} />
        <div data-testid="error" data-value={error === null} />
      </>
    );
  };

  render(<TestComponent />);

  expect(screen.getByTestId('data').dataset.value).toBe('true');
  expect(screen.getByTestId('error').dataset.value).toBe('true');
});
