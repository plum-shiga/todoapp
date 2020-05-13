import React from 'react';
import {
  configure,
  shallow,
  mount
} from 'enzyme';
import {
  render,
  unmountComponentAtNode
} from 'react-dom';
import {
  screen
} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import {
  act,
  ReactTestUtils
} from "react-dom/test-utils";
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Item from './item'
import Form from './form'
import App from './app'

let container = null;
beforeEach(() => {
  // DOM 要素の render target の設定
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // テストが終わるときの cleanup
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// テスト本体
test('削除できるかどうかの確認', () =>{
  const app = mount(<App />);
  expect(app.find('.button-entry-label').text()).toBe('Todo の登録');
  const dummyEvent = {
    target: {
      name: 'title',
      value: 'aaaa'
    }
  }
  app.find('.todo-title-input input').simulate('change', dummyEvent);
  app.find('.button-entry button').simulate('click');
  const expectTodos = [{
    'description': '',
    'title': 'aaaa'
  }];
  expect(app.find('.title').text()).toBe('aaaa');
  app.find('.delete-button button').simulate('click');
  expect(app.find('.title')).to.have.lengthOf(0);
  app.unmount();
});
