create table "Topic" (
  "ID" text primary key,
  "Title" text,
  "Content" text,
  "Parent" text references "Topic",
  "Lernziel" text,
  "Keyword" text
);

create table "Result" (
  "ID" serial primary key,
  "Topic" text references "Topic",
  "User" text,
  "Time" timestamp,
  "Prozent" int
)
