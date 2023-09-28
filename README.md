# nodejs-smart-sales

- Run the following commands to start server
- `npm install` to install required nodeJs dependencies
- `docker-compose up` to start nodejs started kit server

- Run the following commands to setup the mongodb docker for the first time

  - `docker exec -it smart-sales-mongodb-server bash`
  - after running the above command, run the below commands in docker bash
  - `mongosh`
  - `use STARTER_KIT` /// Existing db name is STARTER_KIT
  - `db.createUser({user:"admin",pwd:"password",roles:[{role:"readWrite",db:"STARTER_KIT"}]})`
    - mongodb has been setup successfully
  - open a new terminal execute following commands
  - `docker-compose down`
  - `docker-compose up`

- To Apply Husky code formatter by default before git commit, run the following command once during initial setup of codebase:
  - `npm install` /// Run this command if husky is not installed as a dev dependency
  - `npm run prepare`
  - Note: To use Husky Code formatter, we should have node version >=16.0

# node-starter-kit
