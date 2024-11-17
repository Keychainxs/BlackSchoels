from rest_framework import serializers


# create a class OptionPricingSerializer
# then create objects of the stike price,spot price, maturity date, risk free date, and volility 
# for the arguments of spot and strike price create a mine field and set it to 0.01
# For the argument of risk free date create a min value of 0 
#for the argument of volitltiy create a argument minimum value of 0.0001, and a max value of 1.0
class OptionPricingSerializer(serializers.Serializer): 
    strike_price = serializers.FloatField(min_value = 0.01)
    spot_price = serializers.FloatField(min_value = 0.01)
    maturity_date = serializers.DateTimeField()
    risk_free_date = serializers.FloatField(min_value = 0)
    volitility = serializers.FloatField(min_value = 0.0001, max_value = 1.0)
#create another class called to set the fields for the callprice, greek, put, and calculation date 
# set the methods for each type: FLOAT field, date field, and Dictfield


class CalculateOptionsSerializer(serializers.Serializer): 
    call_price = serializers.FloatField()
    greeks = serializers.DictField()
    put_price = serializers.FloatField()
    calculation_date = serializers.DateTimeField(read_only= True)

