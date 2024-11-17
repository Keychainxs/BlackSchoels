from django.test import TestCase
from .black_schoels import calculate_option_price
from datetime import datetime, timedelta

# Create your tests here.


class BlackScholesTests(TestCase):  # Create a proper test class
    def setUp(self):
        """Set up test parameters"""
        self.spot_price = 100.0
        self.strike_price = 100.0
        self.maturity_date = datetime.now() + timedelta(days=365)
        self.risk_free_rate = 0.05
        self.volatility = 0.2

    def test_option_pricing(self):
        """Test basic option pricing"""
        try:
            result = calculate_option_price(
                spot_price=self.spot_price,
                strike_price=self.strike_price,
                maturity_date=self.maturity_date,
                risk_free_rate=self.risk_free_rate,
                volatility=self.volatility
            )
            
            # Print results
           
            print("\nBlack-Scholes Option Pricing Test Results:")
            print("----------------------------------------")
            print(f"Call Price: ${result['call_price']:.4f}")
            print(f"Put Price: ${result['put_price']:.4f}")
            print("\nGreeks:")
            print("-------")
            print(f"Call Delta: {result['greeks']['delta']['call']:.4f}")
            print(f"Put Delta: {result['greeks']['delta']['put']:.4f}")
            print(f"Gamma: {result['greeks']['gamma']:.4f}")
            print(f"Vega: {result['greeks']['vega']:.4f}")
            print(f"Call Theta: {result['greeks']['theta']['call']:.4f}")
            print(f"Put Theta: {result['greeks']['theta']['put']:.4f}")
            print(f"Call Rho: {result['greeks']['rho']['call']:.4f}")
            print(f"Put Rho: {result['greeks']['rho']['put']:.4f}")
            
            # Add assertions
            self.assertIsNotNone(result['call_price'])
            self.assertIsNotNone(result['put_price'])
            self.assertGreater(result['call_price'], 0)
            self.assertGreater(result['put_price'], 0)

        except Exception as e:
            self.fail(f"Test failed with error: {str(e)}")




