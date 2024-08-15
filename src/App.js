import React from 'react';
import AdminPage from './pages/AdminPage.jsx' // Импортируйте компонент AdminPage
import './App.css';

function App() {
  const surveyData = {
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
  }
  const existingSurveyData = localStorage.getItem('surveyData');

  if (!existingSurveyData) {
      localStorage.setItem('surveyData', JSON.stringify(surveyData));
  }
  return (

    <div className="App">
      <header className="App-header">
        <p>
          Медицинский опросник
        </p>
        
      </header>
      
      <div className='mainDiv'>
          <AdminPage /> {/* Рендерите разные компоненты в зависимости от состояния */}
      </div>
      
    </div>
  );
}

export default App;
