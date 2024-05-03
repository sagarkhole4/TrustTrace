export const pagination = (
  pageSize: number,
  page: number,
): {
  skip?: number;
  take?: number;
} => {
  const query: {
    skip?: number;
    take?: number;
  } = {};
  if (pageSize && (page || 0 === page)) {
    query.skip = page * pageSize;
    query.take = pageSize;
  } else {
    query.skip = 0;
    query.take = 1000;
  }
  return query;
};


export const isJson = (str): boolean => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
};

