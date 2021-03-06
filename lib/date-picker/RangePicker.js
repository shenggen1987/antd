'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

var _RangeCalendar = require('rc-calendar/lib/RangeCalendar');

var _RangeCalendar2 = _interopRequireDefault(_RangeCalendar);

var _Picker = require('rc-calendar/lib/Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _rcTimePicker = require('rc-time-picker');

var _rcTimePicker2 = _interopRequireDefault(_rcTimePicker);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PickerMixin = require('./PickerMixin');

var _PickerMixin2 = _interopRequireDefault(_PickerMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = _react2.default.createClass({
  displayName: 'RangePicker',
  getDefaultProps: function getDefaultProps() {
    return {
      defaultValue: [],
      format: 'yyyy-MM-dd',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      transitionName: 'slide-up',
      popupStyle: {},
      onChange: function onChange() {},
      onOk: function onOk() {},

      locale: {},
      align: {
        offset: [0, -9]
      },
      open: false
    };
  },
  getInitialState: function getInitialState() {
    var _props = this.props;
    var value = _props.value;
    var defaultValue = _props.defaultValue;

    var start = value && value[0] || defaultValue[0];
    var end = value && value[1] || defaultValue[1];
    return {
      value: [this.parseDateFromValue(start), this.parseDateFromValue(end)]
    };
  },

  mixins: [_PickerMixin2.default],
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      var value = nextProps.value || [];
      var start = this.parseDateFromValue(value[0]);
      var end = this.parseDateFromValue(value[1]);
      this.setState({
        value: [start, end]
      });
    }
  },
  handleChange: function handleChange(value) {
    if (!('value' in this.props)) {
      this.setState({ value: value });
    }
    var startTime = value[0] ? new Date(value[0].getTime()) : null;
    var endTime = value[1] ? new Date(value[1].getTime()) : null;
    this.props.onChange([startTime, endTime]);
  },
  render: function render() {
    var _this = this;

    var locale = this.getLocale();
    // 以下两行代码
    // 给没有初始值的日期选择框提供本地化信息
    // 否则会以周日开始排
    var defaultCalendarValue = new _gregorianCalendar2.default(locale);
    defaultCalendarValue.setTime(Date.now());

    var _props2 = this.props;
    var disabledDate = _props2.disabledDate;
    var showTime = _props2.showTime;
    var size = _props2.size;
    var startPlaceholder = _props2.startPlaceholder;
    var endPlaceholder = _props2.endPlaceholder;
    var getCalendarContainer = _props2.getCalendarContainer;
    var transitionName = _props2.transitionName;
    var disabled = _props2.disabled;
    var popupStyle = _props2.popupStyle;
    var align = _props2.align;
    var style = _props2.style;
    var onOk = _props2.onOk;

    var state = this.state;

    var timePicker = null;

    if (showTime) {
      timePicker = _react2.default.createElement(_rcTimePicker2.default, {
        prefixCls: 'ant-time-picker',
        placeholder: locale.lang.timePlaceholder,
        transitionName: 'slide-up' });
    }

    var calendarClassName = (0, _classnames2.default)(_defineProperty({}, 'ant-calendar-time', this.props.showTime));

    var pickerChangeHandler = {
      onChange: this.handleChange
    };

    var calendarHandler = {
      onOk: this.handleChange
    };

    if (timePicker) {
      pickerChangeHandler.onChange = function (value) {
        // Click clear button
        if (value === null || value.length === 0) {
          _this.handleChange(value);
        }
      };
    } else {
      calendarHandler = {};
    }

    var calendar = _react2.default.createElement(_RangeCalendar2.default, _extends({
      prefixCls: 'ant-calendar',
      className: calendarClassName,
      timePicker: timePicker,
      disabledDate: disabledDate,
      dateInputPlaceholder: [startPlaceholder, endPlaceholder],
      locale: locale.lang,
      onOk: onOk,
      defaultValue: [defaultCalendarValue, defaultCalendarValue]
    }, calendarHandler));

    var pickerClass = (0, _classnames2.default)({
      'ant-calendar-picker': true,
      'ant-calendar-picker-open': state.open
    });

    var pickerInputClass = (0, _classnames2.default)({
      'ant-calendar-range-picker': true,
      'ant-input': true,
      'ant-input-lg': size === 'large',
      'ant-input-sm': size === 'small'
    });

    return _react2.default.createElement(
      'span',
      { className: pickerClass, style: style },
      _react2.default.createElement(
        _Picker2.default,
        _extends({
          transitionName: transitionName,
          disabled: disabled,
          calendar: calendar,
          value: state.value,
          prefixCls: 'ant-calendar-picker-container',
          style: popupStyle,
          align: align,
          getCalendarContainer: getCalendarContainer,
          onOpen: this.toggleOpen,
          onClose: this.toggleOpen
        }, pickerChangeHandler),
        function (_ref) {
          var value = _ref.value;

          var start = value[0];
          var end = value[1];
          return _react2.default.createElement(
            'span',
            { className: pickerInputClass, disabled: disabled },
            _react2.default.createElement('input', {
              disabled: disabled,
              onChange: _this.handleInputChange,
              value: start && _this.getFormatter().format(start),
              placeholder: startPlaceholder,
              className: 'ant-calendar-range-picker-input' }),
            _react2.default.createElement(
              'span',
              { className: 'ant-calendar-range-picker-separator' },
              ' ~ '
            ),
            _react2.default.createElement('input', {
              disabled: disabled,
              onChange: _this.handleInputChange,
              value: end && _this.getFormatter().format(end),
              placeholder: endPlaceholder,
              className: 'ant-calendar-range-picker-input' }),
            _react2.default.createElement('span', { className: 'ant-calendar-picker-icon' })
          );
        }
      )
    );
  }
});
module.exports = exports['default'];