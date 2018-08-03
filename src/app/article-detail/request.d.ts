import * as $protobuf from 'protobufjs';

/** Namespace request. */
export namespace request {

    /** Properties of a GrpcRequest. */
    interface IGrpcRequest {

        /** GrpcRequest name */
        name?: (string|null);

        /** GrpcRequest age */
        age?: (number|null);

        /** GrpcRequest birthday */
        birthday?: (number|null);
    }

    /** Represents a GrpcRequest. */
    class GrpcRequest implements IGrpcRequest {

        /**
         * Constructs a new GrpcRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: request.IGrpcRequest);

        /** GrpcRequest name. */
        public name: string;

        /** GrpcRequest age. */
        public age: number;

        /** GrpcRequest birthday. */
        public birthday: (number);

        /**
         * Creates a new GrpcRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GrpcRequest instance
         */
        public static create(properties?: request.IGrpcRequest): request.GrpcRequest;

        /**
         * Encodes the specified GrpcRequest message. Does not implicitly {@link request.GrpcRequest.verify|verify} messages.
         * @param message GrpcRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: request.IGrpcRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GrpcRequest message, length delimited. Does not implicitly {@link request.GrpcRequest.verify|verify} messages.
         * @param message GrpcRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: request.IGrpcRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GrpcRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GrpcRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): request.GrpcRequest;

        /**
         * Decodes a GrpcRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GrpcRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): request.GrpcRequest;

        /**
         * Verifies a GrpcRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GrpcRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GrpcRequest
         */
        public static fromObject(object: { [k: string]: any }): request.GrpcRequest;

        /**
         * Creates a plain object from a GrpcRequest message. Also converts values to other types if specified.
         * @param message GrpcRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: request.GrpcRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GrpcRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
