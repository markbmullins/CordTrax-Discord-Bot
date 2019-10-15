module.exports = class Logger {
  constructor(config) {
    if (config) {
      if (config.showTime) this.showTime = true;
    }
    this.colors = {
      Reset: "\x1b[0m",
      //Bright: "\x1b[1m",
      //Dim: "\x1b[2m",
      //Underscore: "\x1b[4m",
      //Blink: "\x1b[5m",
      //Reverse: "\x1b[7m",
      //Hidden: "\x1b[8m",
      //FgBlack: "\x1b[30m",
      FgRed: "\x1b[31m",
      FgGreen: "\x1b[32m",
      FgYellow: "\x1b[33m",
      FgBlue: "\x1b[34m"
      //FgMagenta: "\x1b[35m",
      //FgCyan: "\x1b[36m",
      //FgWhite: "\x1b[37m",
      //BgBlack: "\x1b[40m",
      //BgRed: "\x1b[41m",
      //BgGreen: "\x1b[42m",
      //BgYellow: "\x1b[43m",
      //BgBlue: "\x1b[44m",
      //BgMagenta: "\x1b[45m",
      //BgCyan: "\x1b[46m",
      //BgWhite: "\x1b[47m"
    };
  }

  debug(logString) {
    console.debug(
      `${this.colors.FgGreen}`,
      `DEBUG: ${this.timeStamp()} `,
      logString,
      `${this.colors.Reset}`
    );
  }

  info(logString) {
    console.info(
      `${this.colors.FgBlue}`,
      `INFO: ${this.timeStamp()} `,
      logString,
      `${this.colors.Reset}`
    );
  }

  warn(logString) {
    console.warn(
      `${this.colors.FgYellow}`,
      `WARNING: ${this.timeStamp()} `,
      logString,
      `${this.colors.Reset}`
    );
  }

  error(logString) {
    console.error(
      `${this.colors.FgRed}`,
      `ERROR: ${this.timeStamp()} `,
      logString,
      `${this.colors.Reset}`
    );
  }

  timeStamp() {
    if (this.showTime) {
      return new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
    }
    return "";
  }
};
