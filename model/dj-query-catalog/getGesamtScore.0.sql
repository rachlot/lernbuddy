SELECT
  ROUND(AVG("Ergebnis"."prozent")) AS "Gesamtfortschritt (%)"
FROM
  "Ergebnis"
  INNER JOIN "Lernziel" ON "Ergebnis"."lernziel" = "Lernziel"."ID"
WHERE
  "Ergebnis"."email" = ${user}