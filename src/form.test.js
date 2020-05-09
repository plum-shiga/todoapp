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
it('ラベルの確認', () =>{
  act(() => {
    render(<Form />, container);
  });
  const title = screen.getByTestId("button-submit-label");
  expect(title.textContent).toBe("Todo の登録");
});
test('タイトルのみの Todo が作れるか', () => {
});
/*
it('button クリックで item として登録されるかの確認', () =>{

});
it('窓入力したら state に値が入ることの確認', () =>{
});

it('state の値で get したらちゃんと todos にはいることの確認', () =>{
});

it('タイトルと説明入れて登録押したら todos が増えることの確認', () =>{
});

it('現状の todos で save して put してその文字列で get したら同じ todos が復元することの確認', () =>{
});

it('削除できるか', () =>{
});

// エラー
it('タイトルが空のとき', () =>{
});

it('説明が空のとき', () =>{
});

it('todos が空のとき', () =>{
});
*/
