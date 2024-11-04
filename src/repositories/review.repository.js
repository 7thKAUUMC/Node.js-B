import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getReviewsByUser = async (data) => {
  try {
    const orderBy = data.sortBy === 'mostStar' 
      ? { score: 'desc' }
      : { created_at: 'desc' };

    const totalItemCount = await prisma.review.count({
      where: {
        member_id: data.userId
      }
    });

    const reviews = await prisma.review.findMany({
      where: {
        member_id: data.userId
      },
      select: {
        id: true,
        store_id: true,
        score: true,
        body: true,
        created_at: true,
      },
      orderBy,
      skip: (data.page - 1) * data.pageSize,
      take: data.pageSize
    });

    console.log('Raw reviews:', reviews);

    const formattedReviews = reviews.map(review => ({
      id: review.id ? Number(review.id.toString()) : null,
      shopId: review.store_id ? Number(review.store_id.toString()) : null,
      score: review.score,
      content: review.body,
      createdAt: review.created_at
    }));

    console.log('Formatted reviews:', formattedReviews);

    const response = {
      currentPage: data.page,
      totalPages: Math.ceil(totalItemCount / data.pageSize),
      score: formattedReviews.score,
      totalItemCount,
      data: formattedReviews
    };

    console.log('Final response:', response);
    return response;

  } catch (error) {
    console.error('Error in getReviewsByUser:', error);
    const errorMessage = error.message || "Internal Server Error";
    const errorResponse = new Error(errorMessage);
    errorResponse.status = 500;
    throw errorResponse;
  }
};