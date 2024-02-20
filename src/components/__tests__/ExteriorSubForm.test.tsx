import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ExteriorSubForm } from '../ExteriorSubForm';
import { useForm } from 'react-hook-form';
import { Form } from '@uikit/form';

// Mock the store and its return values
vi.mock('@store/store', () => ({
  useExteriorWorkListStore: vi.fn(() => ({
    exteriorWorkList: [
      { id: '1', description: 'Painting' },
      { id: '2', description: 'Roofing' },
    ],
  })),
}));

const ExteriorSubFormWrapper = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <ExteriorSubForm form={form} />
    </Form>
  );
};

// Helper function to render the component with necessary props
const renderExteriorSubForm = () => {
  return render(<ExteriorSubFormWrapper />);
};

describe('ExteriorSubForm', () => {
  it('renders correctly with exterior work options', () => {
    const { getByLabelText } = renderExteriorSubForm();
    expect(getByLabelText('Painting')).toBeInTheDocument();
    expect(getByLabelText('Roofing')).toBeInTheDocument();
  });
});
