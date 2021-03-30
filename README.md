# Je Petr online?
[![Netlify Status](https://api.netlify.com/api/v1/badges/74d810d3-2f1a-4b83-bccb-c9ef509da475/deploy-status)](https://app.netlify.com/sites/jepetronline/deploys)

[Zjistit!](https://jepetr.online/)

## How to run
### Frontend
1. ```cd frontend && hugo --gc --minify```
1. Copy content of `frontend/public` to root of your web server.

### Backend
#### Nodejs
1. Setup Nodejs enviroment ```cd backend/nodejs && npm i```
1. Copy & edit config ```cp config.sample config.js```
1. Run node process ```node .``` You should use [pm2](https://pm2.keymetrics.io/)
1. Setup reverse proxy like nginx.