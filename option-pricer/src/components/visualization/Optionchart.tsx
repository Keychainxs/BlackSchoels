// src/components/visualization/OptionChart.tsx
import { Box, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
 data: {
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
}

const generateChartData = (result: ChartProps['data']) => {
 const spotPrices = Array.from({ length: 20 }, (_, i) => 60 + i * 2); // Generate price range 60-100
 return spotPrices.map(spotPrice => ({
   spotPrice,
   callPrice: result.call_price * (spotPrice / 80), // Approximate scaling
   putPrice: result.put_price * (80 / spotPrice),
   strike: 80 // Your strike price
 }));
};

const OptionChart = ({ data }: ChartProps) => {
 const chartData = generateChartData(data);

 return (
   <Paper sx={{ p: 4, mt: 4 }}>
     <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
       Price Analysis
     </Typography>
     <Box sx={{ height: 400, mt: 2 }}>
       <ResponsiveContainer width="100%" height="100%">
         <LineChart
           data={chartData}
           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
         >
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis 
             dataKey="spotPrice" 
             label={{ value: 'Spot Price', position: 'bottom' }} 
           />
           <YAxis 
             label={{ value: 'Option Price', angle: -90, position: 'insideLeft' }} 
           />
           <Tooltip />
           <Legend />
           <Line 
             type="monotone" 
             dataKey="callPrice" 
             stroke="#8884d8" 
             name="Call Price" 
             dot={false}
           />
           <Line 
             type="monotone" 
             dataKey="putPrice" 
             stroke="#82ca9d" 
             name="Put Price" 
             dot={false}
           />
           <Line 
             type="monotone" 
             dataKey="strike" 
             stroke="#ff7300" 
             name="Strike Price" 
             strokeDasharray="5 5" 
             dot={false}
           />
         </LineChart>
       </ResponsiveContainer>
     </Box>
   </Paper>
 );
};

export default OptionChart;