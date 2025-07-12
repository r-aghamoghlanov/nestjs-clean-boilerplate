export const HttpStatus = {
  CONTINUE: {
    code: 100,
    description:
      'The server has received the request headers and the client should proceed to send the request body',
  },
  SWITCHING_PROTOCOLS: {
    code: 101,
    description: 'The server is switching protocols as requested by the client',
  },
  PROCESSING: {
    code: 102,
    description:
      'The server is processing the request but no response is available yet',
  },
  EARLYHINTS: {
    code: 103,
    description:
      'Used to return some response headers before final HTTP message',
  },
  OK: {
    code: 200,
    description:
      'The request has succeeded and the response contains the requested data',
  },
  CREATED: {
    code: 201,
    description:
      'The request has been fulfilled and a new resource has been created',
  },
  ACCEPTED: {
    code: 202,
    description:
      'The request has been accepted for processing but processing has not been completed',
  },
  NON_AUTHORITATIVE_INFORMATION: {
    code: 203,
    description:
      'The returned metadata is different from what was originally available from the origin server',
  },
  NO_CONTENT: {
    code: 204,
    description:
      'The server successfully processed the request but there is no content to return',
  },
  RESET_CONTENT: {
    code: 205,
    description:
      'The server has fulfilled the request and the user agent should reset the document view',
  },
  PARTIAL_CONTENT: {
    code: 206,
    description:
      'The server is delivering only part of the resource due to a range header sent by the client',
  },
  MULTI_STATUS: {
    code: 207,
    description:
      'The response contains multiple status codes for different parts of the request',
  },
  ALREADY_REPORTED: {
    code: 208,
    description:
      'The members of a DAV binding have already been enumerated in a previous reply',
  },
  CONTENT_DIFFERENT: {
    code: 210,
    description:
      'The server has fulfilled a request for the resource and the response is a representation of the result',
  },
  AMBIGUOUS: {
    code: 300,
    description:
      'The requested resource has multiple representations and the client should choose one',
  },
  MOVED_PERMANENTLY: {
    code: 301,
    description:
      'The requested resource has been permanently moved to a new location',
  },
  FOUND: {
    code: 302,
    description:
      'The requested resource has been temporarily moved to a different location',
  },
  SEE_OTHER: {
    code: 303,
    description:
      'The response to the request can be found under a different URI using a GET method',
  },
  NOT_MODIFIED: {
    code: 304,
    description:
      'The resource has not been modified since the last request, use cached version',
  },
  TEMPORARY_REDIRECT: {
    code: 307,
    description:
      'The request should be repeated with another URI but the same method',
  },
  PERMANENT_REDIRECT: {
    code: 308,
    description:
      'The request and all future requests should be repeated using another URI',
  },
  BAD_REQUEST: {
    code: 400,
    description:
      'The server cannot or will not process the request due to a client error (malformed syntax, invalid request message framing, or deceptive request routing)',
  },
  UNAUTHORIZED: {
    code: 401,
    description:
      'Authentication is required and has failed or has not been provided',
  },
  PAYMENT_REQUIRED: {
    code: 402,
    description:
      'Payment is required to access the requested resource (reserved for future use)',
  },
  FORBIDDEN: {
    code: 403,
    description:
      'The server understood the request but refuses to authorize it due to insufficient permissions',
  },
  NOT_FOUND: {
    code: 404,
    description: 'The requested resource could not be found on the server',
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    description:
      'The HTTP method used is not allowed for the requested resource',
  },
  NOT_ACCEPTABLE: {
    code: 406,
    description:
      'The server cannot produce a response matching the list of acceptable values defined in the request headers',
  },
  PROXY_AUTHENTICATION_REQUIRED: {
    code: 407,
    description:
      'Authentication is required with the proxy before the request can be processed',
  },
  REQUEST_TIMEOUT: {
    code: 408,
    description: 'The server timed out waiting for the request from the client',
  },
  CONFLICT: {
    code: 409,
    description:
      'The request could not be completed due to a conflict with the current state of the resource',
  },
  GONE: {
    code: 410,
    description:
      'The requested resource is no longer available at the server and no forwarding address is known',
  },
  LENGTH_REQUIRED: {
    code: 411,
    description:
      'The server refuses to accept the request without a defined Content-Length header',
  },
  PRECONDITION_FAILED: {
    code: 412,
    description:
      'One or more conditions given in the request header fields evaluated to false when tested on the server',
  },
  PAYLOAD_TOO_LARGE: {
    code: 413,
    description:
      'The request entity is larger than limits defined by the server',
  },
  URI_TOO_LONG: {
    code: 414,
    description: 'The URI provided was too long for the server to process',
  },
  UNSUPPORTED_MEDIA_TYPE: {
    code: 415,
    description:
      'The media format of the requested data is not supported by the server',
  },
  REQUESTED_RANGE_NOT_SATISFIABLE: {
    code: 416,
    description:
      'The range specified in the Range header field cannot be fulfilled by the server',
  },
  EXPECTATION_FAILED: {
    code: 417,
    description:
      'The expectation given in the Expect header field could not be met by the server',
  },
  I_AM_A_TEAPOT: {
    code: 418,
    description:
      'The server refuses to brew coffee because it is, permanently, a teapot (April Fools joke)',
  },
  MISDIRECTED: {
    code: 421,
    description:
      'The request was directed at a server that is not able to produce a response',
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    description:
      'The server understands the content type and syntax of the request entity, but was unable to process the contained instructions',
  },
  LOCKED: {
    code: 423,
    description: 'The resource that is being accessed is locked',
  },
  FAILED_DEPENDENCY: {
    code: 424,
    description:
      'The method could not be performed on the resource because the requested action depended on another action that failed',
  },
  PRECONDITION_REQUIRED: {
    code: 428,
    description: 'The origin server requires the request to be conditional',
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    description:
      'The user has sent too many requests in a given amount of time (rate limiting)',
  },
  UNRECOVERABLE_ERROR: {
    code: 456,
    description:
      'The request cannot be processed due to an unrecoverable error in the request',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    description:
      'The server encountered an unexpected condition that prevented it from fulfilling the request',
  },
  NOT_IMPLEMENTED: {
    code: 501,
    description:
      'The server does not support the functionality required to fulfill the request',
  },
  BAD_GATEWAY: {
    code: 502,
    description:
      'The server, while acting as a gateway or proxy, received an invalid response from the upstream server',
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    description:
      'The server is temporarily unable to handle the request due to maintenance or overload',
  },
  GATEWAY_TIMEOUT: {
    code: 504,
    description:
      'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server',
  },
  HTTP_VERSION_NOT_SUPPORTED: {
    code: 505,
    description:
      'The server does not support the HTTP protocol version used in the request',
  },
  INSUFFICIENT_STORAGE: {
    code: 507,
    description:
      'The server is unable to store the representation needed to complete the request',
  },
  LOOP_DETECTED: {
    code: 508,
    description:
      'The server detected an infinite loop while processing the request',
  },
} as const;
