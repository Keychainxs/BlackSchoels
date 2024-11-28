// src/components/calculator/__tests__/OptionCalculator.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OptionCalculator from '../OptionCalculator';
import { calculateOption } from '../../../services/api';

// Mock the API call
jest.mock('../../../services/api');
const mockCalculateOption = calculateOption as jest.MockedFunction<typeof calculateOption>;

describe('OptionCalculator', () => {
  const mockResult = {
    call_price: 10.5,
    put_price: 5.5,
    greeks: {
      delta: { call: 0.6, put: -0.4 },
      gamma: 0.02,
      theta: { call: -5.5, put: -3.5 },
      vega: 30.5,
      rho: { call: 45.5, put: -35.5 }
    }
  };

  beforeEach(() => {
    // Clear mock before each test
    jest.clearAllMocks();
  });

  it('renders the calculator form', () => {
    render(<OptionCalculator />);
    
    expect(screen.getByLabelText(/spot price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/strike price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maturity date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/risk-free rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/volatility/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  it('allows users to input values', async () => {
    render(<OptionCalculator />);
    
    const spotPriceInput = screen.getByLabelText(/spot price/i);
    const strikePriceInput = screen.getByLabelText(/strike price/i);
    const riskFreeRateInput = screen.getByLabelText(/risk-free rate/i);
    const volatilityInput = screen.getByLabelText(/volatility/i);

    await userEvent.type(spotPriceInput, '100');
    await userEvent.type(strikePriceInput, '100');
    await userEvent.type(riskFreeRateInput, '0.05');
    await userEvent.type(volatilityInput, '0.2');

    expect(spotPriceInput).toHaveValue(100);
    expect(strikePriceInput).toHaveValue(100);
    expect(riskFreeRateInput).toHaveValue(0.05);
    expect(volatilityInput).toHaveValue(0.2);
  });

  it('calculates option prices when form is submitted', async () => {
    mockCalculateOption.mockResolvedValueOnce(mockResult);
    render(<OptionCalculator />);

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/spot price/i), '100');
    await userEvent.type(screen.getByLabelText(/strike price/i), '100');
    await userEvent.type(screen.getByLabelText(/risk-free rate/i), '0.05');
    await userEvent.type(screen.getByLabelText(/volatility/i), '0.2');
    
    // Set maturity date
    const maturityDateInput = screen.getByLabelText(/maturity date/i);
    fireEvent.change(maturityDateInput, { 
      target: { value: '2024-12-31T00:00' } 
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    // Wait for results to be displayed
    await waitFor(() => {
      expect(screen.getByText(/call price: \$10.5/i)).toBeInTheDocument();
      expect(screen.getByText(/put price: \$5.5/i)).toBeInTheDocument();
    });

    // Verify API was called with correct parameters
    expect(mockCalculateOption).toHaveBeenCalledWith({
      spot_price: 100,
      strike_price: 100,
      maturity_date: '2024-12-31T00:00',
      risk_free_rate: 0.05,
      volatility: 0.2
    });
  });

  it('displays error message when calculation fails', async () => {
    mockCalculateOption.mockRejectedValueOnce(new Error('Calculation failed'));
    render(<OptionCalculator />);

    // Fill and submit form
    await userEvent.type(screen.getByLabelText(/spot price/i), '100');
    await userEvent.type(screen.getByLabelText(/strike price/i), '100');
    await userEvent.type(screen.getByLabelText(/risk-free rate/i), '0.05');
    await userEvent.type(screen.getByLabelText(/volatility/i), '0.2');
    
    fireEvent.change(screen.getByLabelText(/maturity date/i), { 
      target: { value: '2024-12-31T00:00' } 
    });

    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/calculation failed/i)).toBeInTheDocument();
    });
  });

  it('validates input values', async () => {
    render(<OptionCalculator />);
    
    // Try submitting with invalid values
    await userEvent.type(screen.getByLabelText(/spot price/i), '-100');
    await userEvent.type(screen.getByLabelText(/volatility/i), '2');
    
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    // Verify validation messages
    await waitFor(() => {
      expect(screen.getByText(/invalid input values/i)).toBeInTheDocument();
    });
  });
});