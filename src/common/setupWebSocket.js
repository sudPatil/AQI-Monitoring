class WSConnection {
  constructor() {
    this.ws = null;
    this.connectionTTL = 250
    this.onMessage = null
    this.onError = null
  }

  check = () => {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) this.connect(this.onMessage, this.onError);
  };

  connect = (datahandler, errorHandler) => {
    this.onMessage = datahandler;
    this.onError = errorHandler;
    this.ws = new WebSocket("ws://city-ws.herokuapp.com/‌");
    let connectInterval;
    let _that = this;

    // websocket onopen event listener
    this.ws.onopen = () => {
      console.log("connected websocket main component");
      clearTimeout(connectInterval);
    };

    this.ws.onmessage = (message) => {
      _that.onMessage(message)
    }

    // websocket onclose event listener
    this.ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (this.connectionTTL + this.connectionTTL) / 1000
        )} second.`,
        e.reason
      );

      this.connectionTTL += this.connectionTTL;
      connectInterval = setTimeout(this.check, Math.min(10000, this.connectionTTL));
    };

    // Error Listerner
    this.ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      _that.onError(err)
      this.ws.close();
    };
  }

  disconnect = () => this.wp && this.ws.close()
}

const _WSConnection = new WSConnection()
export {
  _WSConnection
}