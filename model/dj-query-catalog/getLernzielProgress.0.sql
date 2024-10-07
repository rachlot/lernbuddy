SELECT
  "Fachbereich"."ID" AS "Fachbereich", "Lernziel"."_dj_source", "Ergebnis"."prozent" AS "Ergebnis in Prozent"
FROM
  "Fachbereich"
    INNER JOIN "Lernziel" ON "Fachbereich"."ID" = "Lernziel"."Fachbereich"
    INNER JOIN "Ergebnis" ON "Lernziel"."ID" = "Ergebnis"."lernziel"