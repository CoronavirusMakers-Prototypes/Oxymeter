SELECT
   pg_terminate_backend (pg_stat_activity.pid)
FROM
   pg_stat_activity
WHERE
   pg_stat_activity.datname = 'cv19makers_vitalox';  
   
DROP DATABASE cv19makers_vitalox;