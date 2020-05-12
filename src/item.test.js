import React from 'react';
import { configure, shallow  } from 'enzyme';
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
test('todo 通りの item になっているかの確認', () =>{
  const testProps = {
    todo : {
      title: 'My title',
      description: 'My description',
      key: 'Mykey'
    }
  }
  const item = shallow(<Item todo={testProps.todo} />);
  expect(item.find('.title').text()).toBe("My title");
  expect(item.find('.description').text()).toBe("My description");
  expect(item.find('.delete-label').text()).toBe("削除");
});


