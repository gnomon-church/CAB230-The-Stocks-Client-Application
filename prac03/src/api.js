import { useState, useEffect } from 'react';

const API_KEY = '9a693bb5e6d54221bcd9455eff8587f1';

export function useNewsArticles() {
    const [loading, setLoading] = useState(true);
    const [headlines, setHeadlines] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            getHeadlines().then((headlines) => {
                setHeadlines(headlines);
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
        },

        []
    );

    return {
        loading,
        headlines,
        error,
    };
}

export function getHeadlines() {
    let url = 'http://newsapi.org/v2/top-headlines?country=au&apiKey=' + API_KEY;

    return fetch(url)
        .then((res) => res.json())
        .then((res) => res.articles)
        .then((articles) =>
            articles.map((article) => ({
                title: article.title,
                url: article.url,
            })),
        );
}