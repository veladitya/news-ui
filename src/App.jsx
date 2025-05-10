import React, { useState, useEffect } from 'react';
import './App.css';

const NewsCard = ({ article }) => {
    const openArticle = () => {
        window.open(article.link || '#', '_blank');
    };

    return (
        <div className="news-card flex justify-between items-start p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <div className="news-content">
                <p className="date">{article.publishedDate ? new Date(article.publishedDate).toDateString() : 'Unknown Date'}</p>
                <h2 className="title cursor-pointer" onClick={openArticle}>{article.title || 'Untitled'}</h2>
                <p className="description cursor-pointer" onClick={openArticle}>{article.description || 'No description available'}</p>
            </div>
            {article.mediaUrl ? <img onClick={openArticle} src={article.mediaUrl} alt="news" className="news-image cursor-pointer" /> :
                <img onClick={openArticle} src="https://static01.nyt.com/images/2025/05/02/multimedia/00mercedes-battery-01-zmwt/00mercedes-battery-01-zmwt-mediumSquareAt3X.jpg"
                     alt="news" className="news-image cursor-pointer" />}
        </div>
    );
};

const Header = ({ toggleLanguage }) => {
    return (
        <div className="header fixed top-0 z-50 bg-white shadow-md p-4 w-full flex justify-between items-center gap-4">
            <span className='header-date'>{new Date().toDateString()}</span>
            <div className="header-title text-center">The New York Times</div>
            <div className="language-toggle text-sm text-blue-600 cursor-pointer">
                <span onClick={() => toggleLanguage('ENG')}>ENG</span> | <span onClick={() => toggleLanguage('ESP')}>ESP</span>
            </div>
        </div>
    );
};

const App = () => {
    const [language, setLanguage] = useState('ENG');
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/news')
            .then((res) => res.json())
            .then((data) => setArticles(data?.content || []))
            .catch(() => setArticles([]));
    }, []);

    const toggleLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className="app-container bg-gray-100 pt-20 p-6">
            <Header toggleLanguage={toggleLanguage} />
            <div className="news-list grid gap-4">
                {articles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </div>
        </div>
    );
};

export default App;