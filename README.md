### Docker
- Build docker image: 
    - `$ docker build -t esanchez-devel-blog/esanchez-devel-blog-app .`
- Run docker container:
    - `$ docker run --name elrincondeesanchez -p4200:4200 --network esanchez-devel-blog -d esanchez-devel-blog/esanchez-devel-blog-app:latest`

### Mongo DB
- Pull the mongo image:
    - `$ docker pull mongo:latest`

-Create volume to store the data:
    - `$ docker volume create esanchez-devel-blog-data`

- Run the mongo server:
    - `$ docker run -d --restart always --name mongodb-server -p 27017:27017 --network esanchez-devel-blog -v esanchez-devel-blog-data:/data/db -e MONGO_INITDB_ROOT_USERNAME="your_user" -e MONGO_INITDB_ROOT_PASSWORD="your_password" mongo:latest`

### Tools:
1. bcrypt generator:
    - https://bcrypt-generator.com/
    
