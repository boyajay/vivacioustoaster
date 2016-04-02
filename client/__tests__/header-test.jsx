const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');
const expect = require('expect');

// have to use '.default' so that it gets the raw .jsx instead of rendered js
const Header = React.createElement(require('../app/header.js').default);

// const TestUtils = React.addons.TestUtils;

describe('Header', () => {
  it('renders a div', () => {
    // const header = ReactTestUtils.renderIntoDocument(
    //   '<div><h1>GUYS NAME THIS</h1></div>'
    // );
    // expect(header.getDOMNode().textContent).toEqual('GUYS NAME THIS');
    // const header = ReactTestUtils.renderIntoDocument(Header);
    // const AppBar = ReactTestUtils.findDOMNode(header);
    // const AppBar = ReactTestUtils.scryRenderedDOMComponentsWithTag(header, 'div');
    // console.log(AppBar);
    // const h1 = ReactTestUtils.findRenderedDOMComponentWithTag(header, 'h1');
    // console.log(h1);
    // expect(h1.getDOMNode().textContent).toEqual('Testing');
  });
});
