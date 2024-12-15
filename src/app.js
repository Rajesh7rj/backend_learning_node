// Importing necessary modules
import express from "express";          // Imports the Express.js library, a web framework for Node.js.
import cors from "cors";                // Imports the CORS (Cross-Origin Resource Sharing) middleware to handle cross-origin requests.
import cookieParser from "cookie-parser"; // Imports the cookie-parser middleware to parse cookies sent with HTTP requests.

const app = express();                // Creates an instance of an Express app. This is the core of the web application.

app.use(cors({
    origin: process.env.CROSS_ORIGIN,  // Configures CORS to allow requests only from the domain specified in the environment variable `CROSS_ORIGIN`.
    credentials: true                  // Enables cookies and other credentials to be sent with cross-origin requests.
}));

// Middleware to parse incoming JSON requests with a size limit of 16KB
app.use(express.json({limit: "16kb"})); // Configures Express to parse incoming JSON requests with a body size limit of 16 kilobytes.

// Middleware to parse incoming URL-encoded data (e.g., from HTML forms)
app.use(express.urlencoded({extended: true})); // This enables parsing of data from URL-encoded forms, and the `extended: true` option allows for rich objects and arrays to be encoded.

app.use(express.static("public"));     // Serves static files (e.g., images, CSS, JavaScript) from the "public" directory. This is useful for delivering assets like HTML files.

app.use(cookieParser());               // Enables the parsing of cookies sent with incoming requests, making it easier to access cookies via `req.cookies`.

export { app };                        // Exports the Express app instance so it can be used elsewhere (likely in a server or router file).
