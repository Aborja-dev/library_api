import { createConnection } from "./db/connection";
import { runApp } from "./server";

const start = async () => {
    await createConnection()
    runApp({ port: 3000 })
}

start()