#!/bin/bash

echo "🚀 Starting NIKOO Art Studio..."
echo ""
echo "Checking Node.js version..."
node --version

echo ""
echo "Installing dependencies if needed..."
npm install

echo ""
echo "🎨 Starting development server..."
echo "📌 Open http://localhost:3000 in your browser"
echo ""

npm run dev
