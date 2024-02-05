
import { List } from './models/List.schema';
import { Review } from './models/Reviews.schema';
import { Book } from './models/Book.schema';
import { Genre } from './models/Genre.schema';
import { User } from "./models/User.schema";
import { BookList } from './models/BookList.schema';

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

User.hasMany(List, {
    foreignKey: 'fk_user'
})
List.belongsTo(User, {
    foreignKey: 'fk_user'
})

User.hasMany(List, {
    foreignKey: 'fk_user'
})
List.belongsTo(User, {
    foreignKey: 'fk_user'
})

User.belongsToMany(Genre, {through: 'user_genres', timestamps: false})
User.belongsToMany(Book, {through: 'user_books', timestamps: false})

Book.belongsToMany(User, { through: 'user_books', timestamps: false })
Book.belongsToMany(Genre, { through: 'book_genre', timestamps: false })

Genre.belongsToMany(User, { through: 'user_genres', timestamps: false })
Genre.belongsToMany(Book, { through: 'book_genre', timestamps: false })

List.belongsToMany(Book, { through: BookList })
Book.belongsToMany(List, { through: BookList })

export const Entities = {
    User,
    Genre,
    Book,
    Review,
    List,
} 