from django.urls import path
from .views import UserProfileView, UserAdviceView, PortfolioAdviceView 

urlpatterns = [
    path('user/<int:user_id>/advice/', UserAdviceView.as_view(), name='user-advice'),
    path('user/', UserProfileView.as_view(), name='user-list-create'),
    path('user/<int:user_id>/', UserProfileView.as_view(), name='user-detail-update-delete'),
    path('portfolio-advice/<int:user_id>/', PortfolioAdviceView.as_view(), name='portfolio-advice'),
]
