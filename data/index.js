import bookssJSON from "./books.json" with { type: "json" };
import reviewsJSON from "./reviews.json" with { type: "json" };
import usersJSON from "./users.json" with { type: "json" };
import listJSON from "./lists.json" with { type: "json" };

export default {
    users: usersJSON.USERS,
    books: bookssJSON.BOOKS,
    lists: listJSON.LISTS,
    reviews: reviewsJSON.REVIEWS
}