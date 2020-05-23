function buildWhere(data: object, lengthValue = 1) {
  const values: string[] = [];
  const conditions = Object.entries(data).reduce((prev, [value, key], i) => {
    values.push(key);
    return prev
      ? `${prev} AND ${`${value} = $${lengthValue + i}`}`
      : `${value} = $${lengthValue + 1}`;
  }, "");
  return {
    conditions,
    valuesWhere: values,
  };
}

export const buildUpdateQuery = (
  { tableName, where, data }: {
    tableName: string;
    where: object;
    data: object;
  },
) => {
  const set = [];
  let values = [];
  for (const [key, v] of Object.entries(data)) {
    if (key !== "id") {
      set.push(`${key} = $${set.length + 1}`);
      values.push(v);
    }
  }

  const { conditions, valuesWhere } = buildWhere(where, values.length);
  values = values.concat(...valuesWhere);

  return {
    text: `
        UPDATE ${tableName}
          SET ${set.join(", ")}
        WHERE ${conditions};
      `,
    args: values,
  };
};
