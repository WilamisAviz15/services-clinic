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

INSERT INTO application_user(username, password, userType) VALUES ('admin', crypt('admin', 'secret'), 'administrador')
INSERT INTO application_medical_services(name, value, duration) VALUES ('Clinico Geral', '60.00', 10)