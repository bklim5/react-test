export default ({body, title, initialState}) => {
    return `
        <!DOCTYPE HTML>
        <html>
            <head>
                <title>${title}</title>
                <link rel="stylesheet" href="/assets/index.css" />
                <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
            </head>
            <body>
                <div id="root">${body}</div>
                <script src="/assets/bundle.js"></script>
            </body>
        </html>
    `;
};