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
test('ラベルの確認', () =>{
  const todos = [
    {
      key: 'aaa',
      title: 'aaa',
      description: 'bbb'
    }
  ];
  const app = mount(<App todos={todos}/>);
  expect(app.find('.button-entry-label').text()).toBe("Todo の登録");
  expect(app.find('.title').text()).toBe("aaa");
});
