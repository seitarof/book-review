import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { url } from '../../const'
import { useNavigate } from 'react-router'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import { useMessage } from '../../hooks/useMessage'

type Inputs = {
  email: string,
  password: string
}

const SignIn = () => {
  // const [cookies, removeCookie, setCookie]
  // const [isSignIn, setIsSignIn] = useState<boolean>(false)
  const { showMessage } = useMessage()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Inputs> = (d) => {
    const data = {
      email: d.email,
      password: d.password,
    }
    axios
      .post(url + '/signin', data)
      .then((res) => {
        console.log(res.data)
        navigate('/')
      })
      .catch((err) => {
        showMessage({
          title: '認証失敗',
          status: 'error'
        })
      })
  }
  return (
    <>
      <Flex align="center" justify="center" height="100vh">
        <Box w="sm" p={5} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            ログイン
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)} role='form'>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Input
                id="email"
                placeholder="メールアドレス"
                {...register('email', {
                  required: 'この項目は必須です',
                  pattern: {
                    value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                    message: "入力形式がメールアドレスではありません。"
                  }
                })}
              />
              <FormErrorMessage id='email-err'>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="パスワード"
                {...register('password', {
                  required: 'この項目は必須です',
                  minLength: { value: 1, message: "Minumum length should be 1" },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="teal" type="submit" id="submit" isLoading={isSubmitting}>
              ログイン
            </Button>
            <Text>新規登録は<Link href='/signup' color='teal'>こちら</Link>から</Text>
          </form>
        </Box>
      </Flex>
    </>
  )
}

export default SignIn
