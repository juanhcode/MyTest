CREATE TABLE USUARIO (
	ID SERIAL PRIMARY KEY NOT NULL,
	Nombre VARCHAR(32) NOT NULL,
	Correo VARCHAR(64) NOT NULL,
	Foto VARCHAR(512),
	Contrasenia VARCHAR(32) NOT NULL,
	Rol VARCHAR(32) NOT NULL,
);
	
CREATE TABLE PERMISO (
	ID SERIAL PRIMARY KEY NOT NULL,
	Nombre VARCHAR(32)
);

CREATE TABLE PERMISO_USUARIO (
	Usuario_ID INT,
	Permiso_ID INT,
	PRIMARY KEY (Usuario_ID, Permiso_ID),
	FOREIGN KEY (Usuario_ID) REFERENCES USUARIO(ID),
	FOREIGN KEY (Permiso_ID) REFERENCES PERMISO(ID)
);

CREATE TABLE CASO_DE_PRUEBA (
	ID SERIAL PRIMARY KEY NOT NULL,
	Nombre VARCHAR(128) NOT NULL,
	Descripcion VARCHAR(256),
	Pasos_a_seguir VARCHAR(512),
	Prioridades VARCHAR(256),
	Fecha_inicio DATE,
	Fecha_limite DATE,
	Datos_de_prueba VARCHAR(256),
	Expectativas VARCHAR(256),
	Usuario_ID INT,
	FOREIGN KEY (Usuario_ID) REFERENCES USUARIO(ID)
);

CREATE TABLE INFORME(
	ID SERIAL PRIMARY KEY NOT NULL,
	Estadistica_de_errores INT,
	Metricas_de_calidad VARCHAR(256),
	Cobertura_de_pruebas INT,
	Caso_de_prueba_ID INT,
	FOREIGN KEY (Caso_de_prueba_ID) REFERENCES CASO_DE_PRUEBA(ID)
);

CREATE TABLE SEGUIMIENTO_DE_ERROR (
	ID SERIAL PRIMARY KEY NOT NULL,
	Error_priorizado VARCHAR(128),
	Nombre_error VARCHAR(128),
	Caso_de_prueba_ID INT,
	FOREIGN KEY (Caso_de_prueba_ID) REFERENCES CASO_DE_PRUEBA(ID)
);

CREATE TABLE RESULTADO_PRUEBA(
	ID SERIAL PRIMARY KEY NOT NULL,
	Casos_no_ejecutados VARCHAR(128),
	Fallos VARCHAR(128),
	Exitos VARCHAR(128),
	Captura_de_pantalla VARCHAR(512),
	Registros VARCHAR(256),
	Caso_de_prueba_ID INT,
	FOREIGN KEY (Caso_de_prueba_ID) REFERENCES CASO_DE_PRUEBA(ID)
);