import { Alert, Snackbar } from '@mui/material';
import { useState, useEffect } from 'react';

interface ErrorAlertProps {
  error: string | null;
  onClose: () => void;
}

export const ErrorAlert = ({ error, onClose }: ErrorAlertProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="error" variant="filled">
        {error}
      </Alert>
    </Snackbar>
  );
};