# tv-calendar

## Installation
1. Make a copy of the environment file
    ```
    cp .env.example .env
    ```

2. Create a [new API app](https://trakt.tv/oauth/applications/new)

    * Redirect uri
        ```
        http://localhost:3000/auth
        ```

    * Javascript (cors) origins
        ```
        http://localhost:3000
        ```

3. Paste the client_id en client_secret in the `.env` file

4. Install dependencies
    ```
    npm i
    ```

## Usage
Run the app using
```
node app.js
```