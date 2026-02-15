import http from "http";
import app from "./app";
import { connectDB } from "./config/db";


async function startServer() {
    await connectDB();

    const server = http.createServer(app);

    // Listen on all network interfaces (0.0.0.0) to allow external connections
    const host = '0.0.0.0';
    const port = Number(process.env.PORT) || 5000;

    server.listen(port, host, () => {
        console.log(`Server running on http://${host}:${port}`);
        console.log(`Local: http://localhost:${port}`);
        console.log(`Network: http://192.168.8.167:${port}`);
    });
}

startServer().catch((error) => {
    console.error("Error starting server", error);
    process.exit(1);
});
