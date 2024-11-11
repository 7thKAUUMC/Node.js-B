export const bodyToReview = (body) => {
    return {
        storeId: body.storeId,
        userId: body.userId,
        regionId: body.regionId,
        body: body.body || "",
        score: body.score
    };
};

export const responseFromReview = (review) => {
    return {
        id: review.id,
        storeId: review.storeId,
        userId: review.userId,
        body: review.body || "", 
        score: review.score,
        createdAt: review.createdAt
    };
};