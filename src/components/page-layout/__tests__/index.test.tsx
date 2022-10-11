import React from 'react';
import { render } from 'test-utils';
import PageLayout from '..';

test('Page <title>', () => {
  render(
    <PageLayout title="test title">
      childrens
    </PageLayout>,
  );
});
