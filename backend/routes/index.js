const accountRouter = require('./router.account');

function route(app) {
    // app.use('/account', accountRouter);
    app.get('/',(req,res)=>{
        res.send('data');
    });
    
    app.use('/api/v1/',accountRouter);
    
}

module.exports = route;