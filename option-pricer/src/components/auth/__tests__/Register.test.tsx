// src/components/auth/__tests__/Register.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../Register';

describe('Register Component', () => {
  test('renders registration form with all fields and button', () => {
    render(<Register />);

    // Check that the form title is rendered
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();

    // Check that all form fields are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password', { selector: 'input' })).toBeInTheDocument();

    // Check that the submit button is rendered
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('updates form fields on user input', () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    const confirmPasswordInput = screen.getByLabelText('Confirm Password', { selector: 'input' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  test('handles form submission', () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    const confirmPasswordInput = screen.getByLabelText('Confirm Password', { selector: 'input' });
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Check that the form title is still visible after submission
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });
});
