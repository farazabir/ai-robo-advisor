from rest_framework import serializers
from .models import UserProfile, PortfolioAdvice

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'name', 'email', 'risk_preference', 'annual_earnings', 'investment_focus']

class PortfolioAdviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioAdvice
        fields = ['user_profile', 'equity_percentage', 'fixed_income_percentage', 'commodities_percentage', 'cash_percentage', 'advice_details']

