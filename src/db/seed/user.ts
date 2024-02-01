import { Entities } from "../schema"
import { USERS } from "../../data/sql/users.json";
import pc from "picocolors";
  export const fillUsers = async () => {
    try {
      await Entities.User.bulkCreate(USERS)
  } catch (error) {
      console.error(pc.red('ocurrio un error al insertar usuarios'))
  }
  }