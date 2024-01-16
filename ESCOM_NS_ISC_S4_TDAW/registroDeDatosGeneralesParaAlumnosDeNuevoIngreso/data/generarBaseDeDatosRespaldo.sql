CREATE DATABASE datos_generales_alumnos_n_i;

USE datos_generales_alumnos_n_i;

CREATE TABLE grupo (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45),
    horario_inicio_examen_diagnostico DATETIME NOT NULL,
    horario_fin_examen_diagnostico DATETIME NOT NULL,
    laboratorio INT NOT NULL) ENGINE InnoDB;

CREATE TABLE usuario (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    correo_electronico VARCHAR(45) NOT NULL UNIQUE,
    clave VARCHAR(45) NOT NULL,
    tipo VARCHAR(45) NOT NULL) ENGINE InnoDB;

CREATE TABLE administrador (
    id INT UNSIGNED NOT NULL PRIMARY KEY,
    correo_electronico VARCHAR(45) NOT NULL UNIQUE,
    nombres VARCHAR(45) NOT NULL,
    apellido_paterno VARCHAR(45) NOT NULL,
    apellido_materno VARCHAR(45) NOT NULL,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE InnoDB;

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

INSERT INTO usuario(correo_electronico, clave, tipo)
    VALUES("admin@proyecto.com", "secret", "administrador");

INSERT INTO administrador
    VALUES(1, "admin@proyecto.com", "Leonardo Daniel", "Pérez", "Velázquez");

INSERT INTO usuario(correo_electronico, clave, tipo)
    VALUES("micorreo@gmail.com", "contraseña", "alumno");

INSERT INTO identidad
    VALUES(2, "2022630163", "Sergio", "Severete", "Rusito", "2000-01-10", "Masculino", "SERS222911HDFRLN01");

INSERT INTO contacto
    VALUES(2, "micorreo@gmail.com", "Fuentes 3", "Atizapan", "Sin especificar", "54466", "5572068868");

INSERT INTO procedencia
    VALUES(2, "CBTis 227", "Ciudad de México", "8.8", "Primera");

INSERT INTO salud
    VALUES(2, "Sin discapacidad");

INSERT INTO grupo(nombre, horario_inicio_examen_diagnostico, horario_fin_examen_diagnostico, laboratorio)
    VALUES("Grupo 1", "2024-01-16 07:00:00", "2024-01-16 08:30:00", 1);

INSERT INTO asignacion
    VALUES(2, 1);

INSERT INTO usuario(correo_electronico, clave, tipo)
    VALUES("patricia_escamilla_miranda@gmail.com", "secret12345678", "alumno");

INSERT INTO identidad
    VALUES(3, "PE55555555", "Patricia", "Escamilla", "Miranda", "2024-01-14", "Masculino", "PEVL111911HDFRLNAA");

INSERT INTO contacto
    VALUES(3, "patricia_escamilla_miranda@gmail.com", "Institución S/N", "López Mateos", "Sin especificar", "54466", "5572067760");

INSERT INTO procedencia
    VALUES(3, "CECyT 10 Carlos Vallejo Márquez", "Ciudad de México", "10", "Primera");

INSERT INTO salud
    VALUES(3, "Sin discapacidad");

INSERT INTO grupo(nombre, horario_inicio_examen_diagnostico, horario_fin_examen_diagnostico, laboratorio)
    VALUES("Grupo 2", "2024-01-16 07:00:00", "2024-01-16 08:30:00", 2);

INSERT INTO asignacion
    VALUES(3, 2);