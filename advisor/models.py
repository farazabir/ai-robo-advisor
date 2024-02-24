from django.db import models


class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    risk_preference = models.CharField(max_length=10, choices=(('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')))
    annual_earnings = models.DecimalField(max_digits=10, decimal_places=2)
    investment_focus = models.CharField(max_length=255, help_text="Areas of interest for investment")

    def __str__(self):
        return self.email


class PortfolioAdvice(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='portfolio_advice')
    equity_percentage = models.CharField(max_length=10, help_text="Allocated percentage to equity.")
    fixed_income_percentage = models.CharField(max_length=10, help_text="Allocated percentage to fixed income.")
    commodities_percentage = models.CharField(max_length=10, help_text="Allocated percentage to commodities.")
    cash_percentage = models.CharField(max_length=10, help_text="Allocated percentage to cash.")
    advice_details = models.TextField(help_text="Detailed advice from OpenAI.")

    def __str__(self):
        return f"{self.user_profile.name}'s Portfolio Advice"
