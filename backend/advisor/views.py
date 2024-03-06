from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, PortfolioAdvice
from .serializers import PortfolioAdviceSerializer,UserProfileSerializer
import openai
import os
import re


def parse_advice(advice_text):
    # Define patterns to match the structured advice text
    patterns = {
        "equity_percentage": re.compile(r"Equity\s*\((\d+)%\):"),
        "fixed_income_percentage": re.compile(r"Fixed Income\s*\((\d+)%\):"),
        "commodities_percentage": re.compile(r"Commodities\s*\((\d+)%\):"),
        "cash_percentage": re.compile(r"Cash\s*\((\d+)%\):"),
    }

    extracted_info = {}
    for key, pattern in patterns.items():
        match = pattern.search(advice_text)
        if match:
            extracted_info[key] = f"{match.group(1)}%"
        else:
            extracted_info[key] = "0%"  # Fallback if no match is found

    extracted_info["advice_details"] = advice_text
    return extracted_info




class UserAdviceView(APIView):
    def get(self, request, user_id, format=None):
        user_profile = get_object_or_404(UserProfile, pk=user_id)

        openai.api_key = os.getenv('OPENAI_API_KEY')

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo-0125",  
                messages=[
                    {
                        "role": "system",
                        "content": "You are a financial advisor assistant. Provide detailed, careful, and professional investment advice. Output the investment strategy in a structured format with clear categories and percentages for equity, fixed income, commodities, and cash."
                    },
                    {
                        "role": "user",
                        "content": f"Given a user with {user_profile.risk_preference} risk preference, annual earnings of ${user_profile.annual_earnings}, and an interest in {user_profile.investment_focus}, please provide a detailed investment strategy. Use a structured format with categories and exact percentages for equity, fixed income, commodities, and cash."
                    }
                ]
            )

            advice_text = response.choices[0].message['content'] if response.choices else "Could not generate advice."
            extracted_info = parse_advice(advice_text)

            # Check if existing advice is present
            existing_advice = PortfolioAdvice.objects.filter(user_profile=user_profile).first()

            if existing_advice:
                # Update existing advice
                for key, value in extracted_info.items():
                    setattr(existing_advice, key, value)
                existing_advice.save()
                advice_serializer = PortfolioAdviceSerializer(existing_advice)
            else:
                # Create new advice
                advice_data = {'user_profile': user_profile.pk, **extracted_info}
                advice_serializer = PortfolioAdviceSerializer(data=advice_data)
                if advice_serializer.is_valid():
                    advice_serializer.save()

            return Response(advice_serializer.data, status=status.HTTP_201_CREATED if not existing_advice else status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Failed to generate advice due to an internal error: {str(e)}'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)




class UserProfileView(APIView):
    def get(self, request, user_id=None, format=None):
        if user_id:
            
            user_profile = get_object_or_404(UserProfile, pk=user_id)
            serializer = UserProfileSerializer(user_profile)
        else:
            # Retrieve all user profiles
            user_profiles = UserProfile.objects.all()
            serializer = UserProfileSerializer(user_profiles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, user_id, format=None):
        user_profile = get_object_or_404(UserProfile, pk=user_id)
        serializer = UserProfileSerializer(user_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, user_id, format=None):
        user_profile = get_object_or_404(UserProfile, pk=user_id)
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)  
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, format=None):
        user_profile = get_object_or_404(UserProfile, pk=user_id)
        user_profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class PortfolioAdviceView(APIView):
    def get(self, request, user_id, format=None):
        user_profile = get_object_or_404(UserProfile, pk=user_id)
        advice = get_object_or_404(PortfolioAdvice, user_profile=user_profile)
        advice_serializer = PortfolioAdviceSerializer(advice)
        return Response(advice_serializer.data)
