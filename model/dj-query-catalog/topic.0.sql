SELECT
  "Topic"."ID"
FROM
  "Topic"
WHERE
  "Topic"."Parent" = ${node}
ORDER BY
   "Topic"."ID"