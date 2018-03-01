import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import SideBar from '../client/src/SideBar.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('About Component', () => {
  test('should render correctly', () => {
    expect(shallow(<SideBar />)).toMatchSnapshot();
  });
});

describe("rendered `SideBar`", () => {
  it("received four props", () => {
    const component = shallow(<SideBar />);
    expect(component.props().children.length).toBe(4);
  });
});
