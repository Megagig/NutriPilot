// Quick test script to verify Gemini AI is working
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        console.log('Testing Gemini AI connection...\n');
        
        if (!process.env.GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY not found in .env file');
            process.exit(1);
        }
        
        console.log('✅ API Key found');
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
        console.log('✅ Model initialized');
        console.log('📡 Sending test request...\n');
        
        const result = await model.generateContent('Say "Hello, NutriPilot!" in a friendly way.');
        const response = await result.response;
        const text = response.text();
        
        console.log('✅ Response received:');
        console.log('---');
        console.log(text);
        console.log('---\n');
        console.log('🎉 Gemini AI is working correctly!');
        
    } catch (error) {
        console.error('❌ Error testing Gemini AI:');
        console.error(error.message);
        process.exit(1);
    }
}

testGemini();
