# Citizen love API

* [Citizen love](https://citizen.love)

## Getting Started 

If You have a firebase project, You can easily recreate and launch your own help API by cloning/forking this repository. Never commit your firebase admin json file.

### Prerequisites 

You will need to have nodeJS and NPM installed on your local machine. To deploy it, You will need to have a firebase project.


### Installing

To run the project locally you will need to copy your firebase admin-sdk in the root folder and name it `admin-sdk.json`.

After that install and run the project with the scripts founds in package.json

```
npm install
npm run start
```

There is no hot-reload incorporated. You will need to restart the project after every change You make.

## Running the tests

No tests at this stage yet.

## Deployment

Deployment steps are defined in the `.circleci/config.yml`,

## Built With

* [Node JS](https://nodejs.org/en/) - JS on server
* [Express JS](https://expressjs.com/) - Minimalistic nodeJS framework
* [Firebase functions](https://firebase.google.com/docs/functions) - Google serverless functions
* [Function framework](https://cloud.google.com/functions/docs/functions-framework) - Local development helper
* [Circle CI](https://circleci.com/) - Easy integration to CI/CD

## Authors

* **Koppany Kondricz** - *Initial work* - [kondricz](https://github.com/kondricz)
* **Manuel Frick** - *Initial work* - [frickman](https://github.com/frickman)
