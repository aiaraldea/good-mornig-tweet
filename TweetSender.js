"use strict";

var Twitter = require('twitter');
var fs = require('fs');

module.exports = function(config) {
    var client = new Twitter(config);

    var send = function(message, image) {
        try {
            var data = fs.readFileSync(image);
        }
        catch (err) {
            console.log("unable to load the image " + err);
            client.post('statuses/update', {
                status: message
            }, function(error, tweet, response) {
                console.log("%j", error);
                if (error) throw error;
                // console.log(tweet); // Tweet body.
                // console.log(response); // Raw response object.
            });
        }
        client.post('media/upload', {
            media: data
        }, function(error, media, response) {

            if (!error) {

                // If successful, a media object will be returned.
                console.log(media);

                // Lets tweet it
                var status = {
                    status: message,
                    media_ids: media.media_id_string // Pass the media id string
                }

                client.post('statuses/update', status, function(error, tweet, response) {
                    if (!error) {
                        console.log(tweet);
                    }
                    if (error) {
                        
                        console.log("%j", error);
                        throw error;}
                });

            }

            if (error) throw error;
            // console.log(tweet); // Tweet body.
            // console.log(response); // Raw response object.
        });

    };

    var sendWithImage = function(status, file) {

        var form = new FormData();
        form.append('status', status)
        form.append('media[]', fs.createReadStream(file));


    };
    return {
        send: send
    };
    // return this.send(message);
};