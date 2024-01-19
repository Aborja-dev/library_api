const app = require("./app")
const sequelize = require("./db/sequelize/conecction")

app.listen(3000, async () => {
  // sequelize.authenticate()
  console.log('server running on port 3000')
})

