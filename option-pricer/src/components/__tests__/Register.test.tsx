import { render, screen, fireEvent } from '@testing-library/react';

import Register from "../auth/Register";


describe('Register Component', () => {
    test('renders registration form', () => {
      render(<Register />);
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });
  
    test('handles form submission', async () => {
      render(<Register />);
      
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'testuser' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/^password/i), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: 'password123' },
      });
  
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });
  });







