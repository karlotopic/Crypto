# Crypto
* This “mockup” application is designed to display the latest fluctuations of the most popular cryptocurrencies. Users can create an account and log in to (eventually) track their own cryptocurrency holdings.

* The app is built with Next.js for the frontend and Node.js with MySQL for the backend. Frontend and backend communicate via gRPC and Protobuf messages. Since gRPC communication in the browser requires a proxy, server-side rendering (SSR) adds a practical advantage here. The communication flow is illustrated in the diagram below: 

  ![crypto-diagram-2](https://user-images.githubusercontent.com/41049286/150861493-77e82014-ae6e-4cad-91ad-5a7f37a06a3a.png)

* An authorization and authentication system is implemented using JWT. Access token is being generated on each login/signup with the corresponding refresh token. The refresh token is stored in the database in case the access token expires. When the refresh token is used, a new one is being generated and stored in the database (with the old one being deleted).

* On the frontend, Storybook is used for component development, while the backend utilizes Prisma ORM.
