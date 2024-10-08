SELECT
  AVG("Ergebnis"."prozent") AS "Gesamtfortschritt in Prozent"
FROM
  "Ergebnis"
    INNER JOIN "Lernziel" ON "Ergebnis"."lernziel" = "Lernziel"."ID"
WHERE
  "Ergebnis"."email" = ${user}