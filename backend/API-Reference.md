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
Updated to return only activities that are still active or havent happened yet.
Uses current time of call to endpoint to return only activities that havnt happened as of time of call.

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
	"title": "WWW3",
	"location": "Mars"
	
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
PUT /activities/activity/attend/:id
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
PUT /activities/activity/unattend/:id
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

## Sort activity

### Request

```
GET /activities/activity/sortBy/:category
```

This endpoint will return a list of sorted activities based on the category provided by the user.

**Note that this endpoint DOES require authorization.**

#### Example Successful Response

```json
{
    "success": true,
    "info": "Successfully retrieved all activities",
    "activities": [
        {
            "attendance_list": [],
            "datetime_created": "2019-03-05T01:12:05.128Z",
            "_id": "5c836d65303f740df6e55989",
            "activity_datetime": "2019-04-28T06:13:00.000Z",
            "category": "ART",
            "description": "Lets talk Basquiat",
            "max_attendance": 4,
            "title": "Basquiat chat",
            "location": "swimming pool"
        }
}
```

## User's attending / attended activities

### Request

```
GET users/user/activities/attending
```

This endpoint will return a list of activities that the user has attended or is going to attend.


#### Example Successful Response

```json
{
    "success": true,
    "info": "Found activities that the user is interested in...",
    "activities": [
        {
            "attendance_list": [
                "5c8acdaee5940c479a0d305f"
            ],
            "datetime_created": "2019-03-05T01:12:35.612Z",
            "_id": "5c836d65303f740df6e5598f",
            "activity_datetime": "2019-12-04T19:13:00.000Z",
            "category": "SPORTS",
            "description": "Lets play some soccer",
            "max_attendance": 2,
            "title": "CR7",
            "location": "camp nou"
        }
    ]
}
```


```
GET /user/activities/activity/attendanceList/5c86bfe25c965c1b8a91c6f4
```

This endpoint will return a list of Users who have added their names to attend an event.


#### Example Successful Response

```json
{
    "success": true,
    "info": "Details of the user's activities sucessfully retrieved.",
    "users": [
        {
            "Name": "ynka",
            "Email": "yinka@myumanitoba.ca"
        },
        {
            "Name": "whatsup",
            "Email": "supman@myumanitoba.ca"
        }
    ]
}
```

```
GET /activity/sortByTime
```
**Note that this endpoint does not require authorization.**
**Returns the activities sorted in accending order by time.**
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
            "attendance_list": [
                "5c97a3b8c7c41320ba3ddaf3"
            ],
            "datetime_created": "2019-03-24T02:04:19.694Z",
            "_id": "5c97cf76c7c41320ba3ddb02",
            "category": "SPORTS",
            "activity_datetime": "2019-03-27T08:35:00.000Z",
            "max_attendance": 1,
            "description": "82849",
            "title": "WEB TEST2",
            "location": "LINUX LAB",
            "__v": 0
        },
        {
            "attendance_list": [
                "5c97a3b8c7c41320ba3ddaf3",
                "5c959857ac6b4f41fd32357e",
                "5c97ce54c7c41320ba3ddb01"
            ],
            "datetime_created": "2019-03-24T02:04:19.694Z",
            "_id": "5c97acbfc7c41320ba3ddaf5",
            "category": "SPORTS",
            "activity_datetime": "2019-03-29T07:40:00.000Z",
            "max_attendance": 5,
            "description": "rtyuio",
            "title": "testing",
            "location": "avm",
            "__v": 0
        },
        ...
    ]
}
```