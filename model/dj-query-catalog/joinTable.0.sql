SELECT
  "Ergebnis"."lernziel", "Lernziel"."Fachbereich", "Ergebnis"."prozent"
FROM
  "Ergebnis"
    INNER JOIN "Lernziel" ON "Ergebnis"."lernziel" = "Lernziel"."ID"
ORDER BY
   "Ergebnis"."ID";