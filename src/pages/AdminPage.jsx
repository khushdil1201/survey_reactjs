import React, { useState } from 'react';
import './AdminPage.css'; // Подключаем файл стилей

const AdminPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Получаем массив пользователей из localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        // Проверяем наличие пользователя в массиве
        const registeredUser = users.find(user => user.email === email && user.password === password);
        if (registeredUser) {
            if (registeredUser.email === 'khushdilikhtiyori@gmail.com' && registeredUser.password === '12012004.kh') {
                // Сохраняем email пользователя в localStorage
                //localStorage.removeItem('currentUserEmail')
                
                //console.log(email)
                window.location.href = '/questions';
            } else {
                window.location.href = '/form';
            }
            localStorage.setItem('currentUserEmail', email);
            // Перенаправляем на страницу с вопросами

        } else {
            // Перенаправляем на страницу регистрации
            // window.location.href = '/registration';
            alert('Пожалуйста, сначала зарегистрируйтесь!')
        }
    };

    return (
        <div className="admin-page">
            <h2>Страница входа</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
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
                <button type="submit">Войти</button>
            </form>
            <p>Ещё нет аккаунта? <a href="/registration">Зарегистрируйтесь</a></p>
        </div>
    );
}

export default AdminPage;
