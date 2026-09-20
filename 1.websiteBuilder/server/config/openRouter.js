import dotenv from 'dotenv';

dotenv.config();

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat";

export const generateResponse = async (prompt) => {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();

    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY is missing');
    }

    const res = await fetch(openRouterUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'system',
                    content: 'You must return ONLY valid raw json'
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.2,
        }),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error('openRouter err ' + error);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? '';
};
