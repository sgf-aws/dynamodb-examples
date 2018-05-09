#Dynamo demo

Creates a stack of dynamo tables and lambda functions to demonstrate basic operations using dynamo, streams, ttl, and auto scaling

#Setup
```console
npm install
```

#Deploy stack
```console
npm run cloudformation:package
```

```console
npm run cloudformation:deploy
```

#Optional load some fake data into tables
```console
node src/user/load.js
```

```console
node src/post/load.js
```

#Usage
```console
node src/user/put.js foo
```

```console
node src/user/put.js foo
```

```console
node src/user/update.js bar
```

```console
node src/follow/put.js foo bar
```

```console
node src/post/put.js bar some-uuid
```

```console
node src/user_feed/query.js foo
```

#Clean up
```console
npm run cloudformation:delete
```
You will also need to manually clean up cloudwatch logs
