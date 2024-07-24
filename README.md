# TV Company APP

This project is a solution for the commercial department of the television company,
designed to track the calculations related to the passage of advertisements on TV.
The system contains basic functions for managing ads, shows, clients and agents.

## Features

- Manage advertisements, shows, customers, and agents.
- Track advertisement airing and performance.
- User authentication and authorization.

## Usage: Accessing via Vercel and Render

To use the deployed application, you can access the frontend and backend via the following URLs:

- Frontend (Vercel): https://tv-company-client.vercel.app/
- Backend (Render): https://github.com/IvanRuskevych/tv-company-server
- API documentation (swagger): https://tv-company-server.onrender.com/api-docs/

## Technologies Used

- Frontend: Angular, Angular Material
- Backend: Node.js, Express, MongoDB
- Deployment: Vercel (Frontend), Render (Backend)

## Installation and Setup

- Frontend Setup:
  - Clone the repository:
    - git clone https://github.com/IvanRuskevych/tv-company-client.git
    - cd tv-company-client
  - Install dependencies:
    - npm install
  - Run the development server:
    - ng serve /or/ npm start
  - Open your browser and navigate to http://localhost:4200
- Backend Setup:
  - Clone the repository:
    - git clone https://github.com/IvanRuskevych/tv-company-server.git
    - cd tv-company-server
  - Install dependencies:
    - npm install
  - Create a .env file in the root directory and add your environment variables:
    - PORT=5000
    - MONGODB_URI=<your-mongodb-uri>
    - KEY_ACCESS_TOKEN=<your-access-token-key>
    - KEY_REFRESH_TOKEN=<your-refresh-token-key>
  - Run the development server:
    - npm install
  - Your backend server should now be running on http://localhost:5000

# This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


