
# Robo Advisor

A Django-based AI Robo Advisor leveraging OpenAI to provide personalized investment strategies and financial advice tailored to user inputs and preferences.

# Installation
To install the project dependencies, navigate to the project directory and run:


### `pipenv install`

This command creates a virtual environment and installs the dependencies specified in Pipfile.


## configuration 
create a .env file in the project root directory and specify your configuration as follows:

### `OPENAI_API_KEY="YourOpenAIKey"`

###  Running the Application
To start the Django development server, run:

### `pipenv run python manage.py runserver`

This command activates the virtual environment and starts the server. You can access the application at http://127.0.0.1:8000/.
## API Reference

### Create a User Profile:

### Send a POST request to /api/v1/advisor/user/ with JSON data containing user profile information. Example:
Json Example

` {
    "name": "John Doe",
    "risk_preference": "Medium",
    "annual_earnings": 75000,
    "investment_focus": "Technology stocks and renewable energy"
} 
`
### Get User Profile:

#### Send a GET request to `/api/v1/advisor/user/<user_id>/` to retrieve user profile information.

###  Get Investment Advice:
#### Send a GET request to `/api/v1/advisor/user/<user_id>/advice/` to get investment advice tailored to the user's profile.

## Get Portfolio Advice:

### Send a GET request to `/api/v1/advisor/portfolio-advice/<user_id>/` to retrieve the portfolio advice based on the user's profile.
Example JSON data for user creation:

json
Copy code
`{
    "name": "John Doe",
    "risk_preference": "Medium",
    "annual_earnings": 75000,
    "investment_focus": "Technology stocks and renewable energy"
}`

