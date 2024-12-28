// useraction.jsx
"use server"

import connectDB from "../database/connectDB";

// This file will contain user action related functions and logic.
// It will be used to handle user actions such as login, register, etc.

export async function testServer() {
    try {
        return "hello";
    } catch (error) {
        console.error("An error occurred while testing the server:", error);
        return "Error: Server not working!";
    }
}