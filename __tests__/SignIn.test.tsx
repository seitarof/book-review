import SignIn from '../src/components/pages/SignIn'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'

describe('<SignIn /> snapshot test', () => {
  // eslint-disable-next-line jest/expect-expect, jest/valid-title
  test('test', async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )
    const formElement = await screen.findByRole('form')

    // ボタンが存在するか
    within(formElement).getByRole('button', { name: 'ログイン' })

    // ラベルが存在するか
    within(formElement).getByLabelText('メールアドレス')
    within(formElement).getByLabelText('パスワード')

    // 入力フォームがあるか
    within(formElement).getByPlaceholderText('メールアドレス')
    within(formElement).getByPlaceholderText('パスワード')
  })
})
