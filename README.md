# BE Mini Application for Henan AM Task

This application using NodeJS, Express as the framework, PostgreSQL as the database and Sequelize as the ORM

User allowed to register into this app, and also login to the app.
Users can edit their profile include edit their password.

## Run Locally

Clone the project

```bash
  git clone https://github.com/si-saaref/be-henan-project.git
```

Go to the project directory

```bash
  cd be-henan-project
```

Change branch to dev

```bash
  git fetch --all
  git checkout dev
```

Install dependencies

```bash
  npm install
```

Create database from your terminal (better use command prompt)

```bash
  createdb (your-db-name)
```

Create user admin for database (here you will get prompt to set the password)

```bash
  createuser -P -s -e (your-user-name)
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you have to add some variable name to your environment variable `.env` file

Edit file `.env-example` (rename the file to `.env`) and change the variable into

`DB_USERNAME`=`your_username_that_youve_created_before`

`DB_PASSWORD`=`your_password_of_the_username`

`DB_NAME`=`your_db_name_that_youve_created_before`

`DB_DIALECT`=`postgres`

`DB_HOSTNAME`=`127.0.0.1`

## API Reference

#### Register User

```http
  POST /api/v1/auth/register
```

```bash
Payload Body
{
    "firstName": "Test",
    "lastName": "Dev",
    "email": "test_dev@gmail.com",
    "userName": "test.dev",
    "password": "TestDev123"
}

Example Response
{
    "message": "Register successfully",
    "status": 200,
    "data": {
        "id": 10,
        "email": "test_dev@gmail.com",
        "firstName": "Test",
        "lastName": "Dev",
        "userName": "test.dev",
        "updatedAt": "2023-12-21T06:58:56.572Z",
        "createdAt": "2023-12-21T06:58:56.572Z"
    }
}
```

#### Login User

```http
  POST /api/v1/auth/login
```

```bash
Payload Body
{
    "email": "test_dev@gmail.com",
    "password": "TestDev123"
}

Example Response
{
    "message": "Login Successfully",
    "status": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZW1haWwiOiJ0ZXN0X2RldkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJUZXN0IiwibGFzdE5hbWUiOiJEZXYifSwiaWF0IjoxNzAzMTQyMjIyLCJleHAiOjE3MDMyMjg2MjJ9._zRT5HgcdKFQ3BemmKU-N1x6_zclYK6V-F9h7yzb60Y"
    }
}
```

#### Edit User Profile

```http
  POST /api/v1/auth/user
```

```bash
Payload Body
{
    "firstName": "Super",
    "lastName": "Dev",
    "email": "test_dev@gmail.com",
    "userName": "test_dev_super"
}

Example Response
{
    "message": "Successfully update user profile",
    "status": 200,
    "data": {
        "id": 6,
        "firstName": "Super",
        "lastName": "Dev",
        "email": "test_dev@gmail.com",
        "userName": "test_dev_super",
        "createdAt": "2023-12-21T05:34:51.544Z",
        "updatedAt": "2023-12-21T07:05:16.666Z"
    }
}
```

#### Edit User Password

```http
  POST /api/v1/auth/user/password
```

```bash
Payload Body
{
    "lastPassword": "TestDev123",
    "newPassword": "AyoAyo123"
}

Example Response
{
    "message": "Successfully update password",
    "status": 200
}
```

## Additional Information

In order to support security awareness,
I have add some dependecies that will protect the application against cyber attacks

These are the feature

- Helmet
- Cors
- Rate Limiter
