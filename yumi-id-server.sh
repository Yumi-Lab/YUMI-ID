#!/bin/bash

# GitHub repository URL
REPO_URL="git@github.com:Yumi-Lab/YUMI-ID.git"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git and run the script again."
    exit 1
fi

# Clone the repository
git clone "$REPO_URL" || { echo "Failed to clone the repository."; exit 1; }

# Move to the repository directory
cd YUMI-ID || { echo "Failed to change directory to YUMI-ID."; exit 1; }

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js and run the script again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm and run the script again."
    exit 1
fi

# Install project dependencies
npm install || { echo "Failed to install project dependencies."; exit 1; }

# Start the server with pm2
pm2 start "$(pwd)/node_modules/.bin/nodemon" --name "YUMI-ID"

# Inform the user about the successful setup
echo "The setup was successful!"
echo "The server has been started using PM2."

# Provide instructions for the user
echo "To manage the server with PM2, you can use commands like 'pm2 status', 'pm2 logs YUMI-ID', etc."

