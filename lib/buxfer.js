'use strict';

import extend from 'xtend';
import request from 'request';
import querystring from 'querystring';

var API_URL = 'https://www.buxfer.com/api/';

export default class Buxfer {

    /**
     * Buxfer API Client
     * @param string    token   Your account's Buxfer token
     * @author Matteo Magni <matteo@magni.me> (magni.me)
     * @constructor
     */
    constructor(token) {
        this.credentials = {
            'token': token
        };
    }

    /**
     * Helper to handle requests to the API with authorization
     *
     * @private
     * @param string    url             address part after API root
     * @param object    parameters      additional parameters
     * @callback        complete
     * @method          _get
     */
    _get(url, parameters, callback) {
        parameters = extend(parameters, this.credentials); // Add credentials to parameters
        var getURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters
        request.get({
            url: getURL,
            strictSSL: true,
            json: true
        }, function(error, response, body) {
            if (!error && !!body.status && body.status !== 'OK') {
                error = new Error(body.description || body.error_message);
            }
            callback(error, body || {});
        });
    }

    /**
     * Helper to handle POST requests to the API with authorization
     *
     * @private
     * @param string    url             address part after API root
     * @param object    parameters      additional parameters
     * @param object    body            request body
     * @callback        complete
     * @method          _post
     */
    _post(url, parameters, body, callback) {
        parameters = extend(parameters, this.credentials); // Add credentials to parameters
        var postURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

        request.post({
            url: postURL,
            strictSSL: true,
            json: true,
            body: body,
        }, function(error, response, body) {
            callback(error, body || {});
        });
    }

    /**
     * Helper to handle PUT requests to the API with authorization
     *
     * @private
     * @param string    url             address part after API root
     * @param object    parameters      additional parameters
     * @param object    body            request body
     * @callback        complete
     * @method          _put
     */
    _put(url, parameters, body, callback) {
        parameters = extend(parameters, this.credentials); // Add credentials to parameters
        var putURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters

        request.put({
            url: putURL,
            strictSSL: true,
            json: true,
            body: body,
        }, function(error, response, body) {
            callback(error, body || {});
        });
    }

    /**
     * get last transactions
     * This method returns last 25 transactions
     * @callback    complete
     * @method      getBoard
     */
    getTransactions(callback) {
        this._get('transactions', {}, function(error, body) {
            callback(error, body.response.transactions);
        });
    };

}