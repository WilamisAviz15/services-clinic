CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';
CREATE EXTENSION IF NOT EXISTS 'pgcrypto';


CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),    
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    user_type VARCHAR NOT NULL,
    cpf VARCHAR NOT NULL,
    fullname VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)

CREATE TABLE IF NOT EXISTS application_doctor(
    uuid uuid DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    scholarity VARCHAR NOT NULL,
    balance_to_receive VARCHAR,
    PRIMARY KEY (uuid)
)

CREATE TABLE IF NOT EXISTS application_medical_services(
    uuid uuid DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    value VARCHAR NOT NULL,
    duration INT NOT NULL,
    date VARCHAR NOT NULL,
    doctor_id uuid,
    PRIMARY KEY (uuid),
    FOREIGN KEY (doctor_id) REFERENCES "application_doctor" (uuid)
)

CREATE TABLE IF NOT EXISTS application_medical_appointment(
    uuid uuid DEFAULT uuid_generate_v4(),
    user_id uuid,
    medical_service_id uuid,
    PRIMARY KEY (uuid),
    FOREIGN KEY (user_id) REFERENCES "application_user" (uuid),
    FOREIGN KEY (medical_service_id) REFERENCES "application_medical_services" (uuid)
)

INSERT INTO application_user(username, password, userType,cpf, fullname) 
VALUES ('admin', crypt('admin', 'secret'), 'administrador', '1111111111', 'Administrador')
INSERT INTO application_doctor(name, scholarity, balance_to_receive) VALUES ('Dr. Ave Maria', 'Doutor em Medicina', '5000.00')
INSERT INTO application_medical_services(name, value, duration,date, doctor_id) VALUES ('Clinico Geral', '60.00', 10,
'Sat May 21 2022 11:42:43 GMT-0300 (Brasilia Standard Time)', 'ab27a220-8f8a-4032-99ff-f1b5a4b84425')
INSERT INTO application_medical_appointment(user_id, medical_service_id) 
VALUES ('f90bf00e-c06e-4f36-89ea-298e93a085e7', '51115469-3238-4bb8-a874-03480564d4c2')