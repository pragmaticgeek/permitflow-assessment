import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { trpc } from '@utils/trpc';
import PermitForm from '../PermitForm';

// Mock the trpc and useForm hooks
vi.mock('@utils/trpc', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useUtils: vi.fn(),
    workType: {
      list: {
        useInfiniteQuery: vi.fn(),
      },
    },
    workOrders: {
      add: {
        useMutation: vi.fn(() => ({
          mutateAsync: vi.fn(),
        })),
      },
    },
  };
});

vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useForm: vi.fn(() => ({
      ...actual.useForm(),
      handleSubmit: vi.fn((fn) => fn),
      reset: vi.fn(),
      formState: { isValid: true, isSubmitting: false },
      watch: vi.fn(),
    })),
  };
});

const PermitFormWithTRPCWrapper = () => {
  return trpc.withTRPC(PermitForm);
};

describe('PermitForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TODO: Unable to mock and display PermitForm correctly with trpc
  test.todo('renders correctly and allows form submission', async () => {
    const { getByPlaceholderText, getByText } = render(
      <div>
        <PermitFormWithTRPCWrapper />
        test
      </div>,
    );
    const titleInput = getByPlaceholderText('Enter a work order title');
    const descriptionInput = getByPlaceholderText(
      'Enter a work order description',
    );
    const submitButton = getByText('Submit');

    fireEvent.change(titleInput, { target: { value: 'New Work Order' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Description of the work order' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(trpc.workOrders.add.useMutation().mutateAsync).toHaveBeenCalled();
    });
  });

  // Add more tests here to cover different scenarios, such as form validation, conditional rendering of subforms, etc.
});
