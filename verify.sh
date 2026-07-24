#!/bin/bash

echo "🔍 Verifying NIKOO Art Studio..."
echo ""

echo "1. Checking TypeScript..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "   ✅ TypeScript: No errors"
else
    echo "   ❌ TypeScript: Errors found"
    exit 1
fi

echo ""
echo "2. Building project..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Build: Successful"
else
    echo "   ❌ Build: Failed"
    exit 1
fi

echo ""
echo "✨ All checks passed!"
echo ""
echo "🎉 Site is ready to run!"
echo "   Run: npm run dev"
echo "   Then open: http://localhost:3000"
