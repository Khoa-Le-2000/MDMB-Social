const accountRouter = require('./routes/router.account');

function route(app) {
    app.use('/account', accountRouter);
}

module.exports = route;