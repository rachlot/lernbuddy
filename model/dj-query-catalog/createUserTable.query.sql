create table "User" (
  "ID" serial primary key,
  email text,
  version text,
  zeit timestamp,
  reset boolean
)