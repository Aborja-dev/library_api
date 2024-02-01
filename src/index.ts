import { createConnection } from "./db/connection";
import { seed } from "./db/seed";
import { runApp } from "./server";

const start = async () => {
    await createConnection({force: false})
    // await seed()
    runApp({ port: 3000 })
}

start()