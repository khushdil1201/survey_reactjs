import React, { useState, useEffect } from 'react';
import './SurveyResultsPage.css';
import '../App.css'
const SurveyResultsPage = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const storedUserAnswers = localStorage.getItem('userAnswers');
        if (storedUserAnswers) {
            setUserAnswers(JSON.parse(storedUserAnswers));
        }
    }, []);

    const handleDelete = (email) => {
        const updatedUserAnswers = userAnswers.filter(user => user.email !== email);
        setUserAnswers(updatedUserAnswers);
        localStorage.setItem('userAnswers', JSON.stringify(updatedUserAnswers));
        setSelectedUser(null); 
    };

    return (
        <div className="App">
        <header className="App-header">
            <p>
            Медицинский опросник
            </p>
            
        </header>
        <div>
            <h2>Результаты опроса</h2>
            <div className="user-results">
                {userAnswers.map((user, index) => (
                    <div key={index} className="user-result">
                        <p>Email: {user.email}</p>
                        {selectedUser === user.email ? (
                            <div className="user-details">
                                <h3>Результаты пользователя</h3>
                                <ul>
                                    {Object.entries(user.answers).map(([questionId, answer]) => (
                                        <li key={questionId}>{`${questionId}: ${answer}`}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                        <div className="user-actions">
                            <button onClick={() => setSelectedUser(selectedUser === user.email ? null : user.email)} className="btn">
                                {selectedUser === user.email ? 'Скрыть' : 'Подробно'}
                            </button>
                            <button onClick={() => handleDelete(user.email)} className="btn">Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default SurveyResultsPage;
