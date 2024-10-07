SELECT
  "Ergebnis"."lernziel", "Lernziel"."Fachbereich", "Ergebnis"."prozent", "Ergebnis"."email", "Ergebnis"."reset"
FROM
  "Ergebnis"
    INNER JOIN "Lernziel" ON "Ergebnis"."lernziel" = "Lernziel"."ID"
WHERE
  "Ergebnis"."email" = 'admin@localhost' AND "Ergebnis"."reset" = 'false'
ORDER BY
   "Ergebnis"."ID"