import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { InteriorSubForm } from '../InteriorSubForm';
import { useForm } from 'react-hook-form';
import { Form } from '@uikit/form';

// Mock the store and its return values
vi.mock('@store/store', () => ({
  useInteriorWorkListStore: vi.fn(() => ({
    interiorWorkList: [
      { id: '1', description: 'Painting' },
      { id: '2', description: 'Roofing' },
    ],
  })),
}));

const InteriorSubFormWrapper = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <InteriorSubForm form={form} />
    </Form>
  );
};

// Helper function to render the component with necessary props
const renderInteriorSubForm = () => {
  return render(<InteriorSubFormWrapper />);
};

describe('InteriorSubForm', () => {
  it('renders correctly with interior work options', () => {
    const { getByLabelText } = renderInteriorSubForm();
    expect(getByLabelText('Painting')).toBeInTheDocument();
    expect(getByLabelText('Roofing')).toBeInTheDocument();
  });
});
