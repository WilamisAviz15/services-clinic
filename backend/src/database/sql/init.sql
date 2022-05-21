CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';
CREATE EXTENSION IF NOT EXISTS 'pgcrypto';


CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    userType VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)

CREATE TABLE IF NOT EXISTS application_medical_services(
    uuid uuid DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    value VARCHAR NOT NULL,
    duration INT NOT NULL,
    PRIMARY KEY (uuid)
)

CREATE TABLE IF NOT EXISTS application_medical_appointment(
    uuid uuid DEFAULT uuid_generate_v4(),
    userId uuid,
    medicalServiceId uuid,
    PRIMARY KEY (uuid),
    FOREIGN KEY (userId) REFERENCES "application_user" (uuid),
    FOREIGN KEY (medicalServiceId) REFERENCES "application_medical_services" (uuid)
);

INSERT INTO application_user(username, password, userType) VALUES ('admin', crypt('admin', 'secret'), 'administrador')
INSERT INTO application_medical_services(name, value, duration) VALUES ('Clinico Geral', '60.00', 10)
INSERT INTO application_medical_appointment(userId, medicalServiceId) 
VALUES ('f90bf00e-c06e-4f36-89ea-298e93a085e7', '51115469-3238-4bb8-a874-03480564d4c2')