// src/components/calculator/__tests__/OptionCalculator.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptionCalculator from '../OptionCalculator';

describe('OptionCalculator', () => {
  test('renders calculator form', () => {
    render(<OptionCalculator />);
    const titleElement = screen.getByText(/option calculator/i);
    expect(titleElement).toBeInTheDocument();
  });
});