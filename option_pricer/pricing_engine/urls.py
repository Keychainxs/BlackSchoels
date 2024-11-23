from django.urls import path
from .views import (TestMongoConnection,
                    CalculateOptionPriceView,
                    CalculateGreeksView,
                    )



urlpatterns = [
    path("test-connection/", TestMongoConnection.as_view(), name="test-connection"),
    path('greeks/', CalculateGreeksView.as_view(), name = "greeks"),
    path("calculate/", CalculateOptionPriceView.as_view(), name = "calculate")
]