SELECT
  "Lernziel"."ID"
FROM
  "Lernziel"
WHERE
  "Lernziel"."Fachbereich" = ${Fachbereich}
ORDER BY
   "Lernziel"."ID"