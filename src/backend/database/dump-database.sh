docker exec $(docker ps | grep "postgres" | awk '{ print $1}') pg_dump -U postgres cv19makers_vitalox > cv19makers_vitalox_database_dump_$(date '+%Y-%m-%d-%H-%M-%S').sql
