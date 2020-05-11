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

import Form from './form'

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
  const form = shallow(<Form />);
  expect(form.find('.button-entry-label').text()).toBe("Todo の登録");
});
test('タイトルのみの Todo が作れるか', () => {
  const fn = jest.fn();
  const form = shallow(<Form todos={[]} setTodo={fn} isTest={true} testKey={'aaa'}/>);
  expect(form.find('.todo-title-input').text()).toEqual('');

  // name = e.target.name
  // value = e.target.value
  const dummyEvent = {
    target: {
      name: 'title',
      value: 'aaaa'
    }
  }
  form.find('.todo-title-input').simulate('change', dummyEvent);
  form.find('.button-entry').simulate('click');
  const expectTodos = [{
    'key': 'aaa',
    'description': '',
    'title': 'aaaa'
  }];
  expect(fn.mock.calls[0][0]).toStrictEqual(expectTodos);
});
/*
test('state の値で get したらちゃんと todos にはいることの確認', () =>{
  const fn = jest.fn(() => {
    const res = {
      title: 'aaa',
      description: 'bbb'
    }
    return res;
  });
  console.log(fn());
  expect(1).toBe(1);
});

test('タイトルと説明入れて登録押したら todos が増えることの確認', () =>{
});

test('現状の todos で save して put してその文字列で get したら同じ todos が復元することの確認', () =>{
});

test('削除できるか', () =>{
});

// エラー
test('タイトルが空のとき', () =>{
});

test('説明が空のとき', () =>{
});

test('todos が空のとき', () =>{
});
*/
