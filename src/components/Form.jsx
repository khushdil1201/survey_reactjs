import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Form() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [surveyData, setSurveyData] = useState(null);
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState('');

    useEffect(() => {
        // Получаем email текущего пользователя из localStorage
        const email = localStorage.getItem('currentUserEmail');
        setCurrentUserEmail(email);

        // Проверяем, есть ли данные в localStorage
        const storedSurveyData = localStorage.getItem('surveyData');
        if (storedSurveyData) {
            setSurveyData(JSON.parse(storedSurveyData));
        } else {
            // Загрузка данных опроса (замените на ваш способ загрузки данных)
            const data = {
                "survey": {
                    "title": "Медицинский опросник",
                    "questions": [
                      {
                        "id":1,
                        "question": "Каков ваш возраст?",
                        "field_type": "текст",
                        "type_id": "возраст",
                        "correct_answer": "30",
                        "options":"-"
                      },
                      {
                        "id":2,
                        "question": "Какой ваш пол?",
                        "field_type": "выпадающий_список",
                        "options": ["Мужской", "Женский"],
                        "type_id": "пол",
                        "correct_answer": "Мужской"
                      },
                      {
                        "id":3,
                        "question": "Были ли у вас операции в прошлом? Если да, укажите какие.",
                        "field_type": "текст",
                        "type_id": "операции",
                        "correct_answer": "Аппендицит в 2010 году",
                        "options":"-"
                      },
                      {
                        "id":4,
                        "question": "Курите ли вы?",
                        "field_type": "checkBox",
                        "options": ["Да", "Нет"],
                        "type_id": "курение",
                        "correct_answer": ["Нет"]
                      },
                      {
                        "id":5,
                        "question": "Как часто вы занимаетесь физическими упражнениями?",
                        "field_type": "radio",
                        "options": ["Ежедневно", "Несколько раз в неделю", "Редко", "Никогда"],
                        "type_id": "физические_упражнения",
                        "correct_answer": "Несколько раз в неделю"
                      },
                      {
                        "id":6,
                        "question": "Каков ваш вес?",
                        "field_type": "текст",
                        "type_id": "вес",
                        "correct_answer": "70 кг",
                        "options":"-"
                      },
                      {
                        "id":7,
                        "question": "Какова ваша рост?",
                        "field_type": "текст",
                        "type_id": "рост",
                        "correct_answer": "180 см",
                        "options":"-"
                      },
                      {
                        "id":8,
                        "question": "Бываете ли вы на диете?",
                        "field_type": "checkBox",
                        "options": ["Да", "Нет"],
                        "type_id": "диета",
                        "correct_answer": ["Нет"]
                      },
                      {
                        "id":9,
                        "question": "Имеете ли вы аллергии? Если да, укажите какие.",
                        "field_type": "текст",
                        "type_id": "аллергии",
                        "correct_answer": "Аллергия на пыльцу и астматический бронхит",
                        "options":"-"
                      },
                      {
                        "id":10,
                        "question": "Какие препараты вы принимаете регулярно? Укажите название и дозировку.",
                        "field_type": "текст",
                        "type_id": "препараты",
                        "correct_answer": "Аспирин 100 мг ежедневно",
                        "options":"-"
                      }
                    ]
                  }
            };
            setSurveyData(data);
            localStorage.setItem('surveyData', JSON.stringify(data));
        }
    }, []);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answer }));
    };

    const handleFinishSurvey = () => {
        setSurveyCompleted(true);

        // Получаем массив ответов текущего пользователя из localStorage
        const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
        // Добавляем новые ответы текущего пользователя
        userAnswers.push({ email: currentUserEmail, answers });
        // Сохраняем обновленный массив ответов в localStorage
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    };

    const renderAnswers = () => {
        return surveyData.survey.questions.map((question, index) => {
            const userAnswer = answers[question.type_id];
            const isCorrect = userAnswer === question.correct_answer;

            return (
                <div className="question" key={index}>
                    <h3>{question.question}</h3>
                    <div className="answer">
                        <p>Верный ответ: {question.correct_answer}</p>
                        <p style={{ color: isCorrect ? 'green' : 'red' }}>
                            Ваш ответ: {userAnswer}
                        </p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Медицинский опросник
                </p>
            </header>
            <form>
                <div className='my-form'>
                    {surveyData && !surveyCompleted ? (
                        surveyData.survey.questions.map((question, index) => (
                            index === currentQuestionIndex && (
                                <div className="question" key={index}>
                                    <h3>{question.question}</h3>
                                    {question.field_type === 'checkBox' ? (
                                        <div className="answer">
                                            {question.options.map((option, optionIndex) => (
                                                <label key={optionIndex}>
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleAnswer(question.type_id, option)}
                                                    />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    ) : question.field_type === 'radio' ? (
                                        <div className="answer">
                                            {question.options.map((option, optionIndex) => (
                                                <label key={optionIndex}>
                                                    <input
                                                        type="radio"
                                                        name={`question${index}`}
                                                        onChange={() => handleAnswer(question.type_id, option)}
                                                    />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    ) : question.field_type === 'выпадающий_список' ? (
                                        <div className="answer">
                                            <select onChange={e => handleAnswer(question.type_id, e.target.value)}>
                                                {question.options.map((option, optionIndex) => (
                                                    <option key={optionIndex}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="answer">
                                            <input
                                                type="text"
                                                onChange={e => handleAnswer(question.type_id, e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <div className="going">
                                        {index > 0 && (
                                            <input
                                                type="button"
                                                className="sbmt"
                                                value="Пред"
                                                onClick={handlePreviousQuestion}
                                            />
                                        )}
                                        {index < surveyData.survey.questions.length - 1 && (
                                            <input
                                                type="button"
                                                className="sbmt"
                                                value="След"
                                                onClick={handleNextQuestion}
                                            />
                                        )}
                                        {index === surveyData.survey.questions.length - 1 && (
                                            <input
                                                type="button"
                                                className="sbmt"
                                                value="Завершить"
                                                onClick={handleFinishSurvey}
                                            />
                                        )}
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                        surveyCompleted && renderAnswers()
                    )}
                </div>
            </form>
        </div>
    );
}
