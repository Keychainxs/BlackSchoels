import numpy as np
from scipy.stats import norm
from datetime import datetime
import math
import pytz
# pricing_engine/black_scholes.py
import numpy as np
from scipy.stats import norm
from datetime import datetime
import math
from django.utils import timezone

class BlackScholes:
    """
    A class to implement the Black-Scholes option pricing model.
    
    Attributes:
        S (float): Current stock price
        K (float): Strike price
        T (float): Time to maturity in years
        r (float): Risk-free interest rate (decimal form)
        sigma (float): Volatility of the underlying asset (decimal form)
    """
    
    def __init__(self, spot_price, strike_price, maturity_date, risk_free_rate, volatility):
        """
        Initialize Black-Scholes calculator with option parameters
        """
        self.S = float(spot_price)
        self.K = float(strike_price)
        self.r = float(risk_free_rate)
        self.sigma = float(volatility)
        
        # Calculate time to maturity
        if isinstance(maturity_date, datetime):
            if maturity_date.tzinfo is None:
                maturity_date =  pytz.utc.localize(maturity_date)
                
            now = timezone.now()
            
            
            self.T = (maturity_date - now).days / 365.0
        else:
            self.T = float(maturity_date)
           
        # Calculate d1 and d2
        try:
            self.d1 = (np.log(self.S / self.K) + 
                      (self.r + 0.5 * self.sigma ** 2) * self.T) / (self.sigma * np.sqrt(self.T))
            self.d2 = self.d1 - self.sigma * np.sqrt(self.T)
        except Exception as e:
            raise ValueError(f"Error calculating d1 and d2: {str(e)}")

    def calculate_call_price(self):
        """Calculate European call option price"""
        try:
            call_price = (self.S * norm.cdf(self.d1) - 
                         self.K * np.exp(-self.r * self.T) * norm.cdf(self.d2))
            return max(0, call_price)
        except Exception as e:
            raise ValueError(f"Error calculating call price: {str(e)}")

    def calculate_put_price(self):
        """Calculate European put option price"""
        try:
            put_price = (self.K * np.exp(-self.r * self.T) * norm.cdf(-self.d2) - 
                        self.S * norm.cdf(-self.d1))
            return max(0, put_price)
        except Exception as e:
            raise ValueError(f"Error calculating put price: {str(e)}")

    def calculate_greeks(self):
        """
        Calculate option Greeks (Delta, Gamma, Theta, Vega, Rho)
        
        Returns:
            dict: Dictionary containing all calculated Greeks
        """
        try:
            # Delta
            call_delta = norm.cdf(self.d1)
            put_delta = call_delta - 1

            # Gamma (same for call and put)
            gamma = norm.pdf(self.d1) / (self.S * self.sigma * np.sqrt(self.T))

            # Theta
            call_theta = (-self.S * norm.pdf(self.d1) * self.sigma / (2 * np.sqrt(self.T)) - 
                         self.r * self.K * np.exp(-self.r * self.T) * norm.cdf(self.d2))
            
            put_theta = (-self.S * norm.pdf(self.d1) * self.sigma / (2 * np.sqrt(self.T)) + 
                        self.r * self.K * np.exp(-self.r * self.T) * norm.cdf(-self.d2))

            # Vega (same for call and put)
            vega = self.S * np.sqrt(self.T) * norm.pdf(self.d1)

            # Rho
            call_rho = self.K * self.T * np.exp(-self.r * self.T) * norm.cdf(self.d2)
            put_rho = -self.K * self.T * np.exp(-self.r * self.T) * norm.cdf(-self.d2)

            return {
                'delta': {'call': call_delta, 'put': put_delta},
                'gamma': gamma,
                'theta': {'call': call_theta, 'put': put_theta},
                'vega': vega,
                'rho': {'call': call_rho, 'put': put_rho}
            }
        except Exception as e:
            raise ValueError(f"Error calculating Greeks: {str(e)}")

def calculate_option_price(spot_price, strike_price, maturity_date, risk_free_rate, volatility):
    """
    Wrapper function to calculate option prices and Greeks
    
    Returns:
        dict: Dictionary containing call price, put price, and Greeks
    """
    try:
        bs = BlackScholes(
            spot_price=spot_price,
            strike_price=strike_price,
            maturity_date=maturity_date,
            risk_free_rate=risk_free_rate,
            volatility=volatility
        )
       
        return {
            'call_price': bs.calculate_call_price(),
            'put_price': bs.calculate_put_price(),
            'greeks': bs.calculate_greeks()
        }
    except Exception as e:
        raise ValueError(f"Error in option price calculation: {str(e)}")