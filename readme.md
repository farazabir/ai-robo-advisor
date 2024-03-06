# Robo Advisor

A Django-based AI Robo Advisor leveraging OpenAI to provide personalized investment strategies and financial advice tailored to user inputs and preferences.


##Preview:
![image](https://github.com/farazabir/ai-robo-advisor/assets/62275863/fef3dcde-238a-48e5-a502-f9057255b647)
![image](https://github.com/farazabir/ai-robo-advisor/assets/62275863/041f7177-0d35-48a2-af03-6ca2288ace91)


## Installation

To set up the project using Docker for both the backend (Django) and frontend, follow these steps:

### Backend Setup with Docker

1. Ensure you have Docker and Docker Compose installed on your system.
2. Create a Dockerfile in your backend directory (if not already present) with the necessary configurations.
3. Create a `docker-compose.yml` at the root of your project to configure your services (backend, frontend, database).

### Frontend Setup with Docker

1. Similarly, create a Dockerfile in your frontend directory specifying the node image and steps to build your React application.
2. In the `docker-compose.yml`, define the frontend service and specify the build context and ports.

### Running the Application with Docker

- Navigate to the root directory of the project where your `docker-compose.yml` file is located.
- Run the following command to build and start your containers:

```bash
docker-compose up --build
This command builds the images for your frontend and backend if they don't exist and starts the services defined in docker-compose.yml.

Installation Without Docker
To install the project dependencies without Docker, navigate to the project directory and run:

bash
Copy code
pipenv install
This command creates a virtual environment and installs the dependencies specified in Pipfile.

Configuration
Create a .env file in the project root directory and specify your configuration as follows:

plaintext
Copy code
OPENAI_API_KEY="YourOpenAIKey"
Running the Application Without Docker
To start the Django development server, run:

bash
Copy code
pipenv run python manage.py runserver
This command activates the virtual environment and starts the server. You can access the application at http://127.0.0.1:8000/.

API Reference
Create a User Profile
Send a POST request to /api/v1/advisor/user/ with JSON data containing user profile information. Example:

json
Copy code
{
    "name": "John Doe",
    "risk_preference": "Medium",
    "annual_earnings": 75000,
    "investment_focus": "Technology stocks and renewable energy"
}
Get User Profile
Send a GET request to /api/v1/advisor/user/<user_id>/ to retrieve user profile information.

Get Investment Advice
Send a GET request to /api/v1/advisor/user/<user_id>/advice/ to get investment advice tailored to the user's profile.

Get Portfolio Advice
Send a GET request to /api/v1/advisor/portfolio-advice/<user_id>/ to retrieve portfolio advice based on the user's profile.
