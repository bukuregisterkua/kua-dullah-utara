if (!globalThis.DOMException) {
  globalThis.DOMException = class DOMException extends Error {
    constructor(message, name) {
      super(message);
      this.name = name || 'Error';
    }
  };
}
module.exports = globalThis.DOMException;
