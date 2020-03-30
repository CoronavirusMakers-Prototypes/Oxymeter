docker exec $(docker ps | grep "postgres" | awk '{ print $1}') pg_dump -U postgres doomy > database_dump_$(date '+%Y-%m-%d-%H-%M-%S').sql
