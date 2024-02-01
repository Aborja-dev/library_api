export interface UserModel {
    username: string
    password: string
    name: string
    news: boolean
    frequency: number
}

export interface IBookModel {
  title: string
  author: string,
  pages: number,
  summary: string,
  rating: number,
  created_at: Date
}

export interface IReviewModel {
    rate: number,
    comment: string,
    created_at: number
    unique: string
}

export type ConecctionConfig = {
  force: boolean
}