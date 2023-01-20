import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
import imageCompression from 'browser-image-compression'

const SignUp = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [photo, setPhoto] = useState<File>()
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()
  const { showMessage } = useMessage()

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value)
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const data = e.target.files[0]
    // const option = {
    //   maxSizeMB: 1,
    //   maxWidthOrHeight: 500,
    //   useWebWorker: true,
    //   fileType: 'image/png'
    // }
    // try {
    //   const compressedFile = await imageCompression(data, option)
    //   setPhoto(compressedFile)
    //   console.log(compressedFile);
    // } catch (error) {
    //   console.error(error);
    // }
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

  const onSubmit = async () => {
    if (photo === undefined || name === "" || email === "" || password === "") return;
    const data = {
      name,
      email,
      password,
    }
    axios
      .post(`${url}/users`, data)
      .then(async (res) => {
        const token = res.data.token
        // console.log(token);
        setCookie('token', token)
        // const data2 = URL.createObjectURL(photo)
        console.log(photo);
        const params = new FormData();
        params.append('file', photo, photo.name);

        axios
          .post(`${url}/uploads`, params, {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": 'multipart/form-data'
            }
          })
          .then((res) => {
            console.log(res);
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
          <FormControl>
            <FormLabel>名前</FormLabel>
            <Input
              type="text"
              id="name"
              onChange={handleNameChange}
              value={name}
              placeholder="ユーザー名"
            />
          </FormControl>
          <FormControl>
            <FormLabel>メールアドレス</FormLabel>
            <Input
              type="email"
              id="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="メールアドレス"
            />
          </FormControl>
          <FormControl>
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="パスワード"
            />
          </FormControl>
          <Button colorScheme="teal" type="submit" onClick={onSubmit}>
            登録
          </Button>
          <Text>登録済みの方は<Link href='/login' color='teal'>こちら</Link>から</Text>
        </Box>
      </Flex>
    </>
  )
}

export default SignUp
