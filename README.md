simple blog website

- microservice architecure
- blog divided to 2 services
  - user service for auth purpose
  - blog service for blod crud operations
- api gateway to proxy and redirect urls
- redis to store url hit rates and limit it
- each service has a docker image
- docker compose to spin up multiple services in containers

# Frontend
- [ ] ui
# Backend
- [x] authentication
- [x] routes, auth middlewares
- [ ] editing, deleting blogs
- [x] my blogs, view all blogs, create blogs
- [ ] implementing refreshing access token
- [ ] validation and transformation
- [ ] caching using redis
- [ ] Task queuing using redis
- [ ] elasticsearch
- [ ] error handling
- [ ] logging and monitoring
- [ ] security against injections
- [ ] scaling
- [ ] concurreny & parellelism
- [ ] object storage s3, file uploads, image uploads
- [ ] realtime systems, ws
- [ ] testing
- [ ] 12-factor principles
- [ ] third party auth
- [ ] openapi
- [ ] webhooks
- [ ] cicd

# issues
- some routes doesnt get forwarded
