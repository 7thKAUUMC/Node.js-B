export const bodyToReview = (body) => {
    const day = new Date(body.day);
  
    return {
        storeId: body.storeId,
        userId: body.userId,
        contents: body.contents || "",
        score: body.score,
        day,
        image: body.image || ""
    };
};

export const ResponseReview = (review) => {
    return {
        id: review.id,
        storeId: review.storeId,
        userId: review.userId,
        contents: review.contents || "",
        score: review.score,
        day,
        image: review.image || "",
        createdAt: review.createdAt
    };
};