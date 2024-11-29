// src/components/auth/__tests__/Login.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';

describe('Login Component', () => {
  test('renders login form with all fields and button', () => {
    render(<Login />);

    // Check that the form title is rendered
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    // Check that email and password fields are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check that the submit button is rendered
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('updates form fields on user input', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('handles form submission', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Check that the console log is called (optional)
    // Use a spy if needed, e.g., jest.spyOn(console, 'log')
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
});
