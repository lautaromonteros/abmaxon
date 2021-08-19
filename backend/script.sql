create database apirest;

use apirest;

create table personas(
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(30) NOT NULL,
    apellido varchar(50) NOT NULL,
    telefono varchar(11) NOT NULL,
    correo varchar(50) NOT NULL UNIQUE
);

