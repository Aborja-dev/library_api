import { runApp } from "./server";
import { startDB } from "@db/connection";
const start = async () => {
    await startDB({seedDB: false})
    runApp({ port: 3000 })
}
start()