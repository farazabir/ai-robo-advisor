# Generated by Django 5.0.2 on 2024-02-19 19:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('advisor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PortfolioAdvice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equity_percentage', models.CharField(help_text='Allocated percentage to equity.', max_length=10)),
                ('fixed_income_percentage', models.CharField(help_text='Allocated percentage to fixed income.', max_length=10)),
                ('commodities_percentage', models.CharField(help_text='Allocated percentage to commodities.', max_length=10)),
                ('cash_percentage', models.CharField(help_text='Allocated percentage to cash.', max_length=10)),
                ('advice_details', models.TextField(help_text='Detailed advice from OpenAI.')),
                ('user_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='portfolio_advice', to='advisor.userprofile')),
            ],
        ),
    ]