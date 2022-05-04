import React from 'react';
<<<<<<< HEAD
import Enzyme, { shallow, mount } from 'enzyme';
=======
import Enzyme, { mount } from 'enzyme';
>>>>>>> second-sprint
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import SignIn from './SignIn';
import store from '../../store/configureStore';

describe('SignIn', () => {
  it('render Form ', () => {
    const component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    expect(component.find('Form')).toHaveLength(1);
  });
});
