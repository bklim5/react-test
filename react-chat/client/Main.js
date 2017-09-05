import React from 'react';

class Main extends React.Component {
    constructor() {
        this.state = {
            users: [],
            messages: []
        };
    }

    componentDidMount() {
        const socket = io();
        const props = this.props;
        let users = this.state.users;
        let messages = this.state.messages;
        let self = this;

        let socketIdStream = Rx.Observable.create(observer => {
            socket.on('my socketId', data => { observer.onNext(data); })
        });

        socketIdStream.subscribe(data => {
            socket.emit('client connect', {
                nickname: props.nickname,
                socketId: data.socketId,
                connectTime: data.connectTime
            });
        });

        let socketAllUsersStream = Rx.Observable.create(observer => {
            socket.on('all users', data => {
                observer.onNext(data);
            });
        });

        socketAllUsersStream.subscribe(data => {
            self.setState({ users: data });
        });

        let socketMessageStream = Rx.Observable.create(observer => {
            socket.on('message', data => {
                observer.onNext(data);
            });
        });

        socketMessageStream.subscribe(data => {
            messages.push(data);
            self.setState({messages: messages});
        })

    }

    render() {
        return (
            <div>
                <AppBar />
                <div className="row">                  
                    <div className="col s6"><ChatPane data={{nickname: this.props.nickname, 
                        messages: this.state.messages}}/></div>
                    <div className="col s6"><PresencePane data={this.state.users} /></div>
                </div>
            </div>
        );
    }
}

export default Main;