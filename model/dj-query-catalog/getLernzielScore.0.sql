SELECT
  AVG("Ergebnis"."prozent") AS "durchschnittlicher_score"
FROM
  "Ergebnis"
WHERE
  "Ergebnis"."lernziel" = ${lernziel};