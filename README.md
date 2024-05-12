<h1 align="center"> PROJECT BACKEND: Live Music </h1>

<p align="center">
  <img src="./public/img/title_Readme.gif" alt="Demostración de funcionalidad">
</p>


## Table of Contents :file_folder:

1. [Description :classical_building:](#description-classical_building)
2. [Stack :gear:](#stack-gear)
3. [Project :open_book:](#Project-open_book)
4. [Author :wave:](#author-wave)

---

## Description :classical_building:

Hola!! aquí está la presentación de la parte de Backend del proyecto Live Music, un lugar donde estar informad@ de las últimas novedades en festivales con tus grupos favoritos y reservar rápidamente tus entradas con la mayor comodidad.
---

## Stack :gear:

<div align="center">
<img src= "https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white"/>
<img src= "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white"/>
<img src= "https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
<img src= "https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
<img src= "https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white"/>
</div>

---

## Project :open_book:


![Diagrama](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/24f2d212-61d9-41d3-bef6-2d1f3a51cba0)


### 1 - Local Installation:

- Clonar repositorio.

- ```bash
  git clone https://github.com/jluisferrer/LiveMusic-Backend/
```
- Install all the dependencies on the project

```bash
  composer install
```
- Configura tu .env, tienes un ejemplo en el archivo .env.example.
- 
- Ejecuta tu contenedor desde docker y conecta a este desde mySQL Workbench usando las credenciales configuradas en el archivo .env

- Crea y rellena las tablas:
  
```bash
php artisan migrate 
```

```bash
php artisan db:seed 
```

- Lanza la API:
```bash
composer artisan serve
```

### 2 - Info to log

- Super_admin:

```json

  _id: 1,
  email: "super@admin.com",
  password: "admin1234",

```

- User:

```json

  _id: 2,
  email: "user@user.com",
  password: "123456",

```

### 2 - Enpoints:

1. Register and Login:

- Register:

```
localhost:8000/api/register
```

![register](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/50913fde-2aef-4244-b19e-7c917b9ffd6d)

- Login:

```
localhost:8000/api/login
```

![login](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/e21aba18-3005-4774-ac0b-63b020abf74f)


2. User:

- Get all users:

Solo super Admin:

```
localhost:8000/api/users
```
![getAllusers](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/53f997f0-6ffa-4d2b-aac6-4ca972a5d638)

- Get profile:

Need user logging

```
localhost:8000/api/users/profile
```
![getUserProfile](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/34ac975f-c976-4cf9-a604-194a37878147)

- Delete user :

Solo Super Admin
```
localhost:8000/api/users/{idUser}
```
![DeleteUser](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/68e025c8-46d9-42e2-9acf-a207f3bf435b)

- Update user :

```
localhost:8000/api/users/update
```
![updateUser](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/dcbf7875-905f-4fd4-9d23-972678214d13)

- Add to group :

```
localhost:8000/api/users/addtoGroup
```
![AddtoGroup](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/27ca5e92-f5e5-49db-a360-47422fa41a4f)


3. Events:

- Get all events:

Need user logging

```
localhost:8000/api/events
```
![GetAllEvents](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/cf4b12b0-6c66-4b6c-9960-82462c923b54)


- Create event:

Solo Super Admin

```
localhost:8000/api/events
```
![CreateEvent](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/0b8bb69e-6647-4a3d-abc7-a48bd1dd6aaa)


- Update Event:

Solo Super Admin

```
localhost:8000/api/events/{eventid}
```
![updateEvent](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/34adcca1-bbb4-4d31-b905-e3abf777e594)

- Get Event by Id:

```
localhost:8000/api/events/{eventid}
```

![GetEventId](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/c4617609-2d13-46c1-97a2-bfc2ee843860)


- Delete Event:

Solo Super Admin

```
localhost:8000/api/events/{id}
```

![DeleteEvent](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/5d891241-216c-4a8e-b5fb-65e08f04b621)


4. Groups:

- Get all groups:

Need user logging

```
localhost:8000/api/groups
```

![getAllGroups](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/c3569aae-316b-4c79-b1ac-981cf43cff78)


- Create group:

Need user logging

```
localhost:8000/api/groups
```
![createGroup](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/153c4846-a2ce-442f-a84c-2a808b99e02b)



- Update group:

Need user logging

```
localhost:8000/api/groups/{groupid}
```

![updateGroup](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/3fb8467c-5662-47b9-8e33-42b5a1b707b4)

- Get Group by Id:

Need user logging

```
localhost:8000/api/groups/{groupid}
```
![getGroupId](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/15052bd3-7de0-45c5-840c-6810dad3b872)

- Delete group:

Solo Super Admin

```
localhost:8000/api/groups/{groupid}
```

![deleteGroup](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/f7f08c13-cc42-4326-9479-55d415dc3293)



5. User Groups Events:

- Get user events:

```
localhost:8000/api/usergroupevents
```
![getuserevents](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/418bba03-8bf0-4867-ae07-4bad591a70da)


- Get group events:

```
localhost:8000/api/usergroupevents/{groupid}
```

![getGroupevents](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/b9eb740b-1b91-4143-a7a4-93ccccd3fd23)


- Join user event:

```
localhost:8000/api/usergroupevents/{userid}
```
![JoinUserEvent](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/1e80f6f7-2cfc-4b57-8a8d-ae8a16134c0e)


- Join group event:

```
localhost:8000/api/usergroupevents/{groupid}/{eventid}
```
![JoingroupEvent](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/2735df8f-8bb3-40cc-8e26-c140e8f574e4)


- Delete user event:

```
localhost:8000/api/usergroupevents/{eventid}
```
![DeleteuserEvent](https://github.com/jluisferrer/LiveMusic-Backend/assets/157707370/ef1a4bf0-2f58-4766-842d-2e43d8b85b51)


---

## Author :wave:



  ||<img src="https://github.com/jluisferrer.png" width="60px;"/>|
  |<a href="https://github.com/jluisferrer">Jose Ferrer</a>|

---

<div align="center">
<a href="#table-of-contents-file_folder">🔼 Back to top 🔼</a>
</div>
