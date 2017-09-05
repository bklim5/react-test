import React from 'react';

class ChatPane extends React.Component {
    componentDidMount() {
        let button = document.getElementById('sendBtn');
        let textField = document.getElementById('message-input');

        let clickStream = Rx.Observable.fromEvent(button, 'click').map(e => true);
        let enterKeyPressedStream = Rx.Observable.fromEvent(textField, 'keyup').filter(e => e.keyCode == 13);
        let textEnteredStream = Rx.Observable.fromEvent(textField, 'keyup').map(e => e.target.value);
        let sendMessageStream = Rx.Observable.merge(clickStream, enterKeyPressedStream);

        let mergedStream = textEnteredStream.takeUntil(sendMessageStream);

        let text = '';
        let onNext = t => { text = t; };
        let onError = e => {};
        let onComplete = () => {
            $.post('/message', {'message': text, 'who': this.props.data.nickname, 'timestamp': Date.now()});
            textField.value = '';
            textField.focus();
            mergedStream.subscribe(onNext, onError, onComplete);
        };

        mergedStream.subscribe(onNext, onError, onComplete);
    }

    render() {
        return (
             <div>
                <h4>Your nickname is {this.props.data.nickname}</h4>
                <ul className="collection">
                    { 
                        this.props.data.messages.map((message, index) => {
                            return <li className="collection-item" key={message.timestamp}>
                            <span className="title">{message.who}  <i>{moment(parseInt(message.timestamp)).format('YYYY-MM-DD HH:mm:ss')}</i></span>
                            <p>                            
                            <strong>{message.message}</strong>
                            </p>
                            </li>
                        })
                    }   
                </ul>
                <div className="row">
                    <div className="input-field col s10">
                        <input id="message-input" type="text" className="validate" ref="message" />
                        <label className="active" htmlFor="message-input">Type your chat, enter/return or hit button to send</label>
                    </div>
                    <div className="input-field col s2">
                        <a id="sendBtn" className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">send</i></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPane;