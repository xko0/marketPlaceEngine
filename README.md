voir le projet : https://somemark-marketplace.herokuapp.com/

# marketPlaceEngine
Le projet a pour but de rassembler les différentes plateformes de services.   

- Les plateformes sont présentées sous forme de carte cliquable. 
- La recherche se fait facilement à l'aide d'une barre de recherche qui comporte un filtre de champs d'activité des plateformes de service.   
- Une fois la carte choisie, celle-ci en dévoile un peu plus sur le service proposé. 
- Un lien est disponible pour se rendre directement sur le site. 
## Architecture
##### MEVN micro-service 
- MongoDB
- Express
- VueJS (Nuxt)
- NodeJS

### Outils/lib

### Charte graphique 
<img width="1440" alt="panels" src="https://user-images.githubusercontent.com/69767205/121906532-7d099580-cd2b-11eb-84f4-e01b2b55f3f4.png">

Police : Roboto Condensed

### Wireframe 

##### Desktop

#### Admin
| Home          | Create        | Update        | Delete        |
| ------------- | ------------- | ------------- | ------------- |
|<img width="285" alt="admin " src="https://user-images.githubusercontent.com/69767205/120980382-d9dade00-c776-11eb-8c6e-e324bc98c28d.png"> |<img width="285" alt="admin create" src="https://user-images.githubusercontent.com/69767205/120980390-dcd5ce80-c776-11eb-9ddf-f59880b4c218.png"> |<img width="285" alt="admin update" src="https://user-images.githubusercontent.com/69767205/120980411-e2331900-c776-11eb-8edf-d1943ce5870a.png"> |<img width="285" alt="admin delete" src="https://user-images.githubusercontent.com/69767205/120980400-dfd0bf00-c776-11eb-9b03-282097bde14d.png"> |



#### User 

| Home          | Description   |
| ------------- | ------------- |
| <img width="287" alt="userHome" src="https://user-images.githubusercontent.com/69767205/120980435-e7906380-c776-11eb-91c5-96827e7cb3b9.png"> | <img width="285" alt="userDescription" src="https://user-images.githubusercontent.com/69767205/120980422-e4957300-c776-11eb-8690-e4d7052c9921.png">

##### Mobile 

| Home          | description   |
| ------------- | ------------- |
|<img width="81" alt="userMobile" src="https://user-images.githubusercontent.com/69767205/120980972-73a28b00-c777-11eb-90d0-d068eacb436f.png">|<img width="83" alt="userMobile description" src="https://user-images.githubusercontent.com/69767205/120980978-769d7b80-c777-11eb-8f21-ecba69e0d5cf.png">

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ nodemon

# build for production and launch server
$ npm run build
$ npm run serve

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
