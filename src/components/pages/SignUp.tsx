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
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { url } from '../../const'
import { useCookies } from 'react-cookie'
import { useMessage } from '../../hooks/useMessage'
import Compressor from 'compressorjs'
import { SubmitHandler, useForm } from 'react-hook-form'

type Input = {
  email: string
  name: string
  password: string
}

const SignUp = () => {
  const [photo, setPhoto] = useState<File>()
  const [cookies, setCookie, removeCookie] = useCookies()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>()
  const navigate = useNavigate()
  const { showMessage } = useMessage()

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const data = e.target.files[0]
    new Compressor(data, {
      quality: 0.6,
      maxWidth: 300,
      maxHeight: 300,
      mimeType: 'image/png',
      convertSize: 1000000,
      success(result) {
        setPhoto(result as File)
      },
      error(err) {
        showMessage({ title: err.message, status: 'error' })
      },
    })
  }

  const onSubmit: SubmitHandler<Input> = async (value) => {
    if (
      photo === undefined ||
      value.name === '' ||
      value.email === '' ||
      value.password === ''
    )
      return
    const data = {
      name: value.name,
      email: value.email,
      password: value.password,
    }
    axios
      .post(`${url}/users`, data)
      .then(async (res) => {
        const token = res.data.token
        setCookie('token', token)
        // const data2 = URL.createObjectURL(photo)
        console.log(photo)
        const params = new FormData()
        params.append('icon', photo, photo.name)

        axios
          .post(`${url}/uploads`, params, {
            headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res)
            showMessage({ title: '登録しました', status: 'success' })
            navigate('/login')
          })
          .catch((err) => {
            console.error(err)
            showMessage({ title: '登録できませんでした', status: 'error' })
          })
      })
      .catch((err) => {
        showMessage({ title: err, status: 'error' })
      })
  }
  return (
    <>
      <Flex align="center" justify="center" height="100vh">
        <Box w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            サインアップ
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>プロフィール画像</FormLabel>
              <Input
                variant="unstyled"
                id="file"
                type="file"
                onChange={handlePhotoChange}
                accept="image/*"
              />
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>名前</FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="ユーザー名"
                {...register('name', {
                  required: 'この項目は必須です',
                  minLength: {
                    value: 1,
                    message: 'Minumum length should be 1',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="メールアドレス"
                {...register('email', {
                  required: 'この項目は必須です',
                  pattern: {
                    value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                    message: '入力形式がメールアドレスではありません。',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="パスワード"
                {...register('password', {
                  required: 'この項目は必須です',
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
              登録
            </Button>
            <Text>
              登録済みの方は
              <Link href="/login" color="teal">
                こちら
              </Link>
              から
            </Text>
          </form>
        </Box>
      </Flex>
    </>
  )
}

export default SignUp
