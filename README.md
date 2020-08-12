# Events Management Project
*This is a demo events management project written in Django, React and powered by docker.*

# Requirements:
To get started you need:
 * python 3.6 or later. 
 * Docker installed on your machine.
 * node v.11.12.0 or later
 
# Development mode:

## Installation
Given that you have installed the requirements at the root directory of the repo run the following commands:
 * pip install -r /requirements.txt (assuming here that you have a virtual environment)
 * make start-docker
 * python backend/manage.py migrate
 * python backend/manage.py create_user
 
 Then for the frontend part --> cd frontend
 * yarn install
 
## Execution
Run the backend
* python backend/manage.py runserver

Run the frontend
* cd frontend
* yarn dev  

Visit http://localhost:8001/ for FE and http://localhost:8000/admin/ for Django admin. 

# Production mode:

## Execution
At the root directory:
* make start-prod

Wait a little bit and visit http://localhost:8000.   
If you want to visit django admin go to http://localhost:8000/admin/.

