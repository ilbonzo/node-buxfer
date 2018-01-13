'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xtend = require('xtend');

var _xtend2 = _interopRequireDefault(_xtend);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API_URL = 'https://www.buxfer.com/api/';

var Buxfer = function () {

    /**
     * Buxfer API Client
     * @param string    token   Your account's Buxfer token
     * @author Matteo Magni <matteo@magni.me> (magni.me)
     * @constructor
     */
    function Buxfer(token) {
        _classCallCheck(this, Buxfer);

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


    _createClass(Buxfer, [{
        key: '_get',
        value: function _get(url, parameters, callback) {
            parameters = (0, _xtend2.default)(parameters, this.credentials); // Add credentials to parameters
            var getURL = API_URL + '/' + url + '?' + _querystring2.default.stringify(parameters); // Construct URL with parameters
            _request2.default.get({
                url: getURL,
                strictSSL: true,
                json: true
            }, function (error, response, body) {
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

    }, {
        key: '_post',
        value: function _post(url, parameters, body, callback) {
            parameters = (0, _xtend2.default)(parameters, this.credentials); // Add credentials to parameters
            var postURL = API_URL + '/' + url + '?' + _querystring2.default.stringify(parameters); // Construct URL with parameters

            _request2.default.post({
                url: postURL,
                strictSSL: true,
                json: true,
                body: body
            }, function (error, response, body) {
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

    }, {
        key: '_put',
        value: function _put(url, parameters, body, callback) {
            parameters = (0, _xtend2.default)(parameters, this.credentials); // Add credentials to parameters
            var putURL = API_URL + '/' + url + '?' + _querystring2.default.stringify(parameters); // Construct URL with parameters

            _request2.default.put({
                url: putURL,
                strictSSL: true,
                json: true,
                body: body
            }, function (error, response, body) {
                callback(error, body || {});
            });
        }

        /**
         * get last transactions
         * This method returns last 25 transactions
         * @callback    complete
         * @method      getBoard
         */

    }, {
        key: 'getTransactions',
        value: function getTransactions(callback) {
            this._get('transactions', {}, function (error, body) {
                callback(error, body.response.transactions);
            });
        }
    }]);

    return Buxfer;
}();

exports.default = Buxfer;
module.exports = exports['default'];