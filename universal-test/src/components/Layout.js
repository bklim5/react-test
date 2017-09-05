import React from 'react';
import { Link } from 'react-router';

class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <Link to="/">
                        <img className="logo" src="/img/logo-judo-heroes.png" />
                    </Link>
                </header>
                <div className="app-content">{this.props.children}</div>
                <footer>
                    <p>
                        This is a demo app to showcase universal rendering and routing.
                    </p>
                </footer>
            </div>
        );
    }
}

export default Layout;