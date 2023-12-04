const apimock = require('@ng-apimock/core');
const devInterface = require('@ng-apimock/dev-interface');
const express = require('express');
const cors = require('cors');
const app = express();
app.set('port', 9999);

apimock.processor.process({
    src: 'mock-server/mocks'
});

app.use(cors());
app.use(apimock.middleware);
app.use('/dev-interface/', express.static(devInterface));

app.listen(app.get('port'), () => {
    console.log('@ng-apimock/core running on port', app.get('port'));
});
