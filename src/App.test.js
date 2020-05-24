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
  expect(app.find('.title').text()).toBe('aaaa');
  app.find('.delete-button button').simulate('click');
  expect(app.find('.title')).toHaveLength(0);
  app.unmount();
});
test('post でパスワードが表示されることの確認', (done) =>{
  const app = mount(<App />);
  expect(app.find('.button-entry-label').text()).toBe('Todo の登録');
  const dummyEvent = [{
    target: {
      name: 'title',
      value: 'aaaa'
    }
  }, {
    target: {
      name: 'title',
      value: 'bbbb'
    }
  }];
  app.find('.todo-title-input input').simulate('change', dummyEvent[0]);
  app.find('.button-entry button').simulate('click');
  app.find('.todo-title-input input').simulate('change', dummyEvent[1]);
  app.find('.button-entry button').simulate('click');
  expect(app.find('.title').at(0).text()).toBe('aaaa');
  expect(app.find('.title').at(1).text()).toBe('bbbb');
  app.find('.button-savea button').simulate('click');
  /*
    *setImmediate() は現在のイベントループサイクルの終わりにコードを実行します。
    このコードは、現在のイベントループ内の I/O 操作の後、
    および次のイベントループのためにスケジュールされたタイマーの前に実行されます。
    このコードの実行は「この直後」に行われると考えることができます。
    つまり、setImmediate() 関数呼び出しに続くコードは、 setImmediate()関数引数の前に実行されます。

console.log('before immediate');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('after immediate');

    *
    * */
  setImmediate(() => {
    expect(app.find('.password-input-text input').value).toBe('aaa');

    // Jestは テストを終了する前に、done コールバックが呼ばれるまで待ちます。
    done();
  });
  app.unmount();
});
test('get が動くことの確認', () =>{
  const app = mount(<App />);
  app.unmount();
});

