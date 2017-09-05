import React from 'react';

class PresencePane extends React.Component {
    render() {
        return (
            <div>
                <h4>Active Users</h4>
                <table className="striped">
                    <thead>
                        <tr>
                            <th data-field="id">Nickname</th>
                            <th data-field="name">Time joined</th>              
                        </tr>
                    </thead>

                    <tbody>                    
                    { 
                        this.props.data.map((user, index) => {
                            return <tr key={user.nickname}> 
                                <td>{user.nickname}</td>
                                <td>{moment(user.connectTime).format('YYYY-MM-DD HH:mm:ss')}</td>
                            </tr>
                        })
                    }
                    </tbody>
                 </table>    
            </div>
        );
    }
}

export default PresencePane;