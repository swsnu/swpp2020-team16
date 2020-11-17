export function InvalidKeyException(message) {
    this.message = message;
    this.name = 'invalidKeyException';
}

export function ResponseException(message) {
    this.message = message;
    this.name = 'ResponseException';
}
