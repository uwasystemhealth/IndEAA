# Database Support Scripts
These are scripts that helps in the development whenever data is involved and needs to be filled in the database.

This can be found under `server/support/*`

## How to use?

### Connect to the docker container
Connect to the docker container by typing this command

```
docker exec -it indeaa_server bash
```

??? info "What does this command do?"
    This executes a bash script in the docker container that can receive commands

### Execute Script
When you are inside the docker container, use the scripts by the following command

```
node support/[scriptName]
```

eg.

```
node support/insertSampleCourses.js
```

???+ info "support/index.js"
    This file will execute all the sample scripts. For ease of use of setup for development.
    ```
    node support/index.js
    ```

## Adding more scripts

1. Create your own script
2. Import the script to `index.js` by adding this line

```js
_ = require("./SCRIPTNAME")
```