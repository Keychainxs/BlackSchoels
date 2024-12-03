from django.urls import path
from .views import (TestMongoConnection,
                    CalculateOptionPriceView,
                    CalculateGreeksView, RegisterView,LoginView, LogoutView)



urlpatterns = [
    path("test-connection/", TestMongoConnection.as_view(), name="test-connection"),
    path('greeks/', CalculateGreeksView.as_view(), name = "greeks"),
    path("calculate/", CalculateOptionPriceView.as_view(), name = "calculate"),
    path("register/", RegisterView.as_view(), name = "register"),
    path("login/",LoginView.as_view(), name = "login"),
    path("logout/", LogoutView.as_view(), name = "logout")
]