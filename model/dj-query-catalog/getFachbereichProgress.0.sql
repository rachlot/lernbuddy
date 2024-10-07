SELECT
  "Fachbereich"."name" AS "fachbereich",
  COUNT("Ergebnis"."frage") AS "gesamt_fragen",
  SUM(CASE WHEN "Ergebnis"."feedback" IS NOT NULL THEN 1 ELSE 0 END) AS "beantwortete_fragen",
  SUM(CASE WHEN "Ergebnis"."feedback" IS NOT NULL THEN 1 ELSE 0 END) * 100 / COUNT("Ergebnis"."frage") AS "prozent_bearbeitet",
  AVG("Ergebnis"."prozent") AS "durchschnittlicher_score"
FROM
  "Ergebnis"
JOIN
  "Lernziel" ON "Ergebnis"."lernziel" = "Lernziel"."ID"
JOIN
  "Fachbereich" ON "Lernziel"."Fachbereich" = "Fachbereich"."ID"
WHERE
  "Fachbereich"."ID" = ${fachbereich}
GROUP BY
  "Fachbereich"."name";