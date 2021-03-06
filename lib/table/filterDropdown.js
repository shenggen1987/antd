'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcMenu = require('rc-menu');

var _rcMenu2 = _interopRequireDefault(_rcMenu);

var _dropdown = require('../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterMenu = _react2.default.createClass({
  displayName: 'FilterMenu',
  getInitialState: function getInitialState() {
    return {
      selectedKeys: this.props.selectedKeys,
      keyPathOfSelectedItem: {}, // 记录所有有选中子菜单的祖先菜单
      visible: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      selectedKeys: nextProps.selectedKeys
    });
  },
  getDefaultProps: function getDefaultProps() {
    return {
      handleFilter: function handleFilter() {},

      column: null
    };
  },
  setSelectedKeys: function setSelectedKeys(_ref) {
    var selectedKeys = _ref.selectedKeys;

    this.setState({ selectedKeys: selectedKeys });
  },
  handleClearFilters: function handleClearFilters() {
    this.setState({
      selectedKeys: []
    }, this.handleConfirm);
  },
  handleConfirm: function handleConfirm() {
    this.setState({
      visible: false
    });
    this.props.confirmFilter(this.props.column, this.state.selectedKeys);
  },
  onVisibleChange: function onVisibleChange(visible) {
    this.setState({
      visible: visible
    });
    if (!visible) {
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    }
  },
  renderMenuItem: function renderMenuItem(item) {
    return _react2.default.createElement(
      _rcMenu.Item,
      { key: item.value },
      _react2.default.createElement(_checkbox2.default, { checked: this.state.selectedKeys.indexOf(item.value) >= 0 }),
      item.text
    );
  },
  renderMenus: function renderMenus(items) {
    var _this = this;

    var menuItems = items.map(function (item) {
      if (item.children && item.children.length > 0) {
        var _ret = function () {
          var keyPathOfSelectedItem = _this.state.keyPathOfSelectedItem;
          var containSelected = Object.keys(keyPathOfSelectedItem).some(function (key) {
            var keyPath = keyPathOfSelectedItem[key];
            return keyPath.indexOf(item.value) >= 0;
          });
          var subMenuCls = containSelected ? 'ant-dropdown-submenu-contain-selected' : '';
          return {
            v: _react2.default.createElement(
              _rcMenu.SubMenu,
              { title: item.text, className: subMenuCls, key: item.value },
              item.children.map(function (child) {
                return _this.renderMenuItem(child);
              })
            )
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
      return _this.renderMenuItem(item);
    });
    return menuItems;
  },
  handleMenuItemClick: function handleMenuItemClick(info) {
    if (info.keyPath.length <= 1) {
      return;
    }
    var keyPathOfSelectedItem = this.state.keyPathOfSelectedItem;
    if (this.state.selectedKeys.indexOf(info.key) >= 0) {
      // deselect SubMenu child
      delete keyPathOfSelectedItem[info.key];
    } else {
      // select SubMenu child
      keyPathOfSelectedItem[info.key] = info.keyPath;
    }
    this.setState({ keyPathOfSelectedItem: keyPathOfSelectedItem });
  },
  render: function render() {
    var _props = this.props;
    var column = _props.column;
    var locale = _props.locale;
    // default multiple selection in filter dropdown

    var multiple = true;
    if ('filterMultiple' in column) {
      multiple = column.filterMultiple;
    }
    var menus = _react2.default.createElement(
      'div',
      { className: 'ant-table-filter-dropdown' },
      _react2.default.createElement(
        _rcMenu2.default,
        { multiple: multiple,
          onClick: this.handleMenuItemClick,
          prefixCls: 'ant-dropdown-menu',
          onSelect: this.setSelectedKeys,
          onDeselect: this.setSelectedKeys,
          selectedKeys: this.state.selectedKeys },
        this.renderMenus(column.filters)
      ),
      _react2.default.createElement(
        'div',
        { className: 'ant-table-filter-dropdown-btns' },
        _react2.default.createElement(
          'a',
          { className: 'ant-table-filter-dropdown-link confirm',
            onClick: this.handleConfirm },
          locale.filterConfirm
        ),
        _react2.default.createElement(
          'a',
          { className: 'ant-table-filter-dropdown-link clear',
            onClick: this.handleClearFilters },
          locale.filterReset
        )
      )
    );

    var dropdownSelectedClass = '';
    if (this.props.selectedKeys.length > 0) {
      dropdownSelectedClass = 'ant-table-filter-selected';
    }

    return _react2.default.createElement(
      _dropdown2.default,
      { trigger: ['click'],
        overlay: menus,
        visible: this.state.visible,
        onVisibleChange: this.onVisibleChange,
        closeOnSelect: false },
      _react2.default.createElement(_icon2.default, { title: locale.filterTitle, type: 'filter', className: dropdownSelectedClass })
    );
  }
});

exports.default = FilterMenu;
module.exports = exports['default'];