import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionPage from './pages/QuestionPage.jsx'
import Form from './pages/Form.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx';
import SurveyResultsPage from './pages/SurveyResultsPage.jsx';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/form" element={<Form/>}></Route>
        <Route path="/questions" element={ <QuestionPage /> } />
        <Route path="/" element={ <App /> } />
        <Route path="/registration" element={ <RegistrationPage />} />
        <Route path="/results" element={ <SurveyResultsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
