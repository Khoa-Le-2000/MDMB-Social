const accountRouter = require('./router.account');
const authRouter = require('./router.auth');

function route(app) {
    app.use('/account', accountRouter);
    app.use('/auth', authRouter);
}

module.exports = route;