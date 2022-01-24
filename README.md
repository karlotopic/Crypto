# Crypto
* The idea of this "mockup" application is to show the latest fluctuations of the most popular cryptocurrencies. 
The user can create and log-in to his account.

* It is realised using NextJS for frontend and NodeJS with MySQL for the backend. 
The two (FE-BE) communicate using gRPC and protobuff messages. Implementing gRPC communication with the browser requires some kind of proxy, so the benefit of using SSR here comes in play. The communication flow is displayed in the following diagram:  

  ![crypto-diagram-2](https://user-images.githubusercontent.com/41049286/150861493-77e82014-ae6e-4cad-91ad-5a7f37a06a3a.png)

* An advanced authorization and authentication system is realized using JWT. Access token is being generated on each login/signup with the corresponding refresh token. The refresh token is stored in the database in case the access token expires. When the refresh token is used, a new one is being generated and stored in the database (with the old one being deleted).

* The frontend uses storybook for component development while the backend uses Prisma ORM to communicate with the database.
