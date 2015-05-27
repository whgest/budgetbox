var Hapi = require('hapi');
var RequestModule = require('request');

var server = new Hapi.Server();
server.connection({
    port: 8080
});

var Config = {
    socrataToken: 'xyZiPx2g3Bml1QUI7C5YEtzUl',
    socrataLogin: '',
    socrataPassword: '',
    socrataKey: '4ud7-5fmr'
};

var route_handlers = {
    response_post: function(request, reply) {
        var sodaURL = 'https://data.austintexas.gov/resource/' + Config.socrataKey + '.json';

        console.log("Posting following to " + sodaURL);
        console.log(request.payload);
        RequestModule.post({
            headers: {
                'X-App-Token' : Config.socrataToken,
                'Authorization' : 'Basic ' + new Buffer(Config.socrataLogin + ':' + Config.socrataPassword).toString('base64')
            },
            url: sodaURL,
            body: [JSON.stringify(request.payload)],
        }, function(error, response, body){
            console.log("The server responded: ");
            console.log(body);
            if(error) {
                reply(error);
            } else {
                var responseJSON = request.payload;
                    responseJSON.id = 0;
                    responseJSON.row = JSON.parse(body)[':id'];
                reply(responseJSON);
            }
        });
    },

    feedback_post: function(request, reply) {
        var sodaURL = 'https://data.austintexas.gov/resource/' + Config.socrataKey + '.json';

        console.log("Putting following to " + sodaURL);
        console.log(request.payload);
        var payload = request.payload;
        payload[':id'] = payload.row;
        delete payload.row;
        RequestModule.post({
            headers: {
                'X-App-Token' : Config.socrataToken,
                'Authorization' : 'Basic ' + new Buffer(Config.socrataLogin + ':' + Config.socrataPassword).toString('base64')
            },
            url: sodaURL,
            body: [JSON.stringify(request.payload)],
        }, function(error, response, body){
            console.log("The server responded: ");
            console.log(body);
            if(error) {
                reply(error);
            } else {
                var responseJSON = request.payload;
                    responseJSON.id = 0;
                reply(responseJSON);
            }
        });
    }
};


server.route({
    method: ['POST'],
    path:'/userResponse',
    config: {
        cors: {
            origin: [''],
            additionalHeaders: ['X-App-Token']
        },
        handler: route_handlers.response_post
    },
});


server.route({
    method: ['OPTIONS'],
    path:'/userResponse',
    config: {
        cors: {
            origin: [''],
            additionalHeaders: ['X-App-Token']
        },
        handler: function(request, reply) {
            reply();
        }
    }
});

server.route({
    method: ['POST'],
    path:'/userFeedback',
    config: {
        cors: {
            origin: [''],
            additionalHeaders: ['X-App-Token']
        },
        handler: route_handlers.feedback_post
    },
});


server.route({
    method: ['OPTIONS'],
    path:'/userFeedback',
    config: {
        cors: {
            origin: [''],
            additionalHeaders: ['X-App-Token']
        },
        handler: function(request, reply) {
            reply();
        }
    }
});

console.log("API start");
server.start();