import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Form from '../Form';

Enzyme.configure({ adapter: new Adapter() });
describe('Form component', () => {
  const formValues = {
    firstName: 'Mark',
    lastName: 'Escolano',
    birthday: '1992-21-2',
    email: 'killthatrobot@gmail.com',
    address: '24 Willbindon, Grand Area, New York',
    phoneNumber: '223232',
    gender: 'Male',
    aor: 'Now'
  };

  const componentShallow = shallow(<Form {...formValues} />);

  describe('Component Snapshot', () => {
    it('should match stored snapshot', () => {
      expect(componentShallow).toMatchSnapshot();
    });
  });

  describe('Component functionality', () => {
    it('should not submit if required fields are empty', async () => {
      const badFormValues = {
        firstName: 'Mark',
        lastName: 'Escolano',
        birthday: '1992-21-2'
      };
      const componentRender = mount(<Form {...badFormValues} />);
      const form = componentRender.find('form').first();

      await (() => {
        form.props().onSubmit();
      });
    });
  });
});
