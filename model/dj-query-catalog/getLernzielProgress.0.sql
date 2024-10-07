SELECT
  SUM(CASE WHEN "Ergebnis"."feedback" IS NOT NULL THEN 1 ELSE 0 END) * 100 / COUNT(*) AS "prozent_bearbeitet"
FROM
  "Ergebnis"
WHERE
  "Ergebnis"."lernziel" = ${lernziel};