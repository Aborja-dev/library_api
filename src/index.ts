import { createConnection } from "./db/connection";
import { seed } from "./db/seed";
import { runApp } from "./server";

const start = async (seedDb = true) => {
    await createConnection({force: seedDb})
    if (seedDb) {
        await seed()
    }
    runApp({ port: 3000 })
}
start()