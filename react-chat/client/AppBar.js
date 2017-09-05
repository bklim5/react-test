import React from 'react';

class AppBar extends React.Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                      <a href="#" className="brand-logo center">RxJS ReactJS SocketIO MaterializeCSS</a>
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li><a href="#">About</a></li>                            
                      </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default AppBar;