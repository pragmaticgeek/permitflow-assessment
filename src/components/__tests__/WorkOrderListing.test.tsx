import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorkOrderListing } from '../WorkOrderListing';
import { WorkOrderType } from '@prisma/client';

// Mock the trpc hook and date-fns
vi.mock('@utils/trpc', () => ({
  trpc: {
    workOrders: {
      list: {
        useInfiniteQuery: vi.fn(() => ({
          data: {
            pages: [
              {
                items: [
                  {
                    id: '1',
                    title: 'Test Work Order',
                    type: WorkOrderType.EXTERIOR,
                    description: 'Test Description',
                    createdAt: new Date().toISOString(),
                    work: [
                      {
                        workType: {
                          description: 'Painting',
                        },
                      },
                    ],
                    permitType: 'Test Permit',
                  },
                ],
                nextCursor: null,
              },
            ],
          },
          status: 'success',
          fetchNextPage: vi.fn(),
          hasNextPage: false,
          isFetchingNextPage: false,
        })),
      },
    },
  },
}));

vi.mock('date-fns', () => ({
  formatDistance: vi.fn(() => '1 day ago'),
}));

describe('WorkOrderListing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders work orders correctly', () => {
    render(<WorkOrderListing />);
    expect(screen.getByText('Test Work Order')).toBeInTheDocument();
    expect(screen.getByText('Exterior')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Submitted:')).toBeInTheDocument();
    expect(screen.getByText('1 day ago')).toBeInTheDocument();
    expect(screen.getByText('Painting')).toBeInTheDocument();
    expect(screen.getByText('Nothing more to load')).toBeInTheDocument();
  });

  // Add more tests here to cover different scenarios, such as loading state, pagination, etc.
});
