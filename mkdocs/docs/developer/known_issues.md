# Known Issues

This section is for documenting known bugs developers may encounter and any temporary workarounds found.

## Can't log in after deleting user records from database

### Error message in terminal
```
server_1  | error: NotFound: No record found for id '6110af36a195d000504258e4'
server_1  |     at new NotFound (/app_code/node_modules/@feathersjs/errors/lib/index.js:114:17)
server_1  |     at /app_code/node_modules/feathers-mongoose/lib/service.js:147:17
server_1  |     at processTicksAndRejections (internal/process/task_queues.js:97:5)
```

### Workaround
Clear your browser's local storage for the IndEAA site.
Guide on how to do this:
[Google Chrome](https://superuser.com/questions/519628/clear-html5-local-storage-on-a-specific-page), [Firefox](https://stackoverflow.com/questions/6084099/how-to-view-delete-local-storage-in-firefox)

You can also use the site in a private browser session for a temporary fix.

### Causes
When working with IndEAA it's possible to delete a user's account from the database while they are logged in (e.g. using a tool such as Mongodb Compass).


When this user is logged out they will experience this bug.


The user's session stores their account's `_id` field in local storage (even when logged out).   
When a user attempts to log in with a given Google account, the browser will report the `_id` field which was in local storage. However, because the account was deleted from the database, the `_id` field will find no matches. This causes the error listed above.

### 
