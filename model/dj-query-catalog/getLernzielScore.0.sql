SELECT
  "Lernziel"."ID" AS "Lernziel", "Fachbereich"."ID" as "Fachbereich", "Ergebnis"."feedback" AS "Feedback", "Ergebnis"."prozent" AS "Ergebnis in Prozent"
FROM
  "Lernziel"
    INNER JOIN "Fachbereich" ON "Lernziel"."Fachbereich" = "Fachbereich"."ID"
    INNER JOIN "Ergebnis" ON "Lernziel"."ID" = "Ergebnis"."lernziel"