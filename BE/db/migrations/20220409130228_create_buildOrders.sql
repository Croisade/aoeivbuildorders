-- migrate:up
create table buildorders
(
    id 		  serial,
    uuid 	  varchar not null unique,
    count	  integer not null,
    action	  varchar not null,
    time 	  varchar not null,
    population 	  varchar not null,
    wood 	  varchar not null,
    food 	  varchar not null,
    gold 	  varchar not null,
    stone 	  varchar not null,
    builders	  varchar not null,
    created_at   timestamptz not null default now(),
    updated_at    timestamptz not null default now()
);

create unique index buildorders_id on buildorders (id);
create unique index buildorders_uuid on buildorders (uuid);

CREATE TRIGGER buildOrders_updated_at
    BEFORE UPDATE ON buildorders 
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();
-- migrate:down
drop table buildorders

