SELECT
  "Lernziel"."Fachbereich" AS "Fachbereich", "Ergebnis"."lernziel" AS "Lernziel", "Ergebnis"."prozent" AS "Fortschritt in Prozent", "Ergebnis"."email", "Ergebnis"."reset"
FROM
  "Ergebnis"
    INNER JOIN "Lernziel" ON "Ergebnis"."lernziel" = "Lernziel"."ID"
WHERE
  "Ergebnis"."email" = 'admin@localhost' AND "Ergebnis"."reset" = 'false'
ORDER BY
   "Ergebnis"."ID"