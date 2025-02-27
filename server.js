const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 👉 Test Route
app.get('/', (req, res) => {
    res.send('Personal Fund Manager API is running!');
});

// 👉 Route to analyze user expenses
app.post('/analyze-expenses', (req, res) => {
    const { income, expenses } = req.body;

    if (!income || !expenses) {
        return res.status(400).json({ error: 'Please provide income and expenses data.' });
    }

    const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
    const savings = income - totalExpenses;
    const advice = savings > 0 ? "Great! You're saving money!" : "You're spending more than you earn! Reduce unnecessary expenses.";

    res.json({
        income,
        totalExpenses,
        savings,
        advice
    });
});

// ✅ **Start the server (Fixed)**
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
