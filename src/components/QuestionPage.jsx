import React, { useState, useEffect } from 'react';
import './QuestionPage.css'; // Подключаем файл со стилями

const SurveyEditorPage = () => {
  const [surveyData, setSurveyData] = useState({});
  const [editedQuestionId, setEditedQuestionId] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState("");
  const [editedOptions, setEditedOptions] = useState([]);
  const [editedFieldType, setEditedFieldType] = useState("текст");
  const [showAddQuestionBlock, setShowAddQuestionBlock] = useState(false);
  const [editedQuestionFieldType, setEditedQuestionFieldType] = useState("текст"); // Добавляем состояние для типа вопроса при редактировании

  useEffect(() => {
    const existingSurveyData = localStorage.getItem('surveyData');
    if (existingSurveyData) {
      setSurveyData(JSON.parse(existingSurveyData));
    }
  }, []);

  const handleQuestionEdit = (questionId, questionText, correctAnswer, options, fieldType) => {
    setEditedQuestionId(questionId);
    setEditedQuestionText(questionText);
    setEditedCorrectAnswer(correctAnswer);
    setEditedOptions(Array.isArray(options) ? options : []);
    setEditedFieldType(fieldType);
    setEditedQuestionFieldType(fieldType); // Устанавливаем тип вопроса при редактировании
    setShowAddQuestionBlock(true); // Показываем блок редактирования
  };

  const handleQuestionSave = () => {
    const updatedSurveyData = { ...surveyData };
    if (editedQuestionId !== null) {
      const questionIndex = updatedSurveyData.survey.questions.findIndex(q => q.id === editedQuestionId);
      if (questionIndex !== -1) {
        updatedSurveyData.survey.questions[questionIndex].question = editedQuestionText;
        updatedSurveyData.survey.questions[questionIndex].correct_answer = editedCorrectAnswer;
        updatedSurveyData.survey.questions[questionIndex].options = editedOptions;
        updatedSurveyData.survey.questions[questionIndex].field_type = editedQuestionFieldType; // Сохраняем измененный тип вопроса
        setSurveyData(updatedSurveyData);
        localStorage.setItem('surveyData', JSON.stringify(updatedSurveyData));
      }
      setEditedQuestionId(null);
      setEditedQuestionText("");
      setEditedCorrectAnswer("");
      setEditedOptions([]);
    } else {
      const newQuestionId = Math.max(...updatedSurveyData.survey.questions.map(q => q.id)) + 1;
      updatedSurveyData.survey.questions.push({
        id: newQuestionId,
        question: editedQuestionText,
        field_type: editedFieldType,
        correct_answer: editedCorrectAnswer,
        options: editedOptions
      });
      setSurveyData(updatedSurveyData);
      localStorage.setItem('surveyData', JSON.stringify(updatedSurveyData));
    }
    setShowAddQuestionBlock(false);
  };

  const handleQuestionDelete = (questionId) => {
    const updatedSurveyData = { ...surveyData };
    updatedSurveyData.survey.questions = updatedSurveyData.survey.questions.filter(q => q.id !== questionId);
    setSurveyData(updatedSurveyData);
    localStorage.setItem('surveyData', JSON.stringify(updatedSurveyData));
  };

  const handleQuestionTypeChange = (questionId, newType) => {
    const updatedSurveyData = { ...surveyData };
    const question = updatedSurveyData.survey.questions.find(q => q.id === questionId);
    if (question) {
      question.field_type = newType;
      setSurveyData(updatedSurveyData);
      localStorage.setItem('surveyData', JSON.stringify(updatedSurveyData));
    }
  };

  const handleAddQuestion = () => {
    setShowAddQuestionBlock(true);
  };

  const handleCancelAddQuestion = () => {
    setShowAddQuestionBlock(false);
  };

  const handleOpenFormPage = () => {
    window.location.href = '/form';
  };
  const handleOpenResultPage = () => {
    window.location.href = '/results';
  };

  return (
    <div className='App'>
      <header className="App-header">
        <p>
          Медицинский опросник
        </p>
      </header>
      <div className="survey-editor-page">
        <h1>Редактор опросника</h1>
        <button className="btn-survey" onClick={handleOpenFormPage}>Опросник</button>
        <button className="btn-survey" onClick={handleOpenResultPage}>Результаты опроса</button>
        {showAddQuestionBlock && (
          <div className="question-block">
            <h3>Добавление нового вопроса</h3>
            <input placeholder="Текст вопроса" value={editedQuestionText} onChange={(e) => setEditedQuestionText(e.target.value)} />
            <input placeholder="Верный ответ" value={editedCorrectAnswer} onChange={(e) => setEditedCorrectAnswer(e.target.value)} />
            <input placeholder="Варианты ответа (через запятую)" value={Array.isArray(editedOptions) ? editedOptions.join(',') : ''} onChange={(e) => setEditedOptions(e.target.value.split(','))} />
            <select value={editedQuestionFieldType} onChange={(e) => setEditedQuestionFieldType(e.target.value)}>
              <option value="текст">Текст</option>
              <option value="выпадающий_список">Выпадающий список</option>
              <option value="checkBox">CheckBox</option>
              <option value="radio">Radio</option>
              {/* Добавьте другие типы вопросов */}
            </select>
            <div className='button-container'>
              <button onClick={handleQuestionSave}>Сохранить</button>
              <button onClick={handleCancelAddQuestion}>Отмена</button>
            </div>
          </div>
        )}
        {!showAddQuestionBlock && (
          <button className="add-question" onClick={handleAddQuestion}>Добавить вопрос</button>
        )}
        {surveyData && surveyData.survey && surveyData.survey.questions && surveyData.survey.questions.map(question => (
          <div key={question.id} className="question-block">
            {editedQuestionId === question.id ? (
              <div className="edit-mode">
                <input value={editedQuestionText} onChange={(e) => setEditedQuestionText(e.target.value)} />
                <input value={editedCorrectAnswer} onChange={(e) => setEditedCorrectAnswer(e.target.value)} />
                <input value={Array.isArray(editedOptions) ? editedOptions.join(',') : ''} onChange={(e) => setEditedOptions(e.target.value.split(','))} />
                <button onClick={handleQuestionSave}>Сохранить</button>
              </div>
            ) : (
              <div >
                <h3>{question.question}</h3>
                <p>Тип вопроса: {question.field_type}</p>
                <p>Верный ответ: {question.correct_answer}</p>
                {question.options && question.field_type === 'выпадающий_список' && (
                  <div>
                    <p>Варианты ответа: {question.options.join(', ')}</p>
                  </div>
                )}
                <div className="button-container">
                  <button className="edit" onClick={() => handleQuestionEdit(question.id, question.question, question.correct_answer, question.options, question.field_type)}>Редактировать</button>
                  <button className="delete" onClick={() => handleQuestionDelete(question.id)}>Удалить</button>
                </div>
                <select value={question.field_type} onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}>
                  <option value="текст">Текст</option>
                  <option value="выпадающий_список">Выпадающий список</option>
                  <option value="checkBox">CheckBox</option>
                  <option value="radio">Radio</option>
                  {/* Добавьте другие типы вопросов */}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyEditorPage;
