// src/components/calculator/__tests__/OptionCalculator.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptionCalculator from '../OptionCalculator';
import { calculateOption } from '../../../services/api';

jest.mock('../../../services/api');

describe('OptionCalculator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders calculator form with all input fields and submit button', () => {
    render(<OptionCalculator />);

    // Check title
    const titleElement = screen.getByText(/option calculator/i);
    expect(titleElement).toBeInTheDocument();

    // Check input fields
    const spotPriceInput = screen.getByLabelText(/spot price/i);
    const strikePriceInput = screen.getByLabelText(/strike price/i);
    const maturityDateInput = screen.getByLabelText(/maturity date/i);
    const riskFreeRateInput = screen.getByLabelText(/risk-free rate/i);
    const volatilityInput = screen.getByLabelText(/volatility/i);

    expect(spotPriceInput).toBeInTheDocument();
    expect(strikePriceInput).toBeInTheDocument();
    expect(maturityDateInput).toBeInTheDocument();
    expect(riskFreeRateInput).toBeInTheDocument();
    expect(volatilityInput).toBeInTheDocument();

    // Check submit button
    const submitButton = screen.getByRole('button', { name: /calculate/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('handles form submission and displays results', async () => {
    const mockResponse = {
      call_price: 12.34,
      put_price: 5.67,
      greeks: {
        delta: { call: 0.5, put: -0.5 },
        gamma: 0.02,
        theta: { call: -0.01, put: -0.02 },
        vega: 0.1,
        rho: { call: 0.03, put: -0.03 },
      },
    };

    (calculateOption as jest.Mock).mockResolvedValue(mockResponse);

    render(<OptionCalculator />);

    // Fill in form inputs
    fireEvent.change(screen.getByLabelText(/spot price/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/strike price/i), { target: { value: '110' } });
    fireEvent.change(screen.getByLabelText(/maturity date/i), { target: { value: '2024-12-31T23:59' } });
    fireEvent.change(screen.getByLabelText(/risk-free rate/i), { target: { value: '0.05' } });
    fireEvent.change(screen.getByLabelText(/volatility/i), { target: { value: '0.2' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(screen.getByText(/call price: \$12\.34/i)).toBeInTheDocument();
      expect(screen.getByText(/put price: \$5\.67/i)).toBeInTheDocument();
    });

    // Check Greeks
    expect(screen.getByText(/call delta: 0\.5000/i)).toBeInTheDocument();
    expect(screen.getByText(/gamma: 0\.0200/i)).toBeInTheDocument();
  });

  test('displays an error message when API call fails', async () => {
    (calculateOption as jest.Mock).mockRejectedValue(new Error('Calculation failed'));

    render(<OptionCalculator />);

    // Fill in form inputs
    fireEvent.change(screen.getByLabelText(/spot price/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/strike price/i), { target: { value: '110' } });
    fireEvent.change(screen.getByLabelText(/maturity date/i), { target: { value: '2024-12-31T23:59' } });
    fireEvent.change(screen.getByLabelText(/risk-free rate/i), { target: { value: '0.05' } });
    fireEvent.change(screen.getByLabelText(/volatility/i), { target: { value: '0.2' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    // Wait for the error to appear
    await waitFor(() => {
      expect(screen.getByText(/calculation failed\. please check your inputs\./i)).toBeInTheDocument();
    });
  });
});
