SELECT
  "Lernziel"."Ziel" AS "Lernziel", AVG("Ergebnis"."prozent")
FROM
  "Ergebnis"
    INNER JOIN "Lernziel" ON "Ergebnis"."lernziel" = "Lernziel"."ID"
GROUP BY
   "Lernziel"."Ziel"