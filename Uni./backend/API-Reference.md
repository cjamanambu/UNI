# OVERVIEW

The API currently allows login, signup, getting activities, creating new activities, and getting specific activities.

- To signup a an email, username, and password must be provided
- To login, a user must provide their email and password
- An authentication token is used to authorize users by adding it to the headers when making requests to the API
  
  - **The authorization token should have the key 'Authorization' and the value as the authorization key**

# REQUESTS

## Sign up with credentials

### Request

```
POST /users/signup
```
This endpoint creates an account for a user using their credentials and will return a token in the response which needs
to be used in the header in order to authenticate a user

### Example Request

```javascript
POST /users/signup
Accept: application/json
```

#### Payload:

```json
{
	"username":"whatsup1",
	"email":"supma1n@myumanitoba.ca",
	"password":"supping"
}
```

#### Example Successful Response
```
HTTP 200 Content-Type: application/json
```

```json
{
    "success": true,
    "info": "new user successfully created",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVTkkiLCJzdWIiOiI1Yzg0YmNhZTE3MDY5MDBjODczOGQzNzUiLCJpYXQiOjE1NTIyMDI5MjY2MjcsImV4cCI6MTU1MjI4NTcyNjYyN30.vYKqO3iOvNa_BlMqlmgQCc8GnjBngTUPo8m2a3QS_7I",
    "user": {
        "username": "whatsup1",
        "email": "supma1n@myumanitoba.ca"
    }
}
```


#### Example Unsuccessful Response:
```json
{
    "success": false,
    "info": "Username annd Email address already exist"
}
```

## Sign in with user credentials

### Request

```
POST /users/signin
```

This endpoint will return a token and the id of the User, if the correct credentials are provided.

#### Example Request

```javascript
POST /users/signin
Accept: application/json
```

#### Payload:
```json
{
	"username":"whatsup",
	"email":"supman@myumanitoba.ca",
	"password":"supping"
}
```

#### Example Successful Response

```
HTTP 200 Content-Type: application/json
```

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVTkkiLCJzdWIiOiI1YzgxYTU0Njg4OGFiMDI0Y2ZkYTVhYmUiLCJpYXQiOjE1NTIxNzcyMzA4MDQsImV4cCI6MTU1MjI2MDAzMDgwNH0.ksU6fK9kOgLP3m1dSB20scp3I0yQGL5nWXrJayKWbQc",
    "success": true,
    "user": {
        "_id": "5c81a546888ab024cfda5abe"
    }
}
```

#### Example Unsuccessful Response:
```json
{
    "success": false,
    "info": "Incorrect password.",
    "user": null
}
```

## Get all the activites available for attendance

### Request

```
GET /activities
```

This endpoint will return a list of all current activities.

#### Example Request

```javascript
GET /activities
```
**Note that this endpoint does not require authorization.**

#### Example Successful Response

```
HTTP 200 Content-Type: application/json
```

```json
{
    "success": true,
    "info": "Successfully retrieved all activities",
    "activities": [
        {
            "attendance_list": [],
            "datetime_created": "2019-03-05T01:11:49.334Z",
            "_id": "5c836d65303f740df6e55986",
            "activity_datetime": "2019-08-10T02:08:00.000Z",
            "category": "dance",
            "description": "Lets bust some moves",
            "max_attendance": 3,
            "title": "The drop"
        },
        {
            "attendance_list": [],
            "datetime_created": "2019-03-05T01:11:54.974Z",
            "_id": "5c836d65303f740df6e55987",
            "activity_datetime": "2019-05-22T13:39:00.000Z",
            "category": "dance",
            "description": "Every tried salsa?",
            "max_attendance": 4,
            "title": "Salsa Dancer"
        },
        ...
    ]
}
```

## Get the activity specified by the id

### Request

```
GET /activities/activity:id
```

This endpoint will return the details about the Activity specified by :id.

#### Example Request

```javascript
GET /activities/activity/5c836d65303f740df6e55986
```
**Note that this endpoint does not require authorization.**

#### Example Successful Response

```
HTTP 200 Content-Type: application/json
```

```json
{
    "success": true,
    "info": "Successfully found required activity",
    "activity": {
        "attendance_list": [],
        "datetime_created": "2019-03-05T01:11:49.334Z",
        "_id": "5c836d65303f740df6e55986",
        "activity_datetime": "2019-08-10T02:08:00.000Z",
        "category": "dance",
        "description": "Lets bust some moves",
        "max_attendance": 3,
        "title": "The drop"
    }
}
```

## Create a new Activity

### Request

```
POST /activities/activity/create
```

This endpoint will add a new activity to the database, and return the id of the activity.

#### Example Request

```javascript
POST /activities/activity/create
Accept: application/json
```

#### Payload:

```json
{
	"attendance_list":[],
	"category":"sports",
	"activity_datetime": "2019-03-05 01:11:49.334",
	"max_attendance":6,
	"description": "This is where you should be",
	"title": "Where it's at"
}
```
**Note that this endpoint DOES require authorization.**

#### Example Successful Response

```
HTTP 200 Content-Type: application/json
```

```json
{
    "success": true,
    "info": "Activity added successfully",
    "activity": {
        "id": "5c8488f0b5b26d0aaf831060"
    }
}
```


#### Example Unsuccessful Response:
```json
{
    "success": false,
    "user": false,
    "info": "No auth token"
}
```

## Attend an Activity

### Request

```
POST /activities/activity/attend/:id
```

This endpoint will add a user specified by the authorization header to the list of attendees.

#### Example Request

```javascript
PUT /activities/activity/attend/5c86bfe25c965c1b8a91c6f4
```

**Note that this endpoint DOES require authorization.**

#### Example Successful Response

```
HTTP 200 Content-Type: application/json
```

```json
{
    "success": true,
    "info": "Activity successfully attended.",
    "activity": {
        "id": "5c86bfe25c965c1b8a91c6f4"
    }
}
```

#### Example Unsuccessful Response:
```json
{
    "success": false,
    "info": "Database error. \nCastError: Cast to ObjectId failed for value \"5c86bfe25c965c1b8a91c6fk\" at path \"_id\" for model \"activity\""
}
```

## unAttend an Activity

### Request

```
POST /activities/activity/unattend/:id
```

This endpoint will remove a user specified by the authorization header from the list of attendees.

#### Example Request

```javascript
PUT /activities/activity/unattend/5c86bfe25c965c1b8a91c6f4
```

**Note that this endpoint DOES require authorization.**

#### Example Successful Response

```
HTTP 200 Content-Type: application/json
```

```json
{
    "success": true,
    "info": "Activity successfully unattended.",
    "activity": {
        "id": "5c86bfe25c965c1b8a91c6f4"
    }
}
```

#### Example Unsuccessful Response:
```json
{
    "success": false,
    "info": "Database error. \nCastError: Cast to ObjectId failed for value \"5c86bfe25c965c1b8a91c6fk\" at path \"_id\" for model \"activity\""
}
```
