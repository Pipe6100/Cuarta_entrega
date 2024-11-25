import React from 'react';
import { useState, useEffect } from 'react';
import './Loading.css';

const Loading = () => {
    const [loadingText, setLoadingText] = useState('Cargando');

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText(current =>
                current === 'Cargando...' ? 'Cargando' : current + '.'
            );
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="spinner-wrapper">
                    <div className="outer-spinner" />

                    <div className="inner-spinner-container">
                        <div className="inner-spinner" />
                    </div>
                </div>

                <div className="loading-text-container">
                    <h2 className="loading-title">
                        {loadingText}
                    </h2>
                    <p className="loading-subtitle">
                        Por favor espere un momento
                    </p>
                </div>
            </div>

            <div className="decorative-container">
                <div className="decorative-circle circle-1" />
                <div className="decorative-circle circle-2" />
                <div className="decorative-circle circle-3" />
                <div className="decorative-circle circle-4" />
                <div className="decorative-circle circle-5" />
            </div>
        </div>
    );
};
export default Loading;
