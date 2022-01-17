# MDMB-Social

## How to install MySql & MySql Workbench: [Reference Openplanning](https://openplanning.net/10221/cai-dat-co-so-du-lieu-mysql-tren-windows)

## Test Connection

- You can use either to create database: Command(Mysql server) and Gui(MySql workbench)

1. Create database

```
CREATE DATABASE TestDatabase CHARACTER SET utf8 COLLATE utf8_general_ci;
```

2. Create table

```
CREATE TABLE `TestDatabase`.`users` (
  `_id` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`_id`));
```

3. Insert value to table

```
insert into TestDatabase.users(_id, username, password) values(1, "hello world", "123")
select * from TestDatabase.users
```

4. Run command `npm install`
5. Run command `npm run withLib` or `npm run withOutLib`
