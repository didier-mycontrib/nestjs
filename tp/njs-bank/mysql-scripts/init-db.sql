CREATE DATABASE IF NOT EXISTS nestJsBankDb;
USE nestJsBankDb;

DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS account;

CREATE TABLE customer(
    id integer auto_increment,
	firstname VARCHAR(64),
	lastname VARCHAR(64),
	PRIMARY KEY(id));

CREATE TABLE account(
    num integer auto_increment,
	label VARCHAR(64),
	balance double,
	customer_id integer,
	PRIMARY KEY(num));

ALTER TABLE account ADD CONSTRAINT valid_customer_id 
FOREIGN KEY (customer_id) REFERENCES customer(id);	

###################### insertions ###########################################

INSERT INTO customer(id,firstname,lastname) VALUES (1,'Alain','Therieur');	
INSERT INTO customer(id,firstname,lastname) VALUES (2,'Jean','Bon');	
	
INSERT INTO account(num,label,balance,customer_id) 
    VALUES (1,'compte 1',600,1);
INSERT INTO account(num,label,balance,customer_id)
     VALUES (2,'compte 2',500,1);
INSERT INTO account(num,label,balance,customer_id) 
     VALUES (3,'compte 3',200,2);

###################### VERIF ###########################################
show tables;
SELECT * FROM account;
SELECT * FROM customer;
