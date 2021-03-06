import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

// initialize server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {  // incase of error disply THE ERROR MESSAGE
            return res.status(500).send(err.message);
        }

        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        let markup;
        if (renderProps) {
            // if the current route matched we have renderProps
            markup = renderToString(<RouterContext {...renderProps} />);
        } else {
            // otherwise render 404 NotFoundPage
            markup = renderToString(<NotFoundPage />);
            res.status(404);
        }

        // render the index template with the embedded React markup
        return res.render('index', {markup});
    });
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server running on http://localhost:${port} [${env}]`);
});