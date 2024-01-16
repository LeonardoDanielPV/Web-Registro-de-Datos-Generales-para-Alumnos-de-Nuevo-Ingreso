CREATE DATABASE datos_generales_alumnos_n_i;

USE datos_generales_alumnos_n_i;

-- Grupo

CREATE TABLE grupo (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45),
    horario_inicio_examen_diagnostico DATETIME NOT NULL,
    horario_fin_examen_diagnostico DATETIME NOT NULL,
    laboratorio INT NOT NULL) ENGINE InnoDB;

-- Controladores

CREATE TABLE usuario (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    correo_electronico VARCHAR(45) NOT NULL UNIQUE,
    clave VARCHAR(45) NOT NULL,
    tipo VARCHAR(45) NOT NULL) ENGINE InnoDB;

-- Administrador

CREATE TABLE administrador (
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    correo_electronico VARCHAR(45) NOT NULL UNIQUE,
    nombres VARCHAR(45) NOT NULL,
    apellido_paterno VARCHAR(45) NOT NULL,
    apellido_materno VARCHAR(45) NOT NULL,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE InnoDB;

-- Alumno

CREATE TABLE identidad (
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    nro_boleta VARCHAR(45) NOT NULL UNIQUE,
    nombres VARCHAR(45) NOT NULL,
    apellido_paterno VARCHAR(45) NOT NULL,
    apellido_materno VARCHAR(45) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(45) NOT NULL,
    curp VARCHAR(45) NOT NULL,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE InnoDB;

CREATE TABLE contacto (
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    correo_electronico VARCHAR(45) NOT NULL UNIQUE,
    calle_nro VARCHAR(45) NOT NULL,
    colonia VARCHAR(45) NOT NULL,
    alcalida VARCHAR(45) NOT NULL,
    cp INT,
    nro_telefono_celular VARCHAR(45),
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE InnoDB;

CREATE TABLE procedencia (
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    escuela VARCHAR(45) NOT NULL,
    entidad_federativa VARCHAR(45) NOT NULL,
    promedio VARCHAR(45) NOT NULL,
    nro_opciones VARCHAR(45) NOT NULL,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE InnoDB;

CREATE TABLE salud (
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    condicion_salud VARCHAR(45) NOT NULL,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE InnoDB;

CREATE TABLE asignacion (
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    grupo_id INT UNSIGNED,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (grupo_id) REFERENCES grupo(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE InnoDB;

-- Cuenta de administrador

INSERT INTO usuario(correo_electronico, clave, tipo)
    VALUES("admin@proyecto.com", "secret", "administrador");

INSERT INTO administrador
    VALUES(1, "admin@proyecto.com", "Leonardo Daniel", "Pérez", "Velázquez");
    