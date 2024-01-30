// controllers/reviewsController.js
import { randomUUID } from "node:crypto";
import data from "../../data/index.js";

let reviews = data.reviews;

export const createReview = (req, res) => {
  const { user } = req.params;
  const { rate, comment, bookId } = req.body;

  const newReview = {
    id: reviews.length + 1,
    book: bookId,
    user,
    rate,
    comment,
    created_at: new Date(),
    uuid: randomUUID(),
  };

  return res.status(200).json(newReview);
};

export const getReviewsByBookId = (req, res) => {
  const id = Number(req.params.bookId);
  const listFiltered = reviews.filter((review) => review.book === id);
  return res.status(200).json(listFiltered);
};

export const updateReview = (req, res) => {
  const id = Number(req.params.id);
  const { rate, comment } = req.body;

  const newList = reviews.map((review) =>
    review.id === id ? { ...review, rate, comment } : review
  );

  reviews = newList;
  return res.status(200).json(reviews);
};

export const deleteReview = (req, res) => {
  const id = Number(req.params.id);
  const listFiltered = reviews.filter((review) => review.id !== id);
  reviews = listFiltered;
  return res.status(204).end();
};
