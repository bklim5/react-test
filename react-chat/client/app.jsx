import React from 'react';
import { Render } from 'react-dom';
import Main from './Main';

const createRandomNickName = (len) => {
    let text = '';
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

Render(<Main nickname={createRandomNickName(6)} />, document.getElementById('container'));
