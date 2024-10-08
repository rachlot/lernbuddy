SELECT
  "Lernziel"."Fachbereich" AS "Fachbereich", "Lernziel"."Ziel" AS "Lernziel", AVG("Ergebnis"."prozent") AS "Durchschnittlicher Prozentwert"
FROM
  "Ergebnis"
    INNER JOIN "Lernziel" ON "Ergebnis"."lernziel" = "Lernziel"."ID"
WHERE
  "Ergebnis"."email" = ${user}
GROUP BY
   "Lernziel"."Fachbereich", "Lernziel"."Ziel"
HAVING
  AVG("Ergebnis"."prozent") < 60