import React, { createElement, useState, useEffect, forwardRef, useRef, useImperativeHandle, Component, useCallback } from 'react';
import styled from 'styled-components';
import { PinterestShareButton, TwitterShareButton, FacebookShareButton } from 'react-share';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Player } from '@lottiefiles/react-lottie-player';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _path, _path2, _path3, _path4, _rect, _path5;

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function SvgCoin(props) {
  return /*#__PURE__*/createElement("svg", _extends$1({
    width: 19,
    height: 19,
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/createElement("path", {
    d: "M14.055 0C6.36 0 0 6.25 0 13.945S6.36 28 14.055 28C21.749 28 28 21.64 28 13.945 28 6.251 21.75 0 14.055 0z",
    fill: "#FEDB41"
  })), _path2 || (_path2 = /*#__PURE__*/createElement("path", {
    d: "M14.057 2.8C7.92 2.8 2.8 7.806 2.8 13.943 2.8 20.08 7.92 25.2 14.057 25.2S25.2 20.08 25.2 13.943 20.194 2.8 14.057 2.8z",
    fill: "#FEA832"
  })), _path3 || (_path3 = /*#__PURE__*/createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11 8.4a1 1 0 00-1 1v9.2a1 1 0 001 1h3.65c.86 0 1.603-.146 2.232-.44a4.144 4.144 0 001.54-1.2c.398-.506.694-1.1.887-1.78A7.92 7.92 0 0019.6 14c0-.774-.097-1.5-.29-2.18a5.126 5.126 0 00-.888-1.78 4.145 4.145 0 00-1.54-1.2c-.629-.294-1.372-.44-2.231-.44H11zm.6 9.1a.5.5 0 00.5.5h1.68c.863 0 1.57-.102 2.12-.306.549-.204.98-.486 1.293-.847.313-.36.526-.784.638-1.27A6.998 6.998 0 0018 14c0-.565-.056-1.09-.169-1.576a2.901 2.901 0 00-.638-1.271c-.313-.36-.744-.643-1.294-.847-.55-.204-1.256-.306-2.118-.306H12.1a.5.5 0 00-.5.5v7z",
    fill: "#FEDB41"
  })), _path4 || (_path4 = /*#__PURE__*/createElement("path", {
    d: "M16.882 19.16l.084.182-.084-.181zm1.54-1.2l.157.124-.157-.123zm.887-1.78l-.192-.054.192.054zm0-4.36l.193-.055-.193.055zm-.887-1.78l.157-.124-.157.123zm-1.54-1.2l.084-.182-.084.181zm.311 8.007l-.15-.131.15.131zm.638-1.27l.195.044-.195-.045zm0-3.153l-.194.045.194-.045zm-.638-1.271l-.15.131.15-.131zM10.2 9.4a.8.8 0 01.8-.8v-.4a1.2 1.2 0 00-1.2 1.2h.4zm0 9.2V9.4h-.4v9.2h.4zm.8.8a.8.8 0 01-.8-.8h-.4a1.2 1.2 0 001.2 1.2v-.4zm3.65 0H11v.4h3.65v-.4zm2.147-.42c-.596.277-1.31.42-2.146.42v.4c.881 0 1.655-.15 2.315-.458l-.169-.362zm1.467-1.143c-.377.481-.864.862-1.467 1.143l.17.362a4.345 4.345 0 001.612-1.258l-.315-.247zm.853-1.711a4.926 4.926 0 01-.853 1.711l.315.247c.415-.53.723-1.146.923-1.849l-.385-.11zM19.4 14c0 .757-.095 1.465-.283 2.126l.385.11c.199-.7.298-1.445.298-2.236h-.4zm-.283-2.126c.188.66.283 1.369.283 2.126h.4c0-.79-.099-1.536-.298-2.235l-.385.11zm-.853-1.711c.38.485.666 1.054.853 1.711l.385-.11a5.322 5.322 0 00-.923-1.848l-.315.247zM16.797 9.02c.603.28 1.09.661 1.467 1.142l.315-.247a4.344 4.344 0 00-1.613-1.258l-.169.363zM14.651 8.6c.836 0 1.55.143 2.146.42l.17-.362c-.661-.308-1.435-.458-2.316-.458v.4zM11 8.6h3.65v-.4H11v.4zm1.1 9.2a.3.3 0 01-.3-.3h-.4a.7.7 0 00.7.7v-.4zm1.68 0H12.1v.4h1.68v-.4zm2.05-.293c-.52.192-1.2.293-2.05.293v.4c.877 0 1.609-.103 2.189-.318l-.14-.375zm1.212-.791c-.287.33-.687.596-1.213.79l.14.376c.574-.213 1.036-.513 1.375-.904l-.302-.262zm.595-1.185c-.106.456-.304.85-.595 1.185l.302.262a3.1 3.1 0 00.682-1.357l-.39-.09zM17.8 14c0 .552-.055 1.062-.163 1.531l.39.09A7.198 7.198 0 0018.2 14h-.4zm-.163-1.531c.108.47.163.98.163 1.53h.4c0-.577-.058-1.118-.174-1.62l-.39.09zm-.595-1.185c.291.335.49.729.595 1.184l.39-.09a3.1 3.1 0 00-.683-1.356l-.302.262zm-1.213-.79c.526.194.927.46 1.213.79l.302-.262c-.34-.392-.801-.69-1.375-.904l-.14.375zM13.78 10.2c.85 0 1.53.1 2.05.293l.139-.375c-.58-.215-1.312-.318-2.188-.318v.4zm-1.68 0h1.68v-.4H12.1v.4zm-.3.3a.3.3 0 01.3-.3v-.4a.7.7 0 00-.7.7h.4zm0 7v-7h-.4v7h.4z",
    fill: "#FEDB41"
  })), _rect || (_rect = /*#__PURE__*/createElement("rect", {
    x: 10,
    y: 13.2,
    width: 3.2,
    height: 1.6,
    rx: 0.75,
    fill: "#FEDB41",
    stroke: "#FEDB41",
    strokeWidth: 0.4
  })), _path5 || (_path5 = /*#__PURE__*/createElement("path", {
    d: "M8.4 9.15a.75.75 0 01.75-.75h2.45V10H9.15a.75.75 0 01-.75-.75v-.1zM8.4 18.75a.75.75 0 01.75-.75h2.45v1.6H9.15a.75.75 0 01-.75-.75v-.1z",
    fill: "#FEDB41",
    stroke: "#FEDB41",
    strokeWidth: 0.4
  })));
}

var _path$1, _path2$1;

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function SvgExit(props) {
  return /*#__PURE__*/createElement("svg", _extends$2({
    width: 28,
    height: 28,
    viewBox: "0 0 46 46",
    fill: "#828282",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.884 12.116a1.25 1.25 0 011.768 0l18.03 18.031a1.25 1.25 0 11-1.767 1.768L13.884 13.884a1.25 1.25 0 010-1.768z"
  })), _path2$1 || (_path2$1 = /*#__PURE__*/createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M33.116 12.116a1.25 1.25 0 00-1.768 0l-18.03 18.031a1.25 1.25 0 101.767 1.768l18.031-18.031a1.25 1.25 0 000-1.768z"
  })));
}

var getWidth = function getWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

var getHeight = function getHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};

function useWindowResize() {
  var _useState = useState(getWidth()),
      _useState2 = _slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];

  var _useState3 = useState(getHeight()),
      _useState4 = _slicedToArray(_useState3, 2),
      height = _useState4[0],
      setHeight = _useState4[1];

  useEffect(function () {
    var timeoutId = null;

    var onResize = function onResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        setWidth(getWidth());
        setHeight(getHeight());
      }, 150);
    };

    window.addEventListener('resize', onResize);
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return {
    width: width,
    height: height
  };
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var ModalContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 456;\n\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n\n  transition-property: background-color, border;\n  transition-duration: 0.2s;\n  transition-timing-function: linear;\n  user-select: none;\n  transition: visibility 0.2s, opacity 0.2s linear;\n  \n  visibility: ", ";\n  opacity: ", ";\n  \n  @media (min-width: 768px) {\n    justify-content: center;\n    align-items: ", ";\n  }\n"])), function (props) {
  return props.show === true ? 'visible' : 'hidden';
}, function (props) {
  return props.show === true ? 1 : 0;
}, function (props) {
  return props.isMinimized ? 'flex-start' : 'center';
});
var ModalPanelContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: relative;\n  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;\n  \n  background-color: ", ";\n  color: ", ";\n\n  display: flex;\n  flex-direction: column;\n  justify-content: stretch;\n\n  width: 100%;\n  max-height: 100%;\n\n  overflow-y: auto;\n  \n  @media (min-width: 768px) {\n    width: ", ";\n    max-width: ", ";\n  }\n"])), function (props) {
  return props.scheme === 'dark' ? '#333' : 'white';
}, function (props) {
  return props.scheme === 'dark' ? 'white' : 'black';
}, function (props) {
  return props.width ? props.width + 'px' : '75%';
}, function (props) {
  return props.maxWidth ? props.maxWidth + 'px' : '700px';
});
var Exit = styled(SvgExit)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding: 0;\n  margin: 0;\n  display: block;\n  cursor: pointer;\n  fill: ", ";\n"])), function (props) {
  return props.scheme === 'dark' ? 'white' : '#828282';
});
var ModalPanelTitle = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  flex: 0 0 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-weight: bold;\n  font-size: 18px;\n  padding: 5px 5px 5px 15px;\n  /*padding: 15px 18px;*/\n"])));
var ModalPanelBody = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  flex: 0 0 100%;\n  /*padding: 0 15px 15px 15px;*/\n"])));
var DMActionModal = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var onClose = _ref.onClose,
      overlayClose = _ref.overlayClose,
      children = _ref.children,
      title = _ref.title,
      width = _ref.width,
      maxWidth = _ref.maxWidth,
      scheme = _ref.scheme,
      show = _ref.show;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isMinimized = _useState4[0],
      setIsMinimized = _useState4[1];

  var _useState5 = useState(true),
      _useState6 = _slicedToArray(_useState5, 2),
      canOverlayClose = _useState6[0],
      setCanOverlayClose = _useState6[1];

  var overlay = useRef();
  var panel = useRef();
  var resize = useWindowResize();
  var BREAK_POINT_BUFFER = 100;
  useEffect(function () {
    //console.log(resize.width, resize.height, panel.current.clientHeight)
    if (isVisible === false) return;
    if (!panel.current) setIsMinimized(false);

    if (resize.height - BREAK_POINT_BUFFER <= panel.current.clientHeight) {
      setIsMinimized(true);
    } else setIsMinimized(false);
  }, [resize]);
  useEffect(function () {
    if (typeof overlayClose !== 'undefined') setCanOverlayClose(overlayClose);
  }, [overlayClose]);
  useEffect(function () {
    if (typeof show !== 'undefined') {
      setVisible(show);
    }
  }, [show]);

  var handleClose = function handleClose() {
    setVisible(false);
    if (onClose) onClose();
  };

  useImperativeHandle(ref, function () {
    return {
      show: function show() {
        setVisible(true);
      },
      hide: function hide() {
        setVisible(false);
      },
      visible: function visible() {
        return isVisible;
      }
    };
  });

  var handleOverlay = function handleOverlay(e) {
    if (overlay.current === e.target) {
      if (canOverlayClose === true) handleClose();
    }
  };

  return /*#__PURE__*/React.createElement(ModalContainer, {
    ref: overlay,
    isMinimized: isMinimized,
    show: isVisible,
    onClick: handleOverlay
  }, /*#__PURE__*/React.createElement(ModalPanelContainer, {
    ref: panel,
    scheme: scheme,
    width: width,
    maxWidth: maxWidth
  }, /*#__PURE__*/React.createElement(ModalPanelTitle, null, /*#__PURE__*/React.createElement("div", null, title && title), /*#__PURE__*/React.createElement(Exit, {
    scheme: scheme,
    onClick: handleClose
  })), /*#__PURE__*/React.createElement(ModalPanelBody, null, children)));
});
/*
    <ModalContainer ref={overlay} show={isVisible} onClick={handleOverlay}>
      <ModalPanelContainer scheme={scheme} width={width} maxWidth={maxWidth}>
        <ModalPanelTitle>
          <div>{title && title}</div>
        <Exit scheme={scheme} onClick={handleClose} />
        </ModalPanelTitle>
        <ModalPanelBody>{children}</ModalPanelBody>
      </ModalPanelContainer>
    </ModalContainer>


    ML JSResult Skip Results Iframe
EDIT ON
var w = document.querySelector("#width"),
    h = document.querySelector("#height"),
    c = document.querySelector("#calls"),
    timeout = false, // holder for timeout id
    delay = 250, // delay after event is "complete" to run callback
    calls = 0;

// window.resize callback function
function getDimensions() {
  w.innerHTML = window.innerWidth;
  h.innerHTML = window.innerHeight;
  calls += 1;
  c.innerHTML = calls;
}

// window.resize event listener
window.addEventListener('resize', function() {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(getDimensions, delay);
});

getDimensions();
  */

var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5$1, _templateObject6;
var ModalContainer$1 = styled.div(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 456;\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  transition-property: background-color, border;\n  transition-duration: 0.2s;\n  transition-timing-function: linear;\n  user-select: none;\n  transition: visibility 0.2s, opacity 0.2s linear;\n  visibility: ", ";\n  opacity: ", ";\n\n  @media (min-width: 768px) {\n    justify-content: center;\n    align-items: ", ";\n  }\n"])), function (props) {
  return props.show === true ? 'visible' : 'hidden';
}, function (props) {
  return props.show === true ? 1 : 0;
}, function (props) {
  return props.isMinimized ? 'flex-start' : 'center';
});
var ModalPanelContainer$1 = styled.div(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n  position: relative;\n  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;\n  \n  background-color: ", ";\n  color: ", ";\n  border-radius: 0;\n  \n  display: flex;\n  flex-direction: column;\n  justify-content: stretch;\n  \n  width: 100%;\n  max-height: 100%;\n\n  overflow-y: auto;\n  \n  @media (min-width: 768px) {\n    border-radius: 10px;\n    width: ", ";\n    max-width: ", ";\n  }\n"])), function (props) {
  return props.scheme === 'dark' ? '#333' : 'white';
}, function (props) {
  return props.scheme === 'dark' ? 'white' : 'black';
}, function (props) {
  return props.width ? props.width + 'px' : '75%';
}, function (props) {
  return props.maxWidth ? props.maxWidth + 'px' : '700px';
});
var ModalPanelCloseContainer = styled.div(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 5px;\n  right: 5px;\n"])));
var Exit$1 = styled(SvgExit)(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral(["\n  padding: 0;\n  margin: 0;\n  margin: 0 auto;\n  display: block;\n  cursor: pointer;\n  fill: ", ";\n"])), function (props) {
  return props.scheme === 'dark' ? 'white' : '#828282';
});
var ModalPanelTitle$1 = styled.div(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  align-self: center;\n  font-weight: bold;\n  font-size: 18px;\n  padding: 5px 0 20px 5px;\n  /*padding: 15px 18px;*/\n"])));
var ModalPanelBody$1 = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  padding: 0 20px 20px 20px;\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  align-self: center;\n"])));
var DMSimpleModal = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var onClose = _ref.onClose,
      overlayClose = _ref.overlayClose,
      children = _ref.children,
      title = _ref.title,
      width = _ref.width,
      maxWidth = _ref.maxWidth,
      scheme = _ref.scheme,
      show = _ref.show;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isMinimized = _useState4[0],
      setIsMinimized = _useState4[1];

  var _useState5 = useState(true),
      _useState6 = _slicedToArray(_useState5, 2),
      canOverlayClose = _useState6[0],
      setCanOverlayClose = _useState6[1];

  var overlay = useRef();
  var panel = useRef();
  var resize = useWindowResize();
  var BREAK_POINT_BUFFER = 100;
  useEffect(function () {
    //console.log(resize.width, resize.height, panel.current.clientHeight)
    if (isVisible === false) return;
    if (!panel.current) setIsMinimized(false);

    if (resize.height - BREAK_POINT_BUFFER <= panel.current.clientHeight) {
      setIsMinimized(true);
    } else setIsMinimized(false);
  }, [resize]);
  useEffect(function () {
    if (typeof overlayClose !== 'undefined') setCanOverlayClose(overlayClose);
  }, [overlayClose]);
  useEffect(function () {
    if (typeof show !== 'undefined') {
      setVisible(show);
    }
  }, [show]);

  var handleClose = function handleClose() {
    setVisible(false);
    if (onClose) onClose();
  };

  useImperativeHandle(ref, function () {
    return {
      show: function show() {
        setVisible(true);
      },
      hide: function hide() {
        setVisible(false);
      },
      visible: function visible() {
        return isVisible;
      }
    };
  });

  var handleOverlay = function handleOverlay(e) {
    if (overlay.current === e.target) {
      if (canOverlayClose === true) handleClose();
    }
  };

  return /*#__PURE__*/React.createElement(ModalContainer$1, {
    ref: overlay,
    isMinimized: isMinimized,
    show: isVisible,
    onClick: handleOverlay
  }, /*#__PURE__*/React.createElement(ModalPanelContainer$1, {
    ref: panel,
    scheme: scheme,
    width: width,
    maxWidth: maxWidth
  }, /*#__PURE__*/React.createElement(ModalPanelCloseContainer, null, /*#__PURE__*/React.createElement(Exit$1, {
    scheme: scheme,
    onClick: handleClose
  })), /*#__PURE__*/React.createElement(ModalPanelTitle$1, null, title && title), /*#__PURE__*/React.createElement(ModalPanelBody$1, null, children)));
});

var _path$2;

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

function SvgMinus(props) {
  return /*#__PURE__*/createElement("svg", _extends$3({
    width: 24,
    height: 24,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 12a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
  })));
}

var _templateObject$2, _templateObject2$2, _templateObject3$2, _templateObject4$2, _templateObject5$2, _templateObject6$1, _templateObject7;
var ModalContainer$2 = styled.div(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: transparent;\n  z-index: 456;\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n  transition-property: background-color, border;\n  transition-duration: 0.2s;\n  transition-timing-function: linear;\n  user-select: none;\n  transition: visibility 0.2s, opacity 0.2s linear;\n  visibility: ", ";\n  opacity: ", ";\n\n  @media (min-width: 768px) {\n    /*justify-content: center;\n    align-items: center;*/\n  }\n"])), function (props) {
  return props.show === true ? 'visible' : 'hidden';
}, function (props) {
  return props.show === true ? 1 : 0;
});
var ModalPanelContainer$2 = styled.div(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteral(["\n  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;\n  position: absolute;\n  background-color: ", ";\n  color: ", ";\n  /*padding: 20px;*/\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: column;\n  justify-content: stretch;\n  border-radius: 0;\n  width: 100%;\n  overflow: hidden;\n  @media (min-width: 768px) {\n    border-radius: 5px;\n    width: ", ";\n    max-width: ", ";\n    ", ";\n    ", ";\n    ", ";\n    ", ";\n  }\n"])), function (props) {
  return props.scheme === 'dark' ? '#333' : 'white';
}, function (props) {
  return props.scheme === 'dark' ? 'white' : 'black';
}, function (props) {
  return props.width ? props.width + 'px' : '435px';
}, function (props) {
  return props.maxWidth ? props.maxWidth + 'px' : '700px';
}, function (props) {
  return props.top && 'top: ' + props.top + 'px';
}, function (props) {
  return props.bottom && 'bottom: ' + props.bottom + 'px';
}, function (props) {
  return props.left && 'left: ' + props.left + 'px';
}, function (props) {
  return props.right && 'right: ' + props.right + 'px';
});
/*

border-radius: 10px;
  width: 100%;

  */

var ModalPanelCloseContainer$1 = styled.div(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 5px;\n  right: 5px;\n"])));
var Exit$2 = styled(SvgMinus)(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteral(["\n  padding: 0;\n  margin: 0;\n  margin: 0 auto;\n  display: block;\n  cursor: pointer;\n  fill: ", ";\n"])), function (props) {
  return props.scheme === 'dark' ? 'white' : '#828282';
});
var ModalPanelTitle$2 = styled.div(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: stretch;\n  align-items: center;\n  font-weight: bold;\n  font-size: 13px;\n  height: 36px;\n  background-color: ", ";\n  color: ", ";\n"])), function (props) {
  return props.scheme === 'dark' ? '#464646' : '#C6C6C6';
}, function (props) {
  return props.scheme === 'dark' ? 'white' : 'black';
});
var Title = styled.div(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral(["\n  width: 100%;\n  text-align: center;\n"])));
var ModalPanelBody$2 = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  padding: 13px 20px 20px 20px;\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: column;\n  justify-content: flex-start;\n  background-color: ", ";\n  font-size: 13px;\n"])), function (props) {
  return props.scheme === 'dark' ? 'back' : 'white';
});
var DMToolTipModal = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var onClose = _ref.onClose,
      overlayClose = _ref.overlayClose,
      children = _ref.children,
      title = _ref.title,
      width = _ref.width,
      maxWidth = _ref.maxWidth,
      scheme = _ref.scheme,
      show = _ref.show,
      props = _objectWithoutProperties(_ref, ["onClose", "overlayClose", "children", "title", "width", "maxWidth", "scheme", "show"]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      canOverlayClose = _useState4[0],
      setCanOverlayClose = _useState4[1];

  var overlay = useRef();
  useEffect(function () {
    if (typeof overlayClose !== 'undefined') setCanOverlayClose(overlayClose);
  }, [overlayClose]);
  useEffect(function () {
    if (typeof show !== 'undefined') {
      setVisible(show);
    }
  }, [show]);

  var handleClose = function handleClose() {
    setVisible(false);
    if (onClose) onClose();
  };

  useImperativeHandle(ref, function () {
    return {
      show: function show() {
        setVisible(true);
      },
      hide: function hide() {
        setVisible(false);
      },
      visible: function visible() {
        return isVisible;
      }
    };
  });

  var handleOverlay = function handleOverlay(e) {
    if (overlay.current === e.target) {
      if (canOverlayClose === true) handleClose();
    }
  };

  return /*#__PURE__*/React.createElement(ModalContainer$2, {
    ref: overlay,
    show: isVisible,
    onClick: handleOverlay
  }, /*#__PURE__*/React.createElement(ModalPanelContainer$2, _extends({
    scheme: scheme,
    width: width,
    maxWidth: maxWidth
  }, props), /*#__PURE__*/React.createElement(ModalPanelCloseContainer$1, null, /*#__PURE__*/React.createElement(Exit$2, {
    scheme: scheme,
    onClick: handleClose
  })), /*#__PURE__*/React.createElement(ModalPanelTitle$2, {
    scheme: scheme
  }, /*#__PURE__*/React.createElement(Title, null, title && title)), /*#__PURE__*/React.createElement(ModalPanelBody$2, {
    scheme: scheme
  }, children)));
});

var _path$3, _path2$2;

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

function SvgCopylink(props) {
  return /*#__PURE__*/createElement("svg", _extends$4({
    width: 42,
    height: 42,
    viewBox: "9 8 24 24",
    fill: "#333",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/createElement("path", {
    d: "M23.593 18.406a4.433 4.433 0 00-6.269 0l-4.027 4.03a4.433 4.433 0 006.265 6.272l3.325-3.324a.317.317 0 00-.225-.542h-.127a5.329 5.329 0 01-2.026-.392.317.317 0 00-.345.07l-2.39 2.393a1.9 1.9 0 11-2.688-2.688l4.043-4.04a1.9 1.9 0 012.684 0c.5.47 1.28.47 1.78 0 .215-.215.345-.5.367-.804a1.267 1.267 0 00-.367-.975z"
  })), _path2$2 || (_path2$2 = /*#__PURE__*/createElement("path", {
    d: "M29.7 12.298a4.433 4.433 0 00-6.269 0l-3.32 3.318a.317.317 0 00.23.542h.117a5.319 5.319 0 012.024.396.317.317 0 00.345-.07l2.384-2.381a1.9 1.9 0 012.688 2.688l-2.97 2.967-.025.028-1.039 1.032a1.9 1.9 0 01-2.685 0c-.5-.47-1.28-.47-1.78 0a1.266 1.266 0 000 1.786c.367.368.796.668 1.267.887.067.031.133.056.2.085.066.029.136.05.202.076.067.025.137.047.203.066l.187.051c.126.032.253.057.383.08.156.023.314.037.472.044h.241l.19-.023c.069-.003.142-.019.224-.019h.108l.218-.031.101-.02.184-.037h.035a4.432 4.432 0 002.055-1.165l4.03-4.03a4.433 4.433 0 000-6.27z"
  })));
}

var _path$4;

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

function SvgPins(props) {
  return /*#__PURE__*/createElement("svg", _extends$5({
    width: 28,
    height: 28,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/createElement("path", {
    d: "M13.977.667C6.633.667.667 6.633.667 13.977c0 5.462 3.258 10.143 7.986 12.209-.046-.918 0-2.066.23-3.075.275-1.102 1.697-7.252 1.697-7.252s-.413-.872-.413-2.111c0-1.974 1.148-3.443 2.57-3.443 1.194 0 1.79.918 1.79 2.02 0 1.193-.78 3.029-1.193 4.727-.321 1.423.689 2.57 2.112 2.57 2.524 0 4.222-3.258 4.222-7.068 0-2.937-1.973-5.095-5.553-5.095-4.04 0-6.564 3.03-6.564 6.38 0 1.148.321 1.974.872 2.616.23.276.276.414.184.735-.046.23-.23.826-.276 1.055-.091.322-.367.46-.688.322-1.882-.78-2.708-2.8-2.708-5.095 0-3.764 3.167-8.307 9.5-8.307 5.095 0 8.446 3.671 8.446 7.619 0 5.232-2.892 9.133-7.16 9.133-1.423 0-2.8-.78-3.259-1.652 0 0-.78 3.075-.918 3.672-.275 1.01-.826 2.065-1.33 2.845 1.193.368 2.478.551 3.763.551 7.343 0 13.31-5.966 13.31-13.31S21.321.667 13.977.667z",
    fill: "#CB1F24"
  })));
}

var _path$5;

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

function SvgFb(props) {
  return /*#__PURE__*/createElement("svg", _extends$6({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/createElement("path", {
    d: "M20.766 0H3.234A3.234 3.234 0 000 3.234v17.532A3.234 3.234 0 003.234 24h8.647l.014-8.576H9.667a.526.526 0 01-.525-.524l-.011-2.765a.526.526 0 01.526-.527h2.224V8.937c0-3.1 1.893-4.788 4.658-4.788h2.27c.29 0 .525.235.525.525v2.331c0 .29-.235.526-.525.526h-1.393c-1.504 0-1.795.715-1.795 1.764v2.313h3.305c.315 0 .559.275.522.587l-.328 2.765a.526.526 0 01-.522.464h-2.962L15.62 24h5.145A3.234 3.234 0 0024 20.766V3.234A3.234 3.234 0 0020.766 0z",
    fill: "#475993"
  })));
}

var _path$6;

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

function SvgTwitter(props) {
  return /*#__PURE__*/createElement("svg", _extends$7({
    width: 28,
    height: 28,
    viewBox: "0 0 26 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/createElement("path", {
    d: "M26 3.034c-.942.402-1.946.668-2.993.797a5.047 5.047 0 002.285-2.789A10.565 10.565 0 0122 2.264 5.276 5.276 0 0018.205.667c-2.875 0-5.19 2.267-5.19 5.047 0 .4.035.785.12 1.151A14.846 14.846 0 012.43 1.587a4.971 4.971 0 00-.71 2.55c0 1.748.926 3.297 2.306 4.194A5.244 5.244 0 011.68 7.71v.055c0 2.452 1.8 4.49 4.16 4.959a5.327 5.327 0 01-1.36.166c-.333 0-.669-.019-.984-.086.673 1.998 2.582 3.467 4.853 3.515a10.631 10.631 0 01-6.44 2.152c-.425 0-.834-.018-1.242-.069 2.3 1.442 5.027 2.265 7.967 2.265 9.557 0 14.782-7.693 14.782-14.36 0-.223-.008-.439-.02-.653A10.202 10.202 0 0026 3.034z",
    fill: "#03A9F4"
  })));
}

var _templateObject$3, _templateObject2$3, _templateObject3$3, _templateObject4$3, _templateObject5$3, _templateObject6$2, _templateObject7$1, _templateObject8;
var ModalPanelContainer$3 = styled.div(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  visibility: ", ";\n  background-color: ", ";\n  color: ", ";\n\n  z-index: 9;\n  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;\n  border-radius: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: stretch;\n  width: 100%;\n  max-height: 100%;\n  overflow-y: auto;\n\n  @media (min-width: 768px) {\n    border-radius: 10px;\n    width: auto;\n    position: absolute;\n    top: ", ";\n    left: ", ";\n  }\n"])), function (props) {
  return props.show === true ? 'visible' : 'hidden';
}, function (props) {
  return props.scheme === 'dark' ? '#333' : 'white';
}, function (props) {
  return props.scheme === 'dark' ? 'white' : 'black';
}, function (props) {
  return props.top;
}, function (props) {
  return props.left;
});
var ModalPanelCloseContainer$2 = styled.div(_templateObject2$3 || (_templateObject2$3 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 5px;\n  right: 5px;\n"])));
var Exit$3 = styled(SvgExit)(_templateObject3$3 || (_templateObject3$3 = _taggedTemplateLiteral(["\n  padding: 0;\n  margin: 0;\n  margin: 0 auto;\n  display: block;\n  cursor: pointer;\n  fill: ", ";\n"])), function (props) {
  return props.scheme === 'dark' ? 'white' : '#828282';
});
var ModalPanelTitle$3 = styled.div(_templateObject4$3 || (_templateObject4$3 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  align-self: center;\n  font-weight: bold;\n  font-size: 24px;\n  padding: 5px 0 20px 5px;\n"])));
var ModalPanelBody$3 = styled.div(_templateObject5$3 || (_templateObject5$3 = _taggedTemplateLiteral(["\n  padding: 0 50px;\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  align-self: center;\n"])));
var ShareContainer = styled.div(_templateObject6$2 || (_templateObject6$2 = _taggedTemplateLiteral(["\n  padding: 40px 15px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  white-space: nowrap;\n  font-weight: 500;\n  color: #333;\n  @media (min-width: 768px) {\n    padding: 40px 20px;\n  }\n"])));
var CopyLink = styled(SvgCopylink)(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral(["\n  fill: #ff5e6d;\n  width: 30px;\n"])));
var Circle = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  border-radius: 50%;\n  height: 60px;\n  width: 60px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  align-self: center;\n\n  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);\n\n  &:hover {\n    box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.15);\n  }\n"])));
var DMShareModal = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var onClose = _ref.onClose,
      scheme = _ref.scheme;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState('https://www.decormatters.com'),
      _useState4 = _slicedToArray(_useState3, 2),
      shareUrl = _useState4[0],
      setShareUrl = _useState4[1];

  var _useState5 = useState('https://www.decormatters.com'),
      _useState6 = _slicedToArray(_useState5, 2),
      imgUrl = _useState6[0],
      setImgUrl = _useState6[1];

  var _useState7 = useState('DecorMatters'),
      _useState8 = _slicedToArray(_useState7, 2),
      quote = _useState8[0],
      setQuote = _useState8[1];

  var _useState9 = useState(0),
      _useState10 = _slicedToArray(_useState9, 2),
      posX = _useState10[0],
      setPosX = _useState10[1];

  var _useState11 = useState(0),
      _useState12 = _slicedToArray(_useState11, 2),
      posY = _useState12[0],
      setPosY = _useState12[1];

  var rContainer = useRef();
  var OFFSETX = 20;

  var handleClose = function handleClose() {
    setVisible(false);
    if (onClose) onClose();
  };

  var useOutsideAlerter = function useOutsideAlerter(ref, onClose) {
    var handleClickOutside = function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    useEffect(function () {
      document.addEventListener('mousedown', handleClickOutside);
      return function () {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  };

  useOutsideAlerter(rContainer, handleClose);

  var positionAndShow = function positionAndShow(position) {
    if (!position) {
      setVisible(false);
      return;
    }

    var toX = position.x + OFFSETX;
    var toY = position.y + OFFSETX;
    if (rContainer.current.clientWidth + position.x > window.innerWidth) toX = position.x - rContainer.current.clientWidth - OFFSETX;
    var body = document.body;
    var html = document.documentElement;
    var pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    if (rContainer.current.clientHeight + position.y > pageHeight) toY = position.y - rContainer.current.clientHeight - OFFSETX;
    setPosX(toX);
    setPosY(toY);
    setVisible(true);
  };

  useImperativeHandle(ref, function () {
    return {
      show: function show(lnk, ttl, img, pos) {
        setShareUrl(lnk);
        setImgUrl(img);
        setQuote(ttl);
        positionAndShow(pos);
      },
      hide: function hide() {
        setVisible(false);
      },
      visible: function visible() {
        return isVisible;
      }
    };
  });

  var shareClick = function shareClick(e) {
    e.stopPropagation();
    var newClipboard = document.createElement('textarea');
    newClipboard.value = shareUrl;
    document.body.appendChild(newClipboard);
    newClipboard.select();
    document.execCommand('copy');
    document.body.removeChild(newClipboard);
    alert('Url is copied to clipboard! Feel free to share this inspiration to others!');
  };

  return /*#__PURE__*/React.createElement(ModalPanelContainer$3, {
    ref: rContainer,
    scheme: scheme,
    left: posX + 'px',
    top: posY + 'px',
    show: isVisible
  }, /*#__PURE__*/React.createElement(ModalPanelCloseContainer$2, null, /*#__PURE__*/React.createElement(Exit$3, {
    scheme: scheme,
    onClick: handleClose
  })), /*#__PURE__*/React.createElement(ModalPanelTitle$3, null, "Share This Design"), /*#__PURE__*/React.createElement(ModalPanelBody$3, null, /*#__PURE__*/React.createElement(ShareContainer, null, /*#__PURE__*/React.createElement(PinterestShareButton, {
    url: shareUrl,
    media: imgUrl
  }, /*#__PURE__*/React.createElement(Circle, null, /*#__PURE__*/React.createElement(SvgPins, null))), "Pinterest"), /*#__PURE__*/React.createElement(ShareContainer, null, /*#__PURE__*/React.createElement(TwitterShareButton, {
    url: shareUrl,
    title: quote
  }, /*#__PURE__*/React.createElement(Circle, null, /*#__PURE__*/React.createElement(SvgTwitter, null))), "Twitter"), /*#__PURE__*/React.createElement(ShareContainer, null, /*#__PURE__*/React.createElement(FacebookShareButton, {
    url: shareUrl,
    quote: quote
  }, /*#__PURE__*/React.createElement(Circle, null, /*#__PURE__*/React.createElement(SvgFb, null))), "Facebook"), /*#__PURE__*/React.createElement(ShareContainer, null, /*#__PURE__*/React.createElement(Circle, {
    onClick: shareClick
  }, /*#__PURE__*/React.createElement(CopyLink, null)), "Copy Link")));
});

var _templateObject$4, _templateObject2$4, _templateObject3$4, _templateObject4$4, _templateObject5$4, _templateObject6$3, _templateObject7$2;
var MODAL_SIZE_FULLSCREEN = 'fullscreen';
var MODAL_SIZE_PERCENTAGE = 'percentage';
var Overlay = styled.div(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteral(["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 100;\n\n  transition: opacity 0.3s ease-out;\n  opacity: ", ";\n  visibility: ", ";\n"])), function (props) {
  return props.animate === 'true' ? '1' : '0';
}, function (props) {
  return props.visibility === 'true' ? 'visible' : 'hidden';
});
var Container = styled.div(_templateObject2$4 || (_templateObject2$4 = _taggedTemplateLiteral(["\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 101;\n  display: flex;\n  pointer-events: none;\n  \n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  \n  visibility: ", ";\n"])), function (props) {
  return props.visibility === 'true' ? 'visible' : 'hidden';
});
var ExitButton = styled.button(_templateObject3$4 || (_templateObject3$4 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  border: none;\n  margin: 0;\n  padding: 0;\n  background: none;\n  cursor: pointer;\n"])));
var Exit$4 = styled(SvgExit)(_templateObject4$4 || (_templateObject4$4 = _taggedTemplateLiteral(["\n  fill: ", ";\n"])), function (props) {
  return props.scheme === 'dark' ? 'white' : '#828282';
}); //justify-content: flex-start;

var Panel = styled.div(_templateObject5$4 || (_templateObject5$4 = _taggedTemplateLiteral(["\n  background-color: white;\n\n  position: relative;\n  pointer-events: auto;\n  overflow: hidden;\n\n  display: flex;\n  flex-direction: column;\n  \n  width: 95%;\n  max-width: ", "px;\n  \n  background-color: ", ";\n  color: ", ";\n\n  ", "\n\n  top: ", ";\n\n  transition-property: top, opacity;\n  transition-duration: 0.3s;\n  transition-timing-function: ease-out;\n\n  justify-content: center;\n  border-radius: ", "px;\n  ", "\n\n  ", "\n"])), function (props) {
  return props.maxWidth ? props.maxWidth : '640';
}, function (props) {
  return props.scheme === 'dark' ? '#333' : 'white';
}, function (props) {
  return props.scheme === 'dark' ? 'white' : 'black';
}, function (props) {
  return props.size === MODAL_SIZE_PERCENTAGE && "height: " + (props.percentage ? props.percentage : "100") + "%;";
}, function (props) {
  return props.animate === 'true' ? '0%' : '100%';
}, function (props) {
  return props.rounded === 'true' ? "10" : "0";
}, function (props) {
  return props.size === MODAL_SIZE_PERCENTAGE && "height: auto;";
}, function (props) {
  if (props.animate === 'true') return "\n        top: 0%;\n        opacity: 1;\n        ";else return "\n      top: 5%;\n      opacity: 0;\n      ";
});
var PanelTitle = styled.div(_templateObject6$3 || (_templateObject6$3 = _taggedTemplateLiteral(["\n  flex: 0 0 35px;\n  height: 35px;\n  min-height: 35px;\n  display: flex;\n  \n  align-items: center;\n  font-weight: bold;\n\n  justify-content: ", ";\n  margin-left: ", "px;\n"])), function (props) {
  return props.left === 'true' ? "flex-start" : "center";
}, function (props) {
  return props.left === 'true' ? "12" : "0";
});
var PanelBody = styled.div(_templateObject7$2 || (_templateObject7$2 = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  overflow-x: hidden;\n  overflow-y: auto;\n"])));

var DMModal = function DMModal(_ref) {
  var show = _ref.show,
      scheme = _ref.scheme,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? MODAL_SIZE_FULLSCREEN : _ref$size,
      title = _ref.title,
      children = _ref.children,
      percentage = _ref.percentage,
      maxWidth = _ref.maxWidth,
      notRounded = _ref.notRounded,
      titleLeft = _ref.titleLeft,
      onClose = _ref.onClose,
      noClose = _ref.noClose,
      noOverlayClose = _ref.noOverlayClose,
      stayFloat = _ref.stayFloat;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visibility = _useState2[0],
      setVisibility = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      animate = _useState4[0],
      setAnimate = _useState4[1];

  var sleep = function sleep(ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  };

  useEffect(function () {
    var display = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!show) {
                  _context.next = 5;
                  break;
                }

                setVisibility(true);
                setAnimate(true);
                _context.next = 9;
                break;

              case 5:
                setAnimate(false);
                _context.next = 8;
                return sleep(300);

              case 8:
                setVisibility(false);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function display() {
        return _ref2.apply(this, arguments);
      };
    }();

    display();
  }, [show]);

  var handleClose = function handleClose(e) {
    e.preventDefault();
    if (onClose) onClose();
  };

  var handleOverlayClick = function handleOverlayClick(e) {
    e.preventDefault();
    if (noOverlayClose) return;
    if (onClose) onClose();
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Overlay, {
    animate: animate.toString(),
    visibility: visibility.toString(),
    onClick: handleOverlayClick
  }), /*#__PURE__*/React.createElement(Container, {
    size: size,
    visibility: visibility.toString()
  }, /*#__PURE__*/React.createElement(Panel, {
    scheme: scheme,
    size: size,
    percentage: percentage,
    animate: animate.toString(),
    visibility: visibility.toString(),
    rounded: notRounded ? 'false' : 'true',
    maxWidth: maxWidth,
    stayFloat: stayFloat ? 'true' : 'false'
  }, !noClose && /*#__PURE__*/React.createElement(ExitButton, {
    onClick: handleClose,
    "aria-label": "Close Modal"
  }, /*#__PURE__*/React.createElement(Exit$4, {
    scheme: scheme
  })), /*#__PURE__*/React.createElement(PanelTitle, {
    left: titleLeft ? 'true' : 'false'
  }, title), /*#__PURE__*/React.createElement(PanelBody, null, children))));
};

var GradientSVG = /*#__PURE__*/function (_Component) {
  _inherits(GradientSVG, _Component);

  var _super = _createSuper(GradientSVG);

  function GradientSVG() {
    _classCallCheck(this, GradientSVG);

    return _super.apply(this, arguments);
  }

  _createClass(GradientSVG, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          startColor = _this$props.startColor,
          endColor = _this$props.endColor,
          idCSS = _this$props.idCSS,
          rotation = _this$props.rotation;
      var gradientTransform = "rotate(".concat(rotation, ")");
      return /*#__PURE__*/React.createElement("svg", {
        style: {
          height: 0
        }
      }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
        id: idCSS,
        gradientTransform: gradientTransform
      }, /*#__PURE__*/React.createElement("stop", {
        offset: "0%",
        stopColor: startColor
      }), /*#__PURE__*/React.createElement("stop", {
        offset: "100%",
        stopColor: endColor
      }))));
    }
  }]);

  return GradientSVG;
}(Component);

var v = "5.5.5";
var fr = 29.9700012207031;
var ip = 0;
var op = 103.000004195276;
var w = 400;
var h = 400;
var nm = "Bigger_glowing";
var ddd = 0;
var assets = [
];
var layers = [
	{
		ddd: 0,
		ind: 3,
		ty: 4,
		nm: "base layer4",
		sr: 1,
		ks: {
			o: {
				a: 1,
				k: [
					{
						i: {
							x: [
								0.833
							],
							y: [
								0.833
							]
						},
						o: {
							x: [
								0.167
							],
							y: [
								0.167
							]
						},
						t: 0,
						s: [
							100
						]
					},
					{
						t: 60.0000024438501,
						s: [
							0
						]
					}
				],
				ix: 11
			},
			r: {
				a: 0,
				k: 0,
				ix: 10
			},
			p: {
				a: 0,
				k: [
					200,
					200,
					0
				],
				ix: 2
			},
			a: {
				a: 0,
				k: [
					0,
					0,
					0
				],
				ix: 1
			},
			s: {
				a: 1,
				k: [
					{
						i: {
							x: [
								0.833,
								0.833,
								0.833
							],
							y: [
								0.833,
								0.833,
								0.833
							]
						},
						o: {
							x: [
								0.167,
								0.167,
								0.167
							],
							y: [
								0.167,
								0.167,
								0.167
							]
						},
						t: 0,
						s: [
							30,
							30,
							100
						]
					},
					{
						t: 60.0000024438501,
						s: [
							100,
							100,
							100
						]
					}
				],
				ix: 6
			}
		},
		ao: 0,
		shapes: [
			{
				ty: "gr",
				it: [
					{
						d: 1,
						ty: "el",
						s: {
							a: 0,
							k: [
								331.973,
								331.973
							],
							ix: 2
						},
						p: {
							a: 0,
							k: [
								0,
								0
							],
							ix: 3
						},
						nm: "Ellipse Path 1",
						mn: "ADBE Vector Shape - Ellipse",
						hd: false
					},
					{
						ty: "st",
						c: {
							a: 0,
							k: [
								1,
								0.835294117647,
								0.850980392157,
								1
							],
							ix: 3
						},
						o: {
							a: 0,
							k: 100,
							ix: 4
						},
						w: {
							a: 0,
							k: 2,
							ix: 5
						},
						lc: 1,
						lj: 1,
						ml: 4,
						bm: 0,
						nm: "Stroke 1",
						mn: "ADBE Vector Graphic - Stroke",
						hd: false
					},
					{
						ty: "fl",
						c: {
							a: 0,
							k: [
								1,
								0.835294117647,
								0.850980392157,
								1
							],
							ix: 4
						},
						o: {
							a: 0,
							k: 100,
							ix: 5
						},
						r: 1,
						bm: 0,
						nm: "Fill 1",
						mn: "ADBE Vector Graphic - Fill",
						hd: false
					},
					{
						ty: "tr",
						p: {
							a: 0,
							k: [
								0.479,
								0.174
							],
							ix: 2
						},
						a: {
							a: 0,
							k: [
								0,
								0
							],
							ix: 1
						},
						s: {
							a: 0,
							k: [
								119.263,
								119.263
							],
							ix: 3
						},
						r: {
							a: 0,
							k: 0,
							ix: 6
						},
						o: {
							a: 0,
							k: 100,
							ix: 7
						},
						sk: {
							a: 0,
							k: 0,
							ix: 4
						},
						sa: {
							a: 0,
							k: 0,
							ix: 5
						},
						nm: "Transform"
					}
				],
				nm: "Ellipse 1",
				np: 3,
				cix: 2,
				bm: 0,
				ix: 1,
				mn: "ADBE Vector Group",
				hd: false
			}
		],
		ip: 0,
		op: 103.000004195276,
		st: 0,
		bm: 0
	},
	{
		ddd: 0,
		ind: 4,
		ty: 4,
		nm: "base layer3",
		sr: 1,
		ks: {
			o: {
				a: 1,
				k: [
					{
						i: {
							x: [
								0.833
							],
							y: [
								0.833
							]
						},
						o: {
							x: [
								0.167
							],
							y: [
								0.167
							]
						},
						t: 15,
						s: [
							100
						]
					},
					{
						t: 75.0000030548126,
						s: [
							0
						]
					}
				],
				ix: 11
			},
			r: {
				a: 0,
				k: 0,
				ix: 10
			},
			p: {
				a: 0,
				k: [
					200,
					200,
					0
				],
				ix: 2
			},
			a: {
				a: 0,
				k: [
					0,
					0,
					0
				],
				ix: 1
			},
			s: {
				a: 1,
				k: [
					{
						i: {
							x: [
								0.833,
								0.833,
								0.833
							],
							y: [
								0.833,
								0.833,
								0.833
							]
						},
						o: {
							x: [
								0.167,
								0.167,
								0.167
							],
							y: [
								0.167,
								0.167,
								0.167
							]
						},
						t: 15,
						s: [
							30,
							30,
							100
						]
					},
					{
						t: 75.0000030548126,
						s: [
							100,
							100,
							100
						]
					}
				],
				ix: 6
			}
		},
		ao: 0,
		shapes: [
			{
				ty: "gr",
				it: [
					{
						d: 1,
						ty: "el",
						s: {
							a: 0,
							k: [
								331.973,
								331.973
							],
							ix: 2
						},
						p: {
							a: 0,
							k: [
								0,
								0
							],
							ix: 3
						},
						nm: "Ellipse Path 1",
						mn: "ADBE Vector Shape - Ellipse",
						hd: false
					},
					{
						ty: "st",
						c: {
							a: 0,
							k: [
								1,
								0.835294117647,
								0.850980392157,
								1
							],
							ix: 3
						},
						o: {
							a: 0,
							k: 100,
							ix: 4
						},
						w: {
							a: 0,
							k: 2,
							ix: 5
						},
						lc: 1,
						lj: 1,
						ml: 4,
						bm: 0,
						nm: "Stroke 1",
						mn: "ADBE Vector Graphic - Stroke",
						hd: false
					},
					{
						ty: "fl",
						c: {
							a: 0,
							k: [
								1,
								0.835294117647,
								0.850980392157,
								1
							],
							ix: 4
						},
						o: {
							a: 0,
							k: 100,
							ix: 5
						},
						r: 1,
						bm: 0,
						nm: "Fill 1",
						mn: "ADBE Vector Graphic - Fill",
						hd: false
					},
					{
						ty: "tr",
						p: {
							a: 0,
							k: [
								0.479,
								0.174
							],
							ix: 2
						},
						a: {
							a: 0,
							k: [
								0,
								0
							],
							ix: 1
						},
						s: {
							a: 0,
							k: [
								119.263,
								119.263
							],
							ix: 3
						},
						r: {
							a: 0,
							k: 0,
							ix: 6
						},
						o: {
							a: 0,
							k: 100,
							ix: 7
						},
						sk: {
							a: 0,
							k: 0,
							ix: 4
						},
						sa: {
							a: 0,
							k: 0,
							ix: 5
						},
						nm: "Transform"
					}
				],
				nm: "Ellipse 1",
				np: 3,
				cix: 2,
				bm: 0,
				ix: 1,
				mn: "ADBE Vector Group",
				hd: false
			}
		],
		ip: 0,
		op: 103.000004195276,
		st: 0,
		bm: 0
	},
	{
		ddd: 0,
		ind: 5,
		ty: 4,
		nm: "base layer2",
		sr: 1,
		ks: {
			o: {
				a: 1,
				k: [
					{
						i: {
							x: [
								0.833
							],
							y: [
								0.833
							]
						},
						o: {
							x: [
								0.167
							],
							y: [
								0.167
							]
						},
						t: 30,
						s: [
							100
						]
					},
					{
						t: 90.0000036657751,
						s: [
							0
						]
					}
				],
				ix: 11
			},
			r: {
				a: 0,
				k: 0,
				ix: 10
			},
			p: {
				a: 0,
				k: [
					200,
					200,
					0
				],
				ix: 2
			},
			a: {
				a: 0,
				k: [
					0,
					0,
					0
				],
				ix: 1
			},
			s: {
				a: 1,
				k: [
					{
						i: {
							x: [
								0.833,
								0.833,
								0.833
							],
							y: [
								0.833,
								0.833,
								0.833
							]
						},
						o: {
							x: [
								0.167,
								0.167,
								0.167
							],
							y: [
								0.167,
								0.167,
								0.167
							]
						},
						t: 30,
						s: [
							30,
							30,
							100
						]
					},
					{
						t: 90.0000036657751,
						s: [
							100,
							100,
							100
						]
					}
				],
				ix: 6
			}
		},
		ao: 0,
		shapes: [
			{
				ty: "gr",
				it: [
					{
						d: 1,
						ty: "el",
						s: {
							a: 0,
							k: [
								331.973,
								331.973
							],
							ix: 2
						},
						p: {
							a: 0,
							k: [
								0,
								0
							],
							ix: 3
						},
						nm: "Ellipse Path 1",
						mn: "ADBE Vector Shape - Ellipse",
						hd: false
					},
					{
						ty: "st",
						c: {
							a: 0,
							k: [
								1,
								0.835294117647,
								0.850980392157,
								1
							],
							ix: 3
						},
						o: {
							a: 0,
							k: 100,
							ix: 4
						},
						w: {
							a: 0,
							k: 2,
							ix: 5
						},
						lc: 1,
						lj: 1,
						ml: 4,
						bm: 0,
						nm: "Stroke 1",
						mn: "ADBE Vector Graphic - Stroke",
						hd: false
					},
					{
						ty: "fl",
						c: {
							a: 0,
							k: [
								1,
								0.835294117647,
								0.850980392157,
								1
							],
							ix: 4
						},
						o: {
							a: 0,
							k: 100,
							ix: 5
						},
						r: 1,
						bm: 0,
						nm: "Fill 1",
						mn: "ADBE Vector Graphic - Fill",
						hd: false
					},
					{
						ty: "tr",
						p: {
							a: 0,
							k: [
								0.479,
								0.174
							],
							ix: 2
						},
						a: {
							a: 0,
							k: [
								0,
								0
							],
							ix: 1
						},
						s: {
							a: 0,
							k: [
								119.263,
								119.263
							],
							ix: 3
						},
						r: {
							a: 0,
							k: 0,
							ix: 6
						},
						o: {
							a: 0,
							k: 100,
							ix: 7
						},
						sk: {
							a: 0,
							k: 0,
							ix: 4
						},
						sa: {
							a: 0,
							k: 0,
							ix: 5
						},
						nm: "Transform"
					}
				],
				nm: "Ellipse 1",
				np: 3,
				cix: 2,
				bm: 0,
				ix: 1,
				mn: "ADBE Vector Group",
				hd: false
			}
		],
		ip: 0,
		op: 103.000004195276,
		st: 0,
		bm: 0
	},
	{
		ddd: 0,
		ind: 6,
		ty: 4,
		nm: "base layer1",
		sr: 1,
		ks: {
			o: {
				a: 1,
				k: [
					{
						i: {
							x: [
								0.833
							],
							y: [
								0.833
							]
						},
						o: {
							x: [
								0.167
							],
							y: [
								0.167
							]
						},
						t: 45,
						s: [
							100
						]
					},
					{
						t: 105.000004276738,
						s: [
							0
						]
					}
				],
				ix: 11
			},
			r: {
				a: 0,
				k: 0,
				ix: 10
			},
			p: {
				a: 0,
				k: [
					200,
					200,
					0
				],
				ix: 2
			},
			a: {
				a: 0,
				k: [
					0,
					0,
					0
				],
				ix: 1
			},
			s: {
				a: 1,
				k: [
					{
						i: {
							x: [
								0.833,
								0.833,
								0.833
							],
							y: [
								0.833,
								0.833,
								0.833
							]
						},
						o: {
							x: [
								0.167,
								0.167,
								0.167
							],
							y: [
								0.167,
								0.167,
								0.167
							]
						},
						t: 45,
						s: [
							30,
							30,
							100
						]
					},
					{
						t: 105.000004276738,
						s: [
							100,
							100,
							100
						]
					}
				],
				ix: 6
			}
		},
		ao: 0,
		shapes: [
			{
				ty: "gr",
				it: [
					{
						d: 1,
						ty: "el",
						s: {
							a: 0,
							k: [
								331.973,
								331.973
							],
							ix: 2
						},
						p: {
							a: 0,
							k: [
								0,
								0
							],
							ix: 3
						},
						nm: "Ellipse Path 1",
						mn: "ADBE Vector Shape - Ellipse",
						hd: false
					},
					{
						ty: "st",
						c: {
							a: 0,
							k: [
								1,
								0.835294117647,
								0.850980392157,
								1
							],
							ix: 3
						},
						o: {
							a: 0,
							k: 100,
							ix: 4
						},
						w: {
							a: 0,
							k: 2,
							ix: 5
						},
						lc: 1,
						lj: 1,
						ml: 4,
						bm: 0,
						nm: "Stroke 1",
						mn: "ADBE Vector Graphic - Stroke",
						hd: false
					},
					{
						ty: "fl",
						c: {
							a: 0,
							k: [
								1,
								0.835952818627,
								0.850342933804,
								1
							],
							ix: 4
						},
						o: {
							a: 0,
							k: 100,
							ix: 5
						},
						r: 1,
						bm: 0,
						nm: "Fill 1",
						mn: "ADBE Vector Graphic - Fill",
						hd: false
					},
					{
						ty: "tr",
						p: {
							a: 0,
							k: [
								0.479,
								0.174
							],
							ix: 2
						},
						a: {
							a: 0,
							k: [
								0,
								0
							],
							ix: 1
						},
						s: {
							a: 0,
							k: [
								119.263,
								119.263
							],
							ix: 3
						},
						r: {
							a: 0,
							k: 0,
							ix: 6
						},
						o: {
							a: 0,
							k: 100,
							ix: 7
						},
						sk: {
							a: 0,
							k: 0,
							ix: 4
						},
						sa: {
							a: 0,
							k: 0,
							ix: 5
						},
						nm: "Transform"
					}
				],
				nm: "Ellipse 1",
				np: 3,
				cix: 2,
				bm: 0,
				ix: 1,
				mn: "ADBE Vector Group",
				hd: false
			}
		],
		ip: 0,
		op: 103.000004195276,
		st: 0,
		bm: 0
	}
];
var markers = [
];
var animationData = {
	v: v,
	fr: fr,
	ip: ip,
	op: op,
	w: w,
	h: h,
	nm: nm,
	ddd: ddd,
	assets: assets,
	layers: layers,
	markers: markers
};

var _templateObject$5, _templateObject2$5, _templateObject3$5, _templateObject4$5, _templateObject5$5, _templateObject6$4, _templateObject7$3, _templateObject8$1;
var Container$1 = styled.div(_templateObject$5 || (_templateObject$5 = _taggedTemplateLiteral(["\n  position: relative;\n  padding: 0;\n  margin: 0;\n  pointer-events: none;\n\n  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;\n"])));
var CenterContainer = styled.div(_templateObject2$5 || (_templateObject2$5 = _taggedTemplateLiteral(["\n  position: relative;\n"])));
var Background = styled.div(_templateObject3$5 || (_templateObject3$5 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 148px;\n  height: 148px;\n  background-size: cover;\n  border-radius: 50%;\n  background-color: transparent;\n  border: 0px !important;\n  box-shadow: none;\n  user-select: none;\n  z-index: 2;\n"])));
var ExpContainer = styled.div(_templateObject4$5 || (_templateObject4$5 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 172px;\n  height: 172px;\n  z-index: 3;\n"])));
var PictureContainer = styled.div(_templateObject5$5 || (_templateObject5$5 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 12px;\n  left: 12px;\n  padding: 0;\n  margin: 0;\n  border: none;\n  outline: 0;\n  z-index: 4;\n"])));
var Placeholder = styled.div(_templateObject6$4 || (_templateObject6$4 = _taggedTemplateLiteral(["\n  width: 172px;\n  height: 172px;\n"])));
var Picture = styled.div(_templateObject7$3 || (_templateObject7$3 = _taggedTemplateLiteral(["\n  width: 148px;\n  height: 148px;\n  background-size: cover;\n  border-radius: 50%;\n  background-color: #f5f5f5;\n  border: 0px !important;\n  box-shadow: none;\n  user-select: none;\n"])));
var LevelTag = styled.div(_templateObject8$1 || (_templateObject8$1 = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 60px;\n  height: 22px;\n  margin: 0;\n\n  bottom: 0;\n  right: 0;\n\n  border-radius: 20px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  font-size: 12px;\n  font-weight: 700;\n\n  user-select: none;\n  white-space: nowrap;\n  overflow: hidden;\n\n  color: ", ";\n  background-color: ", ";\n"])), function (props) {
  return props.active === false ? '#f5f5f5' : 'white';
}, function (props) {
  return props.active === false ? '#f5f5f5' : '#EF6971';
});
var DMProfilePic = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var pic = _ref.pic,
      level = _ref.level,
      startLevel = _ref.startLevel,
      endLevel = _ref.endLevel,
      autoPlay = _ref.autoPlay,
      showLevelBar = _ref.showLevelBar;
  var rGlow = useRef();
  var rTimer = useRef();
  var rCurRev = useRef(0);
  var rRevolutions = useRef([]);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      exp = _useState2[0],
      setExp = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      animateExp = _useState4[0],
      setAnimateExp = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      currentLevel = _useState6[0],
      setCurrentLevel = _useState6[1];

  var ExpStyle = {
    root: {},
    path: {
      stroke: "url(#grad-id)",
      strokeLinecap: 'round',
      transition: animateExp === false ? 'stroke-dashoffset 0s ease 0s' : 'stroke-dashoffset 2.0s ease 0s',
      transformOrigin: 'center center',
      transform: 'rotate(0.42turn)'
    },
    trail: {
      stroke: '#F1F1F1',
      strokeLinecap: 'round',
      transformOrigin: 'center center',
      transform: 'rotate(0.42turn)'
    }
  }; //---------------------------------------------

  var startRevolutions = useCallback(function () {
    clearTimeout(rTimer.current);
    if (rRevolutions.current.length === 0) return;
    setAnimateExp(false);
    setExp(rRevolutions.current[rCurRev.current][0]);
    rTimer.current = setTimeout(function () {
      setAnimateExp(true);
      setExp(rRevolutions.current[rCurRev.current][1]);
      rTimer.current = setTimeout(function () {
        setCurrentLevel(rRevolutions.current[rCurRev.current][2]);

        if (rRevolutions.current[rCurRev.current][1] === 100) {
          setAnimateExp(false);
          setExp(0);

          if (rGlow.current) {
            rGlow.current.stop();
            rGlow.current.play();
          }
        }

        rCurRev.current++;
        if (!rRevolutions.current[rCurRev.current]) return;else startRevolutions();
      }, 2000);
    }, 50);
  }, []); //---------------------------------------------

  var setExpToRevolutions = useCallback(function (start, end) {
    rCurRev.current = 0;
    var lvl = start.toString().split('.');
    setCurrentLevel(parseInt(lvl[0]));
    var slvl = start.toFixed(2).split('.');
    var elvl = end.toFixed(2).split('.');
    var sl = Math.trunc(start);
    var el = Math.trunc(end);
    var sexp = parseInt(slvl[1]);
    var eexp = parseInt(elvl[1]);

    if (sl === el) {
      rRevolutions.current = [[sexp, eexp, el]];
    } else {
      rRevolutions.current = [];
      rRevolutions.current.push([sexp, 100, sl + 1]);

      for (var i = sl + 1; i < el; i++) {
        rRevolutions.current.push([0, 100, i + 1]);
      }

      rRevolutions.current.push([0, eexp, el]);
    }
  }, []);
  useEffect(function () {
    return function () {
      return clearTimeout(rTimer.current);
    };
  }, []);
  useEffect(function () {
    //if (level) setCurrentLevel(Math.floor(level))
    if (level === false) setCurrentLevel(false);else setCurrentLevel(Math.floor(level));
    if (!startLevel) return;
    setExpToRevolutions(startLevel, endLevel);
    if (autoPlay && autoPlay === true) startRevolutions();
  }, [autoPlay, level, startLevel, endLevel, startRevolutions]);
  useImperativeHandle(ref, function () {
    return {
      play: function play() {
        startRevolutions();
      },
      setAndPlay: function setAndPlay(start, end) {
        setExpToRevolutions(start, end);
        startRevolutions();
      }
    };
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Container$1, null, /*#__PURE__*/React.createElement(CenterContainer, null, /*#__PURE__*/React.createElement(Player, {
    ref: rGlow,
    src: animationData,
    style: {
      height: '400px',
      width: '400px',
      position: 'absolute',
      top: '-114px',
      left: '-114px',
      zIndex: '1'
    }
  }), /*#__PURE__*/React.createElement(Background, null), showLevelBar && /*#__PURE__*/React.createElement(ExpContainer, null, /*#__PURE__*/React.createElement(CircularProgressbar, {
    styles: ExpStyle,
    strokeWidth: 4,
    circleRatio: 0.945,
    value: exp
  })), /*#__PURE__*/React.createElement(PictureContainer, null, /*#__PURE__*/React.createElement(Picture, {
    style: {
      backgroundImage: "url(".concat(pic, ")")
    }
  }), /*#__PURE__*/React.createElement(LevelTag, {
    active: currentLevel === false ? false : true
  }, "Lv ", currentLevel || 0)), /*#__PURE__*/React.createElement(Placeholder, null))), /*#__PURE__*/React.createElement(GradientSVG, {
    startColor: "#FF8171",
    endColor: "#FF6A8E",
    idCSS: "grad-id",
    rotation: "90"
  }));
});

var _templateObject$6, _templateObject2$6, _templateObject3$6, _templateObject4$6, _templateObject5$6, _templateObject6$5, _templateObject7$4, _templateObject8$2, _templateObject9, _templateObject10;
// Primary Buttons
//------------------------------------------------------------------------

var DecorButton = styled.button(_templateObject$6 || (_templateObject$6 = _taggedTemplateLiteral(["\n  user-select: none;\n  text-decoration: none;\n  text-align: center;\n  padding: ", ";\n  border-radius: 24px;\n  font-weight: 700;\n  font-size: ", ";\n  white-space: nowrap;\n  cursor: pointer;\n  margin: 0;\n  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;\n"])), function (props) {
  return props.size === 'sm' ? '7px 20px' : '8px 20px';
}, function (props) {
  return props.size === 'sm' ? '12px' : '14px';
});
var DecorDivButton = styled.div(_templateObject2$6 || (_templateObject2$6 = _taggedTemplateLiteral(["\n  user-select: none;\n  text-decoration: none;\n  text-align: center;\n  padding: ", ";\n  border-radius: 24px;\n  font-weight: 700;\n  font-size: ", ";\n  white-space: nowrap;\n  cursor: pointer;\n  margin: 0;\n  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;\n"])), function (props) {
  return props.size === 'sm' ? '7px 20px' : '8px 20px';
}, function (props) {
  return props.size === 'sm' ? '12px' : '14px';
});
var PrimeButton = styled(DecorButton)(_templateObject3$6 || (_templateObject3$6 = _taggedTemplateLiteral(["\n  color: white;\n  background-color: #ff5e6d;\n  border: 2px solid #ff5e6d;\n\n  &:hover:enabled {\n    /*background-color: transparent;*/\n    /*color: #ff5e6d;*/\n    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),  #ff5e6d;\n    border: 2px solid #c84e59;\n  }\n\n  &:hover:disabled {\n    cursor: default;\n  }\n\n  &:focus:enabled {\n    outline: none;\n  }\n\n  &:disabled {\n    color: ", ";\n    background-color: ", ";\n    border: 2px solid ", ";\n  }\n"])), function (props) {
  return props.scheme === 'dark' ? 'white' : '#555';
}, function (props) {
  return props.scheme === 'dark' ? '#333' : '#f5f5f5';
}, function (props) {
  return props.scheme === 'dark' ? '#333' : '#f5f5f5';
});
var PrimeAltButton = styled(DecorButton)(_templateObject4$6 || (_templateObject4$6 = _taggedTemplateLiteral(["\n  background-color: transparent;\n  \n  color: ", ";\n  border: 2px solid ", ";\n\n  &:hover:enabled {\n    background-color: #ff5e6d;\n    color: white;\n    border: 2px solid #ff5e6d;\n  }\n\n  &:hover:disabled {\n    cursor: default;\n  }\n\n  &:focus:enabled {\n    outline: none;\n  }\n\n  &:disabled {\n    color: ", ";\n    background-color: ", ";\n    border: 2px solid ", ";\n  }\n"])), function (props) {
  return props.color ? props.color : '#ff5e6d';
}, function (props) {
  return props.color ? props.color : '#ff5e6d';
}, function (props) {
  return props.scheme === 'dark' ? 'white' : '#555';
}, function (props) {
  return props.scheme === 'dark' ? '#333' : '#f5f5f5';
}, function (props) {
  return props.scheme === 'dark' ? '#333' : '#f5f5f5';
});
var PrimeAltDivButton = styled(DecorDivButton)(_templateObject5$6 || (_templateObject5$6 = _taggedTemplateLiteral(["\n  color: #ff5e6d;\n  background-color: transparent;\n  border: 2px solid #ff5e6d;\n\n  &:hover {\n    background-color: #ff5e6d;\n    color: white;\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  &:disabled {\n    color: ", ";\n    background-color: ", ";\n    border: 2px solid ", ";\n  }\n"])), function (props) {
  return props.scheme === 'dark' ? '#555' : 'white';
}, function (props) {
  return props.scheme === 'dark' ? '#333' : '#f5f5f5';
}, function (props) {
  return props.scheme === 'dark' ? '#333' : '#f5f5f5';
});
var DMPrimaryButton = function DMPrimaryButton(_ref) {
  var props = _extends({}, _ref);

  return /*#__PURE__*/React.createElement(PrimeButton, props, props.children);
};
var DMPrimaryAltButton = function DMPrimaryAltButton(_ref2) {
  var props = _extends({}, _ref2);

  return /*#__PURE__*/React.createElement(PrimeAltButton, props, props.children);
};
var DMPrimaryAltDivButton = function DMPrimaryAltDivButton(_ref3) {
  var props = _extends({}, _ref3);

  return /*#__PURE__*/React.createElement(PrimeAltDivButton, props, props.children);
}; //------------------------------------------------------------------------
// Coin Balance
//------------------------------------------------------------------------

var CoinBalanceContainer = styled.div(_templateObject6$5 || (_templateObject6$5 = _taggedTemplateLiteral(["\n  margin-right: 10px;\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n  align-self: center;\n  font-weight: bold;\n  white-space: nowrap;\n  font-size: ", "px;\n  cursor: pointer;\n  font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif;\n"])), function (props) {
  return props.size === 'lg' ? '13' : '12';
});
var Balance = styled.div(_templateObject7$4 || (_templateObject7$4 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (props) {
  return props.scheme === 'dark' ? '#FFFFFF' : '#000000';
});
var CoinContainer = styled.div(_templateObject8$2 || (_templateObject8$2 = _taggedTemplateLiteral(["\n  margin-left: 5px;\n  margin-right: 5px;\n"])));
var Coin = styled(SvgCoin)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  padding: 0;\n  margin: 0;\n  margin: 0 auto;\n  display: block;\n  width: ", "px;\n  height: ", "px;\n"])), function (props) {
  return props.size === 'lg' ? '24' : '19';
}, function (props) {
  return props.size === 'lg' ? '24' : '19';
});
var Count = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  background: transparent;\n  color: ", ";\n"])), function (props) {
  return props.scheme === 'dark' ? '#FFFFFF' : '#000000';
});
var DMCoinBalance = function DMCoinBalance(_ref4) {
  var scheme = _ref4.scheme,
      coins = _ref4.coins,
      onClick = _ref4.onClick,
      size = _ref4.size,
      props = _objectWithoutProperties(_ref4, ["scheme", "coins", "onClick", "size"]);

  var formatMoney = function formatMoney(amount) {
    var decimalCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var decimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
    var thousands = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';

    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      var negativeSign = amount < 0 ? '-' : '';
      var i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      var j = i.length > 3 ? i.length % 3 : 0;
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
    } catch (e) {//console.log(e)
    }
  };

  return /*#__PURE__*/React.createElement(CoinBalanceContainer, {
    size: size,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Balance, _extends({
    scheme: scheme
  }, props), "Coin Balance:"), /*#__PURE__*/React.createElement(CoinContainer, null, /*#__PURE__*/React.createElement(Coin, {
    size: size
  })), /*#__PURE__*/React.createElement(Count, _extends({
    scheme: scheme
  }, props), formatMoney(coins)));
};

export { DMActionModal, DMCoinBalance, DMModal, DMPrimaryAltButton, DMPrimaryAltDivButton, DMPrimaryButton, DMProfilePic, DMShareModal, DMSimpleModal, DMToolTipModal };
