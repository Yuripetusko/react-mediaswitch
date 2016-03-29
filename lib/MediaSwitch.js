var MediaSwitch, PropTypes, React, div, eq, extend,
  __hasProp = {}.hasOwnProperty;

React = require('react');

eq = require('./eq');

extend = require('xtend');

div = React.DOM.div;

PropTypes = React.PropTypes;

MediaSwitch = React.createClass({
  displayName: 'MediaSwitch',
  propTypes: {
    component: PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      component: div
    };
  },
  getInitialState: function() {
    return {
      wasMounted: false,
      mediaMatches: {}
    };
  },
  componentWillMount: function() {
    return this.updateMqls();
  },
  updateMqls: function() {
    var listeners, mcase, media, mql, mqls, _i, _len, _ref;
    this.removeMqlListeners();
    mqls = {};
    listeners = [];
    _ref = this.props.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      mcase = _ref[_i];
      media = mcase.props.media;
      if (!media) {
        throw new Error('Missing media prop');
      }
      if (mqls[media] == null) {
        if (mql = typeof window !== "undefined" && window !== null ? typeof window.matchMedia === "function" ? window.matchMedia(media) : void 0 : void 0) {
          mqls[media] = mql;
          mql.addListener(this.handleMqlChange);
        }
      }
    }
    this.mqls = mqls;
    return this.updateMediaMatches();
  },
  removeMqlListeners: function() {
    var media, mql, _ref;
    if (this.mqls) {
      _ref = this.mqls;
      for (media in _ref) {
        if (!__hasProp.call(_ref, media)) continue;
        mql = _ref[media];
        mql.removeListener(this.handleMqlChange);
      }
    }
  },
  setMqlState: function(media, matches) {
    var newValue;
    if (this.state.mediaMatches[media] !== matches) {
      newValue = extend(this.state.mediaMatches);
      newValue[media] = matches;
      return this.setState({
        mediaMatches: newValue
      });
    }
  },
  handleMqlChange: function(changedMql) {
    var media, mql, _ref;
    _ref = this.mqls;
    for (media in _ref) {
      if (!__hasProp.call(_ref, media)) continue;
      mql = _ref[media];
      if (mql.media === changedMql.media) {
        this.setMqlState(mql.media, mql.matches);
      }
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.children !== this.props.children) {
      return true;
    }
    if (nextState.wasMounted !== this.state.wasMounted) {
      return true;
    }
    if (!eq(nextState.mediaMatches, this.state.mediaMatches)) {
      return true;
    }
    return false;
  },
  componentDidMount: function() {
    return this.setState({
      wasMounted: true
    });
  },
  componentWillUnmount: function() {
    return this.removeMqlListeners();
  },
  updateMediaMatches: function() {
    var media, mediaMatches, mql, _ref;
    mediaMatches = {};
    _ref = this.mqls;
    for (media in _ref) {
      if (!__hasProp.call(_ref, media)) continue;
      mql = _ref[media];
      mediaMatches[media] = mql.matches;
    }
    return this.setState({
      mediaMatches: mediaMatches
    });
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (prevProps.children !== this.props.children) {
      return this.updateMqls();
    }
  },
  getMatchingCase: function() {
    var defaultCase, matchingCase, mcase, wasMounted, _i, _len, _ref;
    defaultCase = null;
    matchingCase = null;
    wasMounted = this.state.wasMounted;
    _ref = this.props.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      mcase = _ref[_i];
      if (mcase.props.initial && !wasMounted) {
        return mcase;
      }
      if (this.state.mediaMatches[mcase.props.media]) {
        if (wasMounted) {
          return mcase;
        } else {
          if (matchingCase == null) {
            matchingCase = mcase;
          }
        }
      }
      if (mcase.props["default"]) {
        defaultCase = mcase;
      }
    }
    return matchingCase || defaultCase;
  },
  render: function() {
    return this.props.component(null, this.renderChildren());
  },
  renderChildren: function() {
    var handler, mcase;
    mcase = this.getMatchingCase();
    handler = mcase.props.handler;
    if (handler) {
      return handler();
    } else {
      return mcase.props.children;
    }
  }
});

module.exports = MediaSwitch;
