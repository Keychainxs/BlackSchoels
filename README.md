# Black-Scholes Option Calculator

## Overview

The Black-Scholes Option Calculator is a comprehensive web application designed to provide financial professionals and traders with accurate options pricing and Greeks calculations. Built using modern web technologies, this application offers a secure, user-friendly interface for performing complex financial calculations.

## Features

The application combines robust functionality with intuitive design:

### Core Calculation Features
- Black-Scholes option pricing model implementation
- Real-time calculation of option Greeks (Delta, Gamma, Theta, Vega, Rho)
- Support for both call and put options
- Precise handling of financial calculations

### User Management
- Secure user authentication system
- Protected access to calculation features
- Personalized user experience
- Session management with JWT tokens

### Technical Infrastructure
- MongoDB database integration
- RESTful API architecture
- Responsive design optimization
- Cross-platform compatibility

## Technology Stack

### Frontend
- React with TypeScript
- Material-UI component library
- Axios for API communications
- JWT token management

### Backend
- Django REST Framework
- MongoDB database
- Python-based calculation engine
- JWT authentication middleware

## Installation

### Prerequisites
Before beginning installation, ensure you have:
- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- Git

### Backend Setup

1. Create and activate your Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
MONGODB_HOST = 'Yourhost(Could be localhost)'
MONGODB_PORT = 27017
MONGODB_NAME = 'Your DB name'
python manage.py migrate
python manage.py runserver
