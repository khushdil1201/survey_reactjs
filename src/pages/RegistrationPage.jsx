import React, { useState } from 'react';
import './RegistrationPage.css'; // Подключаем файл стилей
import '../App.css'
const RegistrationPage = () => {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Проверка на совпадение паролей
        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }
        // Получаем массив пользователей из localStorage или создаем новый массив, если его нет
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        // Проверка наличия пользователя с таким email
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert("Пользователь с таким email уже зарегистрирован");
            return;
        }
        // Добавляем нового пользователя в массив
        users.push({ userName, firstName, lastName, email, password });
        // Сохраняем массив пользователей в localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        alert('Пользователь успешно зарегистрирован!')
        window.location.href = '/';
        // Очищаем поля формы
        setUserName('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
      <div className="App">
      <header className="App-header">
        <p>
          Медицинский опросник
        </p>
        
      </header>

        <div className="registration-page">
            <h2>Регистрация</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userName">Имя пользователя:</label>
                    <input 
                        type="text" 
                        id="userName" 
                        name="userName" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Имя:</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Повторите пароль:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    </div>
    );
}

export default RegistrationPage;
