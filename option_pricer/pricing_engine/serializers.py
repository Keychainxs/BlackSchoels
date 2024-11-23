from rest_framework import serializers
from django.utils import timezone
import pytz
# create a class OptionPricingSerializer
# then create objects of the stike price,spot price, maturity date, risk free date, and volility 
# for the arguments of spot and strike price create a mine field and set it to 0.01
# For the argument of risk free date create a min value of 0 
#for the argument of volitltiy create a argument minimum value of 0.0001, and a max value of 1.0
class OptionPricingSerializer(serializers.Serializer): 
    strike_price = serializers.FloatField(min_value = 0.01)
    spot_price = serializers.FloatField(min_value = 0.01)
    maturity_date = serializers.DateTimeField()
    risk_free_rate = serializers.FloatField(min_value = 0)
    volatility = serializers.FloatField(min_value = 0.0001, max_value = 1.0)
    
    def validate_maturity_date(self, value):
        """
        Check that the maturity date is in the future and timezone-aware
        """
        if value.tzinfo is None:
            value = pytz.utc.localize(value)
        
        if value <= timezone.now():
            raise serializers.ValidationError("Maturity date must be in the future")
        
        return value
#create another class called to set the fields for the callprice, greek, put, and calculation date 
# set the methods for each type: FLOAT field, date field, and Dictfield
class UserRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
class CalculateOptionsSerializer(serializers.Serializer): 
    call_price = serializers.FloatField()
    greeks = serializers.DictField()
    put_price = serializers.FloatField()
    calculation_date = serializers.DateTimeField(read_only= True)

