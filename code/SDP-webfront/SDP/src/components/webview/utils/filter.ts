export const filterEmptyValue = (data: Record<string, any>) => {
  const result: Record<string, any> = {};
  if (!data) return result;
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      result[key] = data[key];
    }
  });

  return result;
};
