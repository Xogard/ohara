create domain ty_telefone as varchar(20);

create table t_endereco(

endereco_id 	integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
logradouro  	varchar(255),
complemento		varchar(100),
cep				varchar(8),
bairro			varchar(20),
cidade			varchar(20),
estado			varchar(20));




CREATE TABLE t_cliente (
	cliente_id 		integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	nome			varchar(100) not null,
	dt_nascimento	date,
	cpf				varchar(11),	
	rg				varchar(14),
	orgao_Exp		varchar(10),
	endereco_id		integer REFERENCES t_endereco(endereco_id),
	email			varchar(50),	
	fone			ty_telefone,
	celular			ty_telefone

);