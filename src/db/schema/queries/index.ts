import { QueryTypes } from "sequelize"
import { sequelize } from "../../config"



export const insertGenre = async ([user, genre]: any) => {
    const query = 
    `insert into user_genres (UserId,  GenreId )
     values (?, ?);`
    await sequelize.query(query, {
      replacements: [user, genre],
      type: QueryTypes.INSERT
    })
   }