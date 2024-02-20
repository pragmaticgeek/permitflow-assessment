import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { InHouseProcess } from '../InHouseProcess';

describe('InHouseProcess component', () => {
  test('renders heading and list items', () => {
    const { getByText } = render(<InHouseProcess />);

    expect(getByText('In-House Review Process')).toBeInTheDocument();
  });
});
