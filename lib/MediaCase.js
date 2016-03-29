var MediaCase, PropTypes, React, div;

React = require('react');

PropTypes = React.PropTypes;

div = React.DOM.div;

MediaCase = React.createClass({
  displayName: 'MediaCase',
  getDefaultProps: function() {
    return {
      "default": false,
      initial: false
    };
  },
  propTypes: {
    media: PropTypes.string.isRequired,
    "default": PropTypes.bool,
    initial: PropTypes.bool,
    handler: PropTypes.func
  },
  render: function() {}
});

module.exports = MediaCase;
