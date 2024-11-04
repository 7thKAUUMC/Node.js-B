export const getReviewDto = (body) => {
  return {
    userId: body.userId,
    sortBy: body.sortBy,
    page: body.page,
    pageSize: body.pageSize
  };
 };