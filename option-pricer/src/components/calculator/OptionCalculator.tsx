import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper,
  Stack,
  Container
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
    <Container maxWidth="md">
      <Box sx={{ 
        mt: 6,
        mb: 8,
        '& .MuiPaper-root': {
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff'
        }
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Option Calculator
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: 1, minWidth: '240px' }}
                  label="Spot Price"
                  type="number"
                  value={formData.spot_price}
                  onChange={e => setFormData({ ...formData, spot_price: e.target.value })}
                  variant="outlined"
                />
                <TextField
                  sx={{ flex: 1, minWidth: '240px' }}
                  label="Strike Price"
                  type="number"
                  value={formData.strike_price}
                  onChange={e => setFormData({ ...formData, strike_price: e.target.value })}
                  variant="outlined"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: 1, minWidth: '240px' }}
                  label="Maturity Date"
                  type="datetime-local"
                  value={formData.maturity_date}
                  onChange={e => setFormData({ ...formData, maturity_date: e.target.value })}
                  focused
                  variant="outlined"
                />
                <TextField
                  sx={{ flex: 1, minWidth: '240px' }}
                  label="Risk-Free Rate"
                  type="number"
                  value={formData.risk_free_rate}
                  onChange={e => setFormData({ ...formData, risk_free_rate: e.target.value })}
                  helperText="Enter as decimal (e.g., 0.05 for 5%)"
                  variant="outlined"
                />
              </Box>

              <TextField
                sx={{ maxWidth: '240px' }}
                label="Volatility"
                type="number"
                value={formData.volatility}
                onChange={e => setFormData({ ...formData, volatility: e.target.value })}
                helperText="Enter as decimal (e.g., 0.2 for 20%)"
                variant="outlined"
              />

              <Button 
                variant="contained"
                type="submit"
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                  maxWidth: '200px',
                  alignSelf: 'center'
                }}
              >
                Calculate
              </Button>
            </Stack>
          </form>
        </Paper>

        {error && (
          <Typography 
            color="error" 
            sx={{ 
              mt: 2,
              textAlign: 'center',
              fontWeight: 500 
            }}
          >
            {error}
          </Typography>
        )}

        {result && (
          <Paper sx={{ p: 4 }}>
            <Stack spacing={4}>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    color: 'primary.main',
                    fontWeight: 600 
                  }}
                >
                  Option Prices
                </Typography>
                <Stack spacing={2} sx={{ pl: 2 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Call Price: ${result.call_price.toFixed(4)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Put Price: ${result.put_price.toFixed(4)}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    color: 'primary.main',
                    fontWeight: 600 
                  }}
                >
                  Greeks
                </Typography>
                <Stack spacing={2} sx={{ pl: 2 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Call Delta: {result.greeks.delta.call.toFixed(4)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Put Delta: {result.greeks.delta.put.toFixed(4)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Gamma: {result.greeks.gamma.toFixed(4)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Vega: {result.greeks.vega.toFixed(4)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Call Theta: {result.greeks.theta.call.toFixed(4)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Put Theta: {result.greeks.theta.put.toFixed(4)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Call Rho: {result.greeks.rho.call.toFixed(4)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    Put Rho: {result.greeks.rho.put.toFixed(4)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default OptionCalculator;