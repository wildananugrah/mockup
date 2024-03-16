CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table app_mst_user(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE
);

create table app_mst_user_attribute();

create table app_trx_user_role();

create table app_mst_role();

create table app_mst_role_attribute();