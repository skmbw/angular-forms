/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.request = (function() {

    /**
     * Namespace request.
     * @exports request
     * @namespace
     */
    var request = {};

    request.GrpcRequest = (function() {

        /**
         * Properties of a GrpcRequest.
         * @memberof request
         * @interface IGrpcRequest
         * @property {string|null} [name] GrpcRequest name
         * @property {number|null} [age] GrpcRequest age
         * @property {number|Long|null} [birthday] GrpcRequest birthday
         */

        /**
         * Constructs a new GrpcRequest.
         * @memberof request
         * @classdesc Represents a GrpcRequest.
         * @implements IGrpcRequest
         * @constructor
         * @param {request.IGrpcRequest=} [properties] Properties to set
         */
        function GrpcRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GrpcRequest name.
         * @member {string} name
         * @memberof request.GrpcRequest
         * @instance
         */
        GrpcRequest.prototype.name = "";

        /**
         * GrpcRequest age.
         * @member {number} age
         * @memberof request.GrpcRequest
         * @instance
         */
        GrpcRequest.prototype.age = 0;

        /**
         * GrpcRequest birthday.
         * @member {number|Long} birthday
         * @memberof request.GrpcRequest
         * @instance
         */
        GrpcRequest.prototype.birthday = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GrpcRequest instance using the specified properties.
         * @function create
         * @memberof request.GrpcRequest
         * @static
         * @param {request.IGrpcRequest=} [properties] Properties to set
         * @returns {request.GrpcRequest} GrpcRequest instance
         */
        GrpcRequest.create = function create(properties) {
            return new GrpcRequest(properties);
        };

        /**
         * Encodes the specified GrpcRequest message. Does not implicitly {@link request.GrpcRequest.verify|verify} messages.
         * @function encode
         * @memberof request.GrpcRequest
         * @static
         * @param {request.IGrpcRequest} message GrpcRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GrpcRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.age != null && message.hasOwnProperty("age"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.age);
            if (message.birthday != null && message.hasOwnProperty("birthday"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.birthday);
            return writer;
        };

        /**
         * Encodes the specified GrpcRequest message, length delimited. Does not implicitly {@link request.GrpcRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof request.GrpcRequest
         * @static
         * @param {request.IGrpcRequest} message GrpcRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GrpcRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GrpcRequest message from the specified reader or buffer.
         * @function decode
         * @memberof request.GrpcRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {request.GrpcRequest} GrpcRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GrpcRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.request.GrpcRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.age = reader.int32();
                    break;
                case 3:
                    message.birthday = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GrpcRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof request.GrpcRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {request.GrpcRequest} GrpcRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GrpcRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GrpcRequest message.
         * @function verify
         * @memberof request.GrpcRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GrpcRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.age != null && message.hasOwnProperty("age"))
                if (!$util.isInteger(message.age))
                    return "age: integer expected";
            if (message.birthday != null && message.hasOwnProperty("birthday"))
                if (!$util.isInteger(message.birthday) && !(message.birthday && $util.isInteger(message.birthday.low) && $util.isInteger(message.birthday.high)))
                    return "birthday: integer|Long expected";
            return null;
        };

        /**
         * Creates a GrpcRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof request.GrpcRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {request.GrpcRequest} GrpcRequest
         */
        GrpcRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.request.GrpcRequest)
                return object;
            var message = new $root.request.GrpcRequest();
            if (object.name != null)
                message.name = String(object.name);
            if (object.age != null)
                message.age = object.age | 0;
            if (object.birthday != null)
                if ($util.Long)
                    (message.birthday = $util.Long.fromValue(object.birthday)).unsigned = false;
                else if (typeof object.birthday === "string")
                    message.birthday = parseInt(object.birthday, 10);
                else if (typeof object.birthday === "number")
                    message.birthday = object.birthday;
                else if (typeof object.birthday === "object")
                    message.birthday = new $util.LongBits(object.birthday.low >>> 0, object.birthday.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GrpcRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof request.GrpcRequest
         * @static
         * @param {request.GrpcRequest} message GrpcRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GrpcRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.age = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.birthday = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.birthday = options.longs === String ? "0" : 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.age != null && message.hasOwnProperty("age"))
                object.age = message.age;
            if (message.birthday != null && message.hasOwnProperty("birthday"))
                if (typeof message.birthday === "number")
                    object.birthday = options.longs === String ? String(message.birthday) : message.birthday;
                else
                    object.birthday = options.longs === String ? $util.Long.prototype.toString.call(message.birthday) : options.longs === Number ? new $util.LongBits(message.birthday.low >>> 0, message.birthday.high >>> 0).toNumber() : message.birthday;
            return object;
        };

        /**
         * Converts this GrpcRequest to JSON.
         * @function toJSON
         * @memberof request.GrpcRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GrpcRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GrpcRequest;
    })();

    return request;
})();

module.exports = $root;
