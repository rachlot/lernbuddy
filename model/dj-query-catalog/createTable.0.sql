create table "Ergebnis" (
  "ID" serial primary key,
  lernziel text,
  paper text,
  frage text,
  antwort text,
  feedback text,
  prozent int,
  email text,
  zeit timestamp,
  reset boolean
)
