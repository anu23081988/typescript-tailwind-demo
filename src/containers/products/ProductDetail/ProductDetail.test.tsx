import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import '@testing-library/jest-dom/extend-expect';

// Mocking the AddToCart and Header component to simplify the test
jest.mock('../../../views/Header/Header', () => () => <div>Mock Header</div>);
jest.mock('../../../views/AddToCart/AddToCart', () => () => <div>Mock AddToCart</div>);

describe('ProductDetail Component', () => {
  // Mock successful fetch response
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'A great product for testing',
    category: 'Electronics',
    image: 'https://fakestoreapi.com/img/test.png',
    rating: { rate: 4.5 },
  };

  const mockFetch = (status: number, response: any) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status,
        json: () => Promise.resolve(response),
      })
    ) as jest.Mock;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the loading state initially', async () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('renders the product details after data is fetched', async () => {
    mockFetch(200, mockProduct);

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
      </MemoryRouter>
    );

    // Wait for fetch to complete and product to be rendered
    await waitFor(() => {
      expect(screen.getByText('Electronics - Test Product')).toBeInTheDocument();
    });

    expect(screen.getByText(/Rating: 4.5/i)).toBeInTheDocument();
    expect(screen.getByText(/\$29.99/i)).toBeInTheDocument();
    expect(screen.getByText('A great product for testing')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', mockProduct.image);
    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('Mock AddToCart')).toBeInTheDocument();
  });

  test('handles fetch error and stops loading', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch product'))
    ) as jest.Mock;

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Check if loading state is removed
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('displays "Product not found" when the product is not available', async () => {
    mockFetch(200, null);

    render(
      <MemoryRouter initialEntries={['/product/999']}>
        <Route path="/product/:id">
          <ProductDetail />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Product not found')).toBeInTheDocument();
    });
  });
});
