import React from 'react';
import {
  render,
  unmountComponentAtNode
} from 'react-dom';
import {
  screen
} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { act } from "react-dom/test-utils";

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
it('name をつけたりつけなかったりせずに render する', () =>{
  const testProps = {
    todo : {
      title: 'My title',
      description: 'My description',
      key: 'Mykey'
    }
  }
  act(() => {
    render(<Item todo={testProps.todo} />, container);
  });
  const title = screen.getByTestId("title");
  expect(title.textContent).toBe("My title");
  const desc = screen.getByTestId("description");
  expect(desc.textContent).toBe("My description");
  const delLa = screen.getByTestId("delete-label");
  expect(delLa.textContent).toBe("削除");
});


