(() => {
  // node_modules/date-fns/esm/_lib/toInteger/index.js
  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number = Number(dirtyNumber);
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }

  // node_modules/date-fns/esm/_lib/requiredArgs/index.js
  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
  }

  // node_modules/date-fns/esm/toDate/index.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof3(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof3(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function toDate(argument) {
    requiredArgs(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }

  // node_modules/date-fns/esm/addDays/index.js
  function addDays(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var date = toDate(dirtyDate);
    var amount = toInteger(dirtyAmount);
    if (isNaN(amount)) {
      return new Date(NaN);
    }
    if (!amount) {
      return date;
    }
    date.setDate(date.getDate() + amount);
    return date;
  }

  // node_modules/date-fns/esm/addMilliseconds/index.js
  function addMilliseconds(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var timestamp = toDate(dirtyDate).getTime();
    var amount = toInteger(dirtyAmount);
    return new Date(timestamp + amount);
  }

  // node_modules/date-fns/esm/_lib/defaultOptions/index.js
  var defaultOptions = {};
  function getDefaultOptions() {
    return defaultOptions;
  }

  // node_modules/date-fns/esm/startOfWeek/index.js
  function startOfWeek(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    requiredArgs(1, arguments);
    var defaultOptions2 = getDefaultOptions();
    var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    var date = toDate(dirtyDate);
    var day = date.getDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  // node_modules/date-fns/esm/startOfISOWeek/index.js
  function startOfISOWeek(dirtyDate) {
    requiredArgs(1, arguments);
    return startOfWeek(dirtyDate, {
      weekStartsOn: 1
    });
  }

  // node_modules/date-fns/esm/getISOWeekYear/index.js
  function getISOWeekYear(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var year = date.getFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
    var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
    var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  // node_modules/date-fns/esm/startOfISOWeekYear/index.js
  function startOfISOWeekYear(dirtyDate) {
    requiredArgs(1, arguments);
    var year = getISOWeekYear(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setFullYear(year, 0, 4);
    fourthOfJanuary.setHours(0, 0, 0, 0);
    var date = startOfISOWeek(fourthOfJanuary);
    return date;
  }

  // node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
  function getTimezoneOffsetInMilliseconds(date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  }

  // node_modules/date-fns/esm/isDate/index.js
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof3(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof2 = function _typeof3(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof2(obj);
  }
  function isDate(value) {
    requiredArgs(1, arguments);
    return value instanceof Date || _typeof2(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
  }

  // node_modules/date-fns/esm/isValid/index.js
  function isValid(dirtyDate) {
    requiredArgs(1, arguments);
    if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
      return false;
    }
    var date = toDate(dirtyDate);
    return !isNaN(Number(date));
  }

  // node_modules/date-fns/esm/subMilliseconds/index.js
  function subMilliseconds(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var amount = toInteger(dirtyAmount);
    return addMilliseconds(dirtyDate, -amount);
  }

  // node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js
  var MILLISECONDS_IN_DAY = 864e5;
  function getUTCDayOfYear(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
  }

  // node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js
  function startOfUTCISOWeek(dirtyDate) {
    requiredArgs(1, arguments);
    var weekStartsOn = 1;
    var date = toDate(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  // node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js
  function getUTCISOWeekYear(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  // node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js
  function startOfUTCISOWeekYear(dirtyDate) {
    requiredArgs(1, arguments);
    var year = getUTCISOWeekYear(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCISOWeek(fourthOfJanuary);
    return date;
  }

  // node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js
  var MILLISECONDS_IN_WEEK = 6048e5;
  function getUTCISOWeek(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
  }

  // node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js
  function startOfUTCWeek(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    requiredArgs(1, arguments);
    var defaultOptions2 = getDefaultOptions();
    var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    var date = toDate(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  // node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
  function getUTCWeekYear(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var year = date.getUTCFullYear();
    var defaultOptions2 = getDefaultOptions();
    var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    }
    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  // node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js
  function startOfUTCWeekYear(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    requiredArgs(1, arguments);
    var defaultOptions2 = getDefaultOptions();
    var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
    var year = getUTCWeekYear(dirtyDate, options);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = startOfUTCWeek(firstWeek, options);
    return date;
  }

  // node_modules/date-fns/esm/_lib/getUTCWeek/index.js
  var MILLISECONDS_IN_WEEK2 = 6048e5;
  function getUTCWeek(dirtyDate, options) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
    return Math.round(diff / MILLISECONDS_IN_WEEK2) + 1;
  }

  // node_modules/date-fns/esm/_lib/addLeadingZeros/index.js
  function addLeadingZeros(number, targetLength) {
    var sign = number < 0 ? "-" : "";
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return sign + output;
  }

  // node_modules/date-fns/esm/_lib/format/lightFormatters/index.js
  var formatters = {
    y: function y(date, token) {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
    },
    M: function M(date, token) {
      var month = date.getUTCMonth();
      return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
    },
    d: function d(date, token) {
      return addLeadingZeros(date.getUTCDate(), token.length);
    },
    a: function a(date, token) {
      var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return dayPeriodEnumValue.toUpperCase();
        case "aaa":
          return dayPeriodEnumValue;
        case "aaaaa":
          return dayPeriodEnumValue[0];
        case "aaaa":
        default:
          return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
      }
    },
    h: function h(date, token) {
      return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
    },
    H: function H(date, token) {
      return addLeadingZeros(date.getUTCHours(), token.length);
    },
    m: function m(date, token) {
      return addLeadingZeros(date.getUTCMinutes(), token.length);
    },
    s: function s(date, token) {
      return addLeadingZeros(date.getUTCSeconds(), token.length);
    },
    S: function S(date, token) {
      var numberOfDigits = token.length;
      var milliseconds = date.getUTCMilliseconds();
      var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
      return addLeadingZeros(fractionalSeconds, token.length);
    }
  };
  var lightFormatters_default = formatters;

  // node_modules/date-fns/esm/_lib/format/formatters/index.js
  var dayPeriodEnum = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  };
  var formatters2 = {
    G: function G(date, token, localize3) {
      var era = date.getUTCFullYear() > 0 ? 1 : 0;
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return localize3.era(era, {
            width: "abbreviated"
          });
        case "GGGGG":
          return localize3.era(era, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return localize3.era(era, {
            width: "wide"
          });
      }
    },
    y: function y2(date, token, localize3) {
      if (token === "yo") {
        var signedYear = date.getUTCFullYear();
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize3.ordinalNumber(year, {
          unit: "year"
        });
      }
      return lightFormatters_default.y(date, token);
    },
    Y: function Y(date, token, localize3, options) {
      var signedWeekYear = getUTCWeekYear(date, options);
      var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
      if (token === "YY") {
        var twoDigitYear = weekYear % 100;
        return addLeadingZeros(twoDigitYear, 2);
      }
      if (token === "Yo") {
        return localize3.ordinalNumber(weekYear, {
          unit: "year"
        });
      }
      return addLeadingZeros(weekYear, token.length);
    },
    R: function R(date, token) {
      var isoWeekYear = getUTCISOWeekYear(date);
      return addLeadingZeros(isoWeekYear, token.length);
    },
    u: function u(date, token) {
      var year = date.getUTCFullYear();
      return addLeadingZeros(year, token.length);
    },
    Q: function Q(date, token, localize3) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        case "Q":
          return String(quarter);
        case "QQ":
          return addLeadingZeros(quarter, 2);
        case "Qo":
          return localize3.ordinalNumber(quarter, {
            unit: "quarter"
          });
        case "QQQ":
          return localize3.quarter(quarter, {
            width: "abbreviated",
            context: "formatting"
          });
        case "QQQQQ":
          return localize3.quarter(quarter, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return localize3.quarter(quarter, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    q: function q(date, token, localize3) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        case "q":
          return String(quarter);
        case "qq":
          return addLeadingZeros(quarter, 2);
        case "qo":
          return localize3.ordinalNumber(quarter, {
            unit: "quarter"
          });
        case "qqq":
          return localize3.quarter(quarter, {
            width: "abbreviated",
            context: "standalone"
          });
        case "qqqqq":
          return localize3.quarter(quarter, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return localize3.quarter(quarter, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    M: function M2(date, token, localize3) {
      var month = date.getUTCMonth();
      switch (token) {
        case "M":
        case "MM":
          return lightFormatters_default.M(date, token);
        case "Mo":
          return localize3.ordinalNumber(month + 1, {
            unit: "month"
          });
        case "MMM":
          return localize3.month(month, {
            width: "abbreviated",
            context: "formatting"
          });
        case "MMMMM":
          return localize3.month(month, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return localize3.month(month, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    L: function L(date, token, localize3) {
      var month = date.getUTCMonth();
      switch (token) {
        case "L":
          return String(month + 1);
        case "LL":
          return addLeadingZeros(month + 1, 2);
        case "Lo":
          return localize3.ordinalNumber(month + 1, {
            unit: "month"
          });
        case "LLL":
          return localize3.month(month, {
            width: "abbreviated",
            context: "standalone"
          });
        case "LLLLL":
          return localize3.month(month, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return localize3.month(month, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    w: function w(date, token, localize3, options) {
      var week = getUTCWeek(date, options);
      if (token === "wo") {
        return localize3.ordinalNumber(week, {
          unit: "week"
        });
      }
      return addLeadingZeros(week, token.length);
    },
    I: function I(date, token, localize3) {
      var isoWeek = getUTCISOWeek(date);
      if (token === "Io") {
        return localize3.ordinalNumber(isoWeek, {
          unit: "week"
        });
      }
      return addLeadingZeros(isoWeek, token.length);
    },
    d: function d2(date, token, localize3) {
      if (token === "do") {
        return localize3.ordinalNumber(date.getUTCDate(), {
          unit: "date"
        });
      }
      return lightFormatters_default.d(date, token);
    },
    D: function D(date, token, localize3) {
      var dayOfYear = getUTCDayOfYear(date);
      if (token === "Do") {
        return localize3.ordinalNumber(dayOfYear, {
          unit: "dayOfYear"
        });
      }
      return addLeadingZeros(dayOfYear, token.length);
    },
    E: function E(date, token, localize3) {
      var dayOfWeek = date.getUTCDay();
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "EEEEE":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "EEEE":
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    e: function e(date, token, localize3, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case "e":
          return String(localDayOfWeek);
        case "ee":
          return addLeadingZeros(localDayOfWeek, 2);
        case "eo":
          return localize3.ordinalNumber(localDayOfWeek, {
            unit: "day"
          });
        case "eee":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "eeeee":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "eeee":
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    c: function c(date, token, localize3, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case "c":
          return String(localDayOfWeek);
        case "cc":
          return addLeadingZeros(localDayOfWeek, token.length);
        case "co":
          return localize3.ordinalNumber(localDayOfWeek, {
            unit: "day"
          });
        case "ccc":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "standalone"
          });
        case "ccccc":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "standalone"
          });
        case "cccc":
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    i: function i(date, token, localize3) {
      var dayOfWeek = date.getUTCDay();
      var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        case "i":
          return String(isoDayOfWeek);
        case "ii":
          return addLeadingZeros(isoDayOfWeek, token.length);
        case "io":
          return localize3.ordinalNumber(isoDayOfWeek, {
            unit: "day"
          });
        case "iii":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "iiiii":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "iiiiii":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "iiii":
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    a: function a2(date, token, localize3) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "aaa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "aaaaa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    b: function b(date, token, localize3) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      }
      switch (token) {
        case "b":
        case "bb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "bbb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "bbbbb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    B: function B(date, token, localize3) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "BBBBB":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    h: function h2(date, token, localize3) {
      if (token === "ho") {
        var hours = date.getUTCHours() % 12;
        if (hours === 0)
          hours = 12;
        return localize3.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return lightFormatters_default.h(date, token);
    },
    H: function H2(date, token, localize3) {
      if (token === "Ho") {
        return localize3.ordinalNumber(date.getUTCHours(), {
          unit: "hour"
        });
      }
      return lightFormatters_default.H(date, token);
    },
    K: function K(date, token, localize3) {
      var hours = date.getUTCHours() % 12;
      if (token === "Ko") {
        return localize3.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return addLeadingZeros(hours, token.length);
    },
    k: function k(date, token, localize3) {
      var hours = date.getUTCHours();
      if (hours === 0)
        hours = 24;
      if (token === "ko") {
        return localize3.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return addLeadingZeros(hours, token.length);
    },
    m: function m2(date, token, localize3) {
      if (token === "mo") {
        return localize3.ordinalNumber(date.getUTCMinutes(), {
          unit: "minute"
        });
      }
      return lightFormatters_default.m(date, token);
    },
    s: function s2(date, token, localize3) {
      if (token === "so") {
        return localize3.ordinalNumber(date.getUTCSeconds(), {
          unit: "second"
        });
      }
      return lightFormatters_default.s(date, token);
    },
    S: function S2(date, token) {
      return lightFormatters_default.S(date, token);
    },
    X: function X(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      if (timezoneOffset === 0) {
        return "Z";
      }
      switch (token) {
        case "X":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        case "XXXX":
        case "XX":
          return formatTimezone(timezoneOffset);
        case "XXXXX":
        case "XXX":
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    x: function x(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "x":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        case "xxxx":
        case "xx":
          return formatTimezone(timezoneOffset);
        case "xxxxx":
        case "xxx":
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    O: function O(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        case "OOOO":
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    z: function z(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        case "zzzz":
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    t: function t(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = Math.floor(originalDate.getTime() / 1e3);
      return addLeadingZeros(timestamp, token.length);
    },
    T: function T(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = originalDate.getTime();
      return addLeadingZeros(timestamp, token.length);
    }
  };
  function formatTimezoneShort(offset, dirtyDelimiter) {
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    var delimiter = dirtyDelimiter || "";
    return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
  }
  function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? "-" : "+";
      return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
    }
    return formatTimezone(offset, dirtyDelimiter);
  }
  function formatTimezone(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || "";
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
    var minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }
  var formatters_default = formatters2;

  // node_modules/date-fns/esm/_lib/format/longFormatters/index.js
  var dateLongFormatter = function dateLongFormatter2(pattern, formatLong3) {
    switch (pattern) {
      case "P":
        return formatLong3.date({
          width: "short"
        });
      case "PP":
        return formatLong3.date({
          width: "medium"
        });
      case "PPP":
        return formatLong3.date({
          width: "long"
        });
      case "PPPP":
      default:
        return formatLong3.date({
          width: "full"
        });
    }
  };
  var timeLongFormatter = function timeLongFormatter2(pattern, formatLong3) {
    switch (pattern) {
      case "p":
        return formatLong3.time({
          width: "short"
        });
      case "pp":
        return formatLong3.time({
          width: "medium"
        });
      case "ppp":
        return formatLong3.time({
          width: "long"
        });
      case "pppp":
      default:
        return formatLong3.time({
          width: "full"
        });
    }
  };
  var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong3) {
    var matchResult = pattern.match(/(P+)(p+)?/) || [];
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];
    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong3);
    }
    var dateTimeFormat;
    switch (datePattern) {
      case "P":
        dateTimeFormat = formatLong3.dateTime({
          width: "short"
        });
        break;
      case "PP":
        dateTimeFormat = formatLong3.dateTime({
          width: "medium"
        });
        break;
      case "PPP":
        dateTimeFormat = formatLong3.dateTime({
          width: "long"
        });
        break;
      case "PPPP":
      default:
        dateTimeFormat = formatLong3.dateTime({
          width: "full"
        });
        break;
    }
    return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong3)).replace("{{time}}", timeLongFormatter(timePattern, formatLong3));
  };
  var longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };
  var longFormatters_default = longFormatters;

  // node_modules/date-fns/esm/_lib/protectedTokens/index.js
  var protectedDayOfYearTokens = ["D", "DD"];
  var protectedWeekYearTokens = ["YY", "YYYY"];
  function isProtectedDayOfYearToken(token) {
    return protectedDayOfYearTokens.indexOf(token) !== -1;
  }
  function isProtectedWeekYearToken(token) {
    return protectedWeekYearTokens.indexOf(token) !== -1;
  }
  function throwProtectedError(token, format2, input) {
    if (token === "YYYY") {
      throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    } else if (token === "YY") {
      throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    } else if (token === "D") {
      throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    } else if (token === "DD") {
      throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    }
  }

  // node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js
  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  var formatDistance = function formatDistance2(token, count, options) {
    var result;
    var tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };
  var formatDistance_default = formatDistance;

  // node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js
  function buildFormatLongFn(args) {
    return function() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format2 = args.formats[width] || args.formats[args.defaultWidth];
      return format2;
    };
  }

  // node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
  var dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  var timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  var formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };
  var formatLong_default = formatLong;

  // node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js
  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
  };
  var formatRelative_default = formatRelative;

  // node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js
  function buildLocalizeFn(args) {
    return function(dirtyIndex, options) {
      var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
      var valuesArray;
      if (context === "formatting" && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;
        var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }
      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index];
    };
  }

  // node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
  var eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  var quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  var monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  var dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  var dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
    var number = Number(dirtyNumber);
    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  var localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: function argumentCallback(quarter) {
        return quarter - 1;
      }
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };
  var localize_default = localize;

  // node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js
  function buildMatchFn(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      }) : findKey(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      });
      var value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }
  function findKey(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }

  // node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js
  function buildMatchPatternFn(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var matchResult = string.match(args.matchPattern);
      if (!matchResult)
        return null;
      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);
      if (!parseResult)
        return null;
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }

  // node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;
  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: function valueCallback(value) {
        return parseInt(value, 10);
      }
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: function valueCallback2(index) {
        return index + 1;
      }
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };
  var match_default = match;

  // node_modules/date-fns/esm/locale/en-US/index.js
  var locale = {
    code: "en-US",
    formatDistance: formatDistance_default,
    formatLong: formatLong_default,
    formatRelative: formatRelative_default,
    localize: localize_default,
    match: match_default,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  var en_US_default = locale;

  // node_modules/date-fns/esm/_lib/defaultLocale/index.js
  var defaultLocale_default = en_US_default;

  // node_modules/date-fns/esm/format/index.js
  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp = /^'([^]*?)'?$/;
  var doubleQuoteRegExp = /''/g;
  var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  function format(dirtyDate, dirtyFormatStr, options) {
    var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
    requiredArgs(2, arguments);
    var formatStr = String(dirtyFormatStr);
    var defaultOptions2 = getDefaultOptions();
    var locale3 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
    var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    }
    var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    if (!locale3.localize) {
      throw new RangeError("locale must contain localize property");
    }
    if (!locale3.formatLong) {
      throw new RangeError("locale must contain formatLong property");
    }
    var originalDate = toDate(dirtyDate);
    if (!isValid(originalDate)) {
      throw new RangeError("Invalid time value");
    }
    var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
    var utcDate = subMilliseconds(originalDate, timezoneOffset);
    var formatterOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale: locale3,
      _originalDate: originalDate
    };
    var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
      var firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        var longFormatter = longFormatters_default[firstCharacter];
        return longFormatter(substring, locale3.formatLong);
      }
      return substring;
    }).join("").match(formattingTokensRegExp).map(function(substring) {
      if (substring === "''") {
        return "'";
      }
      var firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }
      var formatter = formatters_default[firstCharacter];
      if (formatter) {
        if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
          throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
        }
        if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
          throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
        }
        return formatter(utcDate, substring, locale3.localize, formatterOptions);
      }
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
      }
      return substring;
    }).join("");
    return result;
  }
  function cleanEscapedString(input) {
    var matched = input.match(escapedStringRegExp);
    if (!matched) {
      return input;
    }
    return matched[1].replace(doubleQuoteRegExp, "'");
  }

  // node_modules/date-fns/esm/getISOWeek/index.js
  var MILLISECONDS_IN_WEEK3 = 6048e5;
  function getISOWeek(dirtyDate) {
    requiredArgs(1, arguments);
    var date = toDate(dirtyDate);
    var diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime();
    return Math.round(diff / MILLISECONDS_IN_WEEK3) + 1;
  }

  // node_modules/date-fns/esm/getYear/index.js
  function getYear(dirtyDate) {
    requiredArgs(1, arguments);
    return toDate(dirtyDate).getFullYear();
  }

  // node_modules/date-fns/esm/locale/ja/_lib/formatDistance/index.js
  var formatDistanceLocale2 = {
    lessThanXSeconds: {
      one: "1\u79D2\u672A\u6E80",
      other: "{{count}}\u79D2\u672A\u6E80",
      oneWithSuffix: "\u7D041\u79D2",
      otherWithSuffix: "\u7D04{{count}}\u79D2"
    },
    xSeconds: {
      one: "1\u79D2",
      other: "{{count}}\u79D2"
    },
    halfAMinute: "30\u79D2",
    lessThanXMinutes: {
      one: "1\u5206\u672A\u6E80",
      other: "{{count}}\u5206\u672A\u6E80",
      oneWithSuffix: "\u7D041\u5206",
      otherWithSuffix: "\u7D04{{count}}\u5206"
    },
    xMinutes: {
      one: "1\u5206",
      other: "{{count}}\u5206"
    },
    aboutXHours: {
      one: "\u7D041\u6642\u9593",
      other: "\u7D04{{count}}\u6642\u9593"
    },
    xHours: {
      one: "1\u6642\u9593",
      other: "{{count}}\u6642\u9593"
    },
    xDays: {
      one: "1\u65E5",
      other: "{{count}}\u65E5"
    },
    aboutXWeeks: {
      one: "\u7D041\u9031\u9593",
      other: "\u7D04{{count}}\u9031\u9593"
    },
    xWeeks: {
      one: "1\u9031\u9593",
      other: "{{count}}\u9031\u9593"
    },
    aboutXMonths: {
      one: "\u7D041\u304B\u6708",
      other: "\u7D04{{count}}\u304B\u6708"
    },
    xMonths: {
      one: "1\u304B\u6708",
      other: "{{count}}\u304B\u6708"
    },
    aboutXYears: {
      one: "\u7D041\u5E74",
      other: "\u7D04{{count}}\u5E74"
    },
    xYears: {
      one: "1\u5E74",
      other: "{{count}}\u5E74"
    },
    overXYears: {
      one: "1\u5E74\u4EE5\u4E0A",
      other: "{{count}}\u5E74\u4EE5\u4E0A"
    },
    almostXYears: {
      one: "1\u5E74\u8FD1\u304F",
      other: "{{count}}\u5E74\u8FD1\u304F"
    }
  };
  var formatDistance3 = function formatDistance4(token, count, options) {
    options = options || {};
    var result;
    var tokenValue = formatDistanceLocale2[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      if (options.addSuffix && tokenValue.oneWithSuffix) {
        result = tokenValue.oneWithSuffix;
      } else {
        result = tokenValue.one;
      }
    } else {
      if (options.addSuffix && tokenValue.otherWithSuffix) {
        result = tokenValue.otherWithSuffix.replace("{{count}}", String(count));
      } else {
        result = tokenValue.other.replace("{{count}}", String(count));
      }
    }
    if (options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return result + "\u5F8C";
      } else {
        return result + "\u524D";
      }
    }
    return result;
  };
  var formatDistance_default2 = formatDistance3;

  // node_modules/date-fns/esm/locale/ja/_lib/formatLong/index.js
  var dateFormats2 = {
    full: "y\u5E74M\u6708d\u65E5EEEE",
    long: "y\u5E74M\u6708d\u65E5",
    medium: "y/MM/dd",
    short: "y/MM/dd"
  };
  var timeFormats2 = {
    full: "H\u6642mm\u5206ss\u79D2 zzzz",
    long: "H:mm:ss z",
    medium: "H:mm:ss",
    short: "H:mm"
  };
  var dateTimeFormats2 = {
    full: "{{date}} {{time}}",
    long: "{{date}} {{time}}",
    medium: "{{date}} {{time}}",
    short: "{{date}} {{time}}"
  };
  var formatLong2 = {
    date: buildFormatLongFn({
      formats: dateFormats2,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats2,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats2,
      defaultWidth: "full"
    })
  };
  var formatLong_default2 = formatLong2;

  // node_modules/date-fns/esm/locale/ja/_lib/formatRelative/index.js
  var formatRelativeLocale2 = {
    lastWeek: "\u5148\u9031\u306Eeeee\u306Ep",
    yesterday: "\u6628\u65E5\u306Ep",
    today: "\u4ECA\u65E5\u306Ep",
    tomorrow: "\u660E\u65E5\u306Ep",
    nextWeek: "\u7FCC\u9031\u306Eeeee\u306Ep",
    other: "P"
  };
  var formatRelative3 = function formatRelative4(token, _date, _baseDate, _options) {
    return formatRelativeLocale2[token];
  };
  var formatRelative_default2 = formatRelative3;

  // node_modules/date-fns/esm/locale/ja/_lib/localize/index.js
  var eraValues2 = {
    narrow: ["BC", "AC"],
    abbreviated: ["\u7D00\u5143\u524D", "\u897F\u66A6"],
    wide: ["\u7D00\u5143\u524D", "\u897F\u66A6"]
  };
  var quarterValues2 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["\u7B2C1\u56DB\u534A\u671F", "\u7B2C2\u56DB\u534A\u671F", "\u7B2C3\u56DB\u534A\u671F", "\u7B2C4\u56DB\u534A\u671F"]
  };
  var monthValues2 = {
    narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    abbreviated: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
    wide: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"]
  };
  var dayValues2 = {
    narrow: ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"],
    short: ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"],
    abbreviated: ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"],
    wide: ["\u65E5\u66DC\u65E5", "\u6708\u66DC\u65E5", "\u706B\u66DC\u65E5", "\u6C34\u66DC\u65E5", "\u6728\u66DC\u65E5", "\u91D1\u66DC\u65E5", "\u571F\u66DC\u65E5"]
  };
  var dayPeriodValues2 = {
    narrow: {
      am: "\u5348\u524D",
      pm: "\u5348\u5F8C",
      midnight: "\u6DF1\u591C",
      noon: "\u6B63\u5348",
      morning: "\u671D",
      afternoon: "\u5348\u5F8C",
      evening: "\u591C",
      night: "\u6DF1\u591C"
    },
    abbreviated: {
      am: "\u5348\u524D",
      pm: "\u5348\u5F8C",
      midnight: "\u6DF1\u591C",
      noon: "\u6B63\u5348",
      morning: "\u671D",
      afternoon: "\u5348\u5F8C",
      evening: "\u591C",
      night: "\u6DF1\u591C"
    },
    wide: {
      am: "\u5348\u524D",
      pm: "\u5348\u5F8C",
      midnight: "\u6DF1\u591C",
      noon: "\u6B63\u5348",
      morning: "\u671D",
      afternoon: "\u5348\u5F8C",
      evening: "\u591C",
      night: "\u6DF1\u591C"
    }
  };
  var formattingDayPeriodValues2 = {
    narrow: {
      am: "\u5348\u524D",
      pm: "\u5348\u5F8C",
      midnight: "\u6DF1\u591C",
      noon: "\u6B63\u5348",
      morning: "\u671D",
      afternoon: "\u5348\u5F8C",
      evening: "\u591C",
      night: "\u6DF1\u591C"
    },
    abbreviated: {
      am: "\u5348\u524D",
      pm: "\u5348\u5F8C",
      midnight: "\u6DF1\u591C",
      noon: "\u6B63\u5348",
      morning: "\u671D",
      afternoon: "\u5348\u5F8C",
      evening: "\u591C",
      night: "\u6DF1\u591C"
    },
    wide: {
      am: "\u5348\u524D",
      pm: "\u5348\u5F8C",
      midnight: "\u6DF1\u591C",
      noon: "\u6B63\u5348",
      morning: "\u671D",
      afternoon: "\u5348\u5F8C",
      evening: "\u591C",
      night: "\u6DF1\u591C"
    }
  };
  var ordinalNumber3 = function ordinalNumber4(dirtyNumber, options) {
    var number = Number(dirtyNumber);
    var unit = String(options === null || options === void 0 ? void 0 : options.unit);
    switch (unit) {
      case "year":
        return "".concat(number, "\u5E74");
      case "quarter":
        return "\u7B2C".concat(number, "\u56DB\u534A\u671F");
      case "month":
        return "".concat(number, "\u6708");
      case "week":
        return "\u7B2C".concat(number, "\u9031");
      case "date":
        return "".concat(number, "\u65E5");
      case "hour":
        return "".concat(number, "\u6642");
      case "minute":
        return "".concat(number, "\u5206");
      case "second":
        return "".concat(number, "\u79D2");
      default:
        return "".concat(number);
    }
  };
  var localize2 = {
    ordinalNumber: ordinalNumber3,
    era: buildLocalizeFn({
      values: eraValues2,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues2,
      defaultWidth: "wide",
      argumentCallback: function argumentCallback2(quarter) {
        return Number(quarter) - 1;
      }
    }),
    month: buildLocalizeFn({
      values: monthValues2,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues2,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues2,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues2,
      defaultFormattingWidth: "wide"
    })
  };
  var localize_default2 = localize2;

  // node_modules/date-fns/esm/locale/ja/_lib/match/index.js
  var matchOrdinalNumberPattern2 = /^第?\d+(年|四半期|月|週|日|時|分|秒)?/i;
  var parseOrdinalNumberPattern2 = /\d+/i;
  var matchEraPatterns2 = {
    narrow: /^(B\.?C\.?|A\.?D\.?)/i,
    abbreviated: /^(紀元[前後]|西暦)/i,
    wide: /^(紀元[前後]|西暦)/i
  };
  var parseEraPatterns2 = {
    narrow: [/^B/i, /^A/i],
    any: [/^(紀元前)/i, /^(西暦|紀元後)/i]
  };
  var matchQuarterPatterns2 = {
    narrow: /^[1234]/i,
    abbreviated: /^Q[1234]/i,
    wide: /^第[1234一二三四１２３４]四半期/i
  };
  var parseQuarterPatterns2 = {
    any: [/(1|一|１)/i, /(2|二|２)/i, /(3|三|３)/i, /(4|四|４)/i]
  };
  var matchMonthPatterns2 = {
    narrow: /^([123456789]|1[012])/,
    abbreviated: /^([123456789]|1[012])月/i,
    wide: /^([123456789]|1[012])月/i
  };
  var parseMonthPatterns2 = {
    any: [/^1\D/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
  };
  var matchDayPatterns2 = {
    narrow: /^[日月火水木金土]/,
    short: /^[日月火水木金土]/,
    abbreviated: /^[日月火水木金土]/,
    wide: /^[日月火水木金土]曜日/
  };
  var parseDayPatterns2 = {
    any: [/^日/, /^月/, /^火/, /^水/, /^木/, /^金/, /^土/]
  };
  var matchDayPeriodPatterns2 = {
    any: /^(AM|PM|午前|午後|正午|深夜|真夜中|夜|朝)/i
  };
  var parseDayPeriodPatterns2 = {
    any: {
      am: /^(A|午前)/i,
      pm: /^(P|午後)/i,
      midnight: /^深夜|真夜中/i,
      noon: /^正午/i,
      morning: /^朝/i,
      afternoon: /^午後/i,
      evening: /^夜/i,
      night: /^深夜/i
    }
  };
  var match2 = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern2,
      parsePattern: parseOrdinalNumberPattern2,
      valueCallback: function valueCallback3(value) {
        return parseInt(value, 10);
      }
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns2,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns2,
      defaultParseWidth: "any",
      valueCallback: function valueCallback4(index) {
        return index + 1;
      }
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns2,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns2,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns2,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns2,
      defaultParseWidth: "any"
    })
  };
  var match_default2 = match2;

  // node_modules/date-fns/esm/locale/ja/index.js
  var locale2 = {
    code: "ja",
    formatDistance: formatDistance_default2,
    formatLong: formatLong_default2,
    formatRelative: formatRelative_default2,
    localize: localize_default2,
    match: match_default2,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  var ja_default = locale2;

  // <stdin>
  var getTargetDay = (targetWeek) => {
    const today = new Date();
    if (targetWeek == "nextWeek") {
      return addDays(today, 7);
    } else {
      return today;
    }
  };
  try {
    const urlSearchParams = new URLSearchParams(location.search);
    const projectName = urlSearchParams.get("projectName");
    const targetWeek = urlSearchParams.get("target");
    const targetDay = getTargetDay(targetWeek);
    const year = getYear(targetDay);
    const week = getISOWeek(targetDay);
    const startDay = startOfISOWeek(targetDay);
    const pageTitle = `\u4ECA\u9031\u306E\u3054\u306F\u3093 ${year}-${week}W`;
    let body = "";
    for (let i2 = 0; i2 < 7; i2++) {
      const d3 = format(addDays(startDay, i2), "yyyy-MM-dd(E)", { locale: ja_default });
      const content = `${d3}
\u671D\uFF1A
\u663C\uFF1A
\u591C\uFF1A

`;
      body = body + content;
    }
    if (projectName) {
      location.href = `https://scrapbox.io/${encodeURIComponent(projectName)}/${encodeURIComponent(pageTitle)}?${new URLSearchParams([["body", body]]).toString()}`;
    } else {
      alert("projectName\u306E\u6307\u5B9A\u304C\u3042\u308A\u307E\u305B\u3093");
    }
  } catch (exception) {
    alert(exception);
  }
})();
