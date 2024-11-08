Variantes:
--------
njs-news : avec mongoose et avec standalone_jwt
njs-news2 : avec typeorm/MongoDB et oauth2/oidc via passport
njs-bank : avec typeorm/MySQL/mariaDB
================================
npm i -g @nestjs/cli
nest new project-name --strict
====================
npm install -s @nestjs/swagger

npm install -s @nestjs/serve-static

npm install -s class-transformer
npm install -s class-validator

====================

npm install --save --legacy-peer-deps bcrypt
npm install --save-dev --legacy-peer-deps @types/bcrypt

 npm install --save --legacy-peer-deps @nestjs/jwt


npm install --save --legacy-peer-deps @automapper/core @automapper/classes @automapper/nestjs @automapper/types
=====
NB: MongoDB est accessible via mongoose avec un code adapté (variante njs-news)
njs-news = projet nestjs avec MongoDB , mongoose et news-api

npm install -s @nestjs/mongoose mongoose

=============================================
NB: MongoDB est accessible via type-orm mais avec beaucoup de limitations (variante njs-news2)
njs-news2 = projet nestjs avec MongoDB , typeorm et news-api

npm install -s @nestjs/typeorm typeorm mongodb
====================

njs-bank = projet nestjs avec mysql , typeorm et bank-api (Customer, account , …)

npm install -s @nestjs/typeorm typeorm mysql2
