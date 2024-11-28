// src/components/calculator/OptionCalculator.tsx
import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper,
  Stack
} from '@mui/material';
import { calculateOption } from '../../services/api';

interface CalculationResult {
  call_price: number;
  put_price: number;
  greeks: {
    delta: { call: number; put: number; };
    gamma: number;
    theta: { call: number; put: number; };
    vega: number;
    rho: { call: number; put: number; };
  };
}

const OptionCalculator = () => {
  const [formData, setFormData] = useState({
    spot_price: '',
    strike_price: '',
    maturity_date: '',
    risk_free_rate: '',
    volatility: ''
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = {
        spot_price: parseFloat(formData.spot_price),
        strike_price: parseFloat(formData.strike_price),
        maturity_date: formData.maturity_date,
        risk_free_rate: parseFloat(formData.risk_free_rate),
        volatility: parseFloat(formData.volatility)
      };

      const calculationResult = await calculateOption(data);
      setResult(calculationResult);
    } catch (error) {
      setError('Calculation failed. Please check your inputs.');
      console.error('Calculation error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Option Calculator
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: 1, minWidth: '200px' }}
                label="Spot Price"
                type="number"
                value={formData.spot_price}
                onChange={e => setFormData({ ...formData, spot_price: e.target.value })}
                size="small"
              />
              <TextField
                sx={{ flex: 1, minWidth: '200px' }}
                label="Strike Price"
                type="number"
                value={formData.strike_price}
                onChange={e => setFormData({ ...formData, strike_price: e.target.value })}
                size="small"
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: 1, minWidth: '200px' }}
                label="Maturity Date"
                type="datetime-local"
                value={formData.maturity_date}
                onChange={e => setFormData({ ...formData, maturity_date: e.target.value })}
                size="small"
                focused
              />
              <TextField
                sx={{ flex: 1, minWidth: '200px' }}
                label="Risk-Free Rate"
                type="number"
                value={formData.risk_free_rate}
                onChange={e => setFormData({ ...formData, risk_free_rate: e.target.value })}
                size="small"
                helperText="Enter as decimal (e.g., 0.05 for 5%)"
              />
            </Box>

            <TextField
              sx={{ maxWidth: '200px' }}
              label="Volatility"
              type="number"
              value={formData.volatility}
              onChange={e => setFormData({ ...formData, volatility: e.target.value })}
              size="small"
              helperText="Enter as decimal (e.g., 0.2 for 20%)"
            />

            <Button 
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
            >
              Calculate
            </Button>
          </Stack>
        </form>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {result && (
        <Paper sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>Option Prices</Typography>
              <Stack spacing={1}>
                <Typography>Call Price: ${result.call_price.toFixed(4)}</Typography>
                <Typography>Put Price: ${result.put_price.toFixed(4)}</Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>Greeks</Typography>
              <Stack spacing={1}>
                <Typography>Call Delta: {result.greeks.delta.call.toFixed(4)}</Typography>
                <Typography>Put Delta: {result.greeks.delta.put.toFixed(4)}</Typography>
                <Typography>Gamma: {result.greeks.gamma.toFixed(4)}</Typography>
                <Typography>Vega: {result.greeks.vega.toFixed(4)}</Typography>
                <Typography>Call Theta: {result.greeks.theta.call.toFixed(4)}</Typography>
                <Typography>Put Theta: {result.greeks.theta.put.toFixed(4)}</Typography>
                <Typography>Call Rho: {result.greeks.rho.call.toFixed(4)}</Typography>
                <Typography>Put Rho: {result.greeks.rho.put.toFixed(4)}</Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default OptionCalculator;