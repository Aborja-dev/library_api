import { Review } from './models/Reviews.schema';
import { Book } from './models/Book.schema';
import { Genre } from './models/Genre.schema';
import { User } from "./models/User.schema";

User.hasMany(Review, {
    foreignKey: 'fk_user'
})
Review.belongsTo(User, {
    foreignKey: 'fk_user'
})
Book.hasMany(Review, {
    foreignKey: 'fk_book'
})
Review.belongsTo(Book, {
    foreignKey: 'fk_book'
})

User.belongsToMany(Genre, {through: 'user_genres', timestamps: false})
User.belongsToMany(Book, {through: 'user_books', timestamps: false})

Book.belongsToMany(User, { through: 'user_books', timestamps: false })
Book.belongsToMany(Genre, { through: 'book_genre', timestamps: false })

Genre.belongsToMany(User, { through: 'user_genres', timestamps: false })
Genre.belongsToMany(Book, { through: 'book_genre', timestamps: false })
export const Entities = {
    User,
    Genre,
    Book,
    Review
} 