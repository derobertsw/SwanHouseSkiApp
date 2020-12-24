# Take a Hike!

Take a Hike is available online at https://dev.d2kuny68xeo7bn.amplifyapp.com

Take a Hike is a Hiking trail discovery and ranking service. This application allows users to find hikes near them, view trail data, including ratings, distance, and conditions. Users can rate and share each hikes with their friends as well as join and create groups.

## Getting started locally

Our application is deployed to AWS so you don't need to setup a local enviornment, but if you want to, here's how

### Make sure you have a .env file with the following structure

> REACT_APP_FIREBASE_KEY = "YOUR FB API KEY"  
>  REACT_APP_FIREBASE_DOMAIN= "YOUR FB DOMAIN"  
>  REACT_APP_FIREBASE_DATABASE = "YOUR FB DB URL"  
>  REACT_APP_FIREBASE_PROJECT_ID = "YOUR FB PROJECT ID"  
>  REACT_APP_FIREBASE_STORAGE_BUCKET ="YOUR FB STORAGE BUCKEY"  
>  REACT_APP_FIREBASE_SENDER_ID = "YOUR FB SENDER ID"  
>  REACT_APP_FIREBASE_APP_ID = "YOUR FB APP ID"

In the project directory, you run:

`npm install`

`npm test`

`npm start`

## Using the App

Create an account using Email/Password, Google Sign-in, or Facebook Sign-in

Select 'Home' and Take a Hike will find the 10 nearest trails to you. Click one to learn more about it!

When viewing details about a trail you can rate it, favorite it, share it, or leave a comment for the community.

Manage your account and change your password by selecting the 'Account' tab

In the 'Group' tab you can see existing groups to join or create your own

See all of the hikes you've favorited under the 'Favorite' tab

## Technologies Used

![image](https://drive.google.com/uc?export=view&id=1p30iE5IvWbBePgb7EdgQmR-JGhnP_AZp)

### React

### GraphQL

### Firebase Auth

### Fauna DB
FaunaDB is the data API for client-serverless applications. A web-native GraphQL interface, with support for custom business logic and integration with the serverless ecosystem, enables developers to simplify code and ship faster. The underlying globally-distributed storage and compute fabric is fast, consistent, and reliable, with a modern security infrastructure. FaunaDB is easy to get started with and offers a 100 percent serverless experience with nothing to manage.

### Amplify
Amplify is deployment and hosting tool for static websites and single page web apps on AWS. It is integrated with our GitHub Repository – pushes to our repository trigger a build and testing of the application. If the application has a clean build and passes the cypress tests, amplify will deploy the application to AWS.
 
### AWS Lambda
Lambda is a serverless function service on AWS. We are using this to host our Apollo server for our GraphQL implementation and calling our client to access the Hiking Project API. 
