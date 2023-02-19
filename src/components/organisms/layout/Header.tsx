import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { FC, memo, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { useUser } from '../../../hooks/useUser'

const Header: FC = memo(() => {
  const [cookies, , removeCookie] = useCookies(['token'])
  const navigate = useNavigate()
  const username = useAppSelector((state) => state.username.value)
  const { getUser } = useUser()

  const onClickTitle = () => {
    navigate('/')
  }
  const onClickProfile = () => {
    navigate('/profile')
  }
  const onClickCreateReview = () => {
    navigate('/new')
  }

  const onClickLogin = () => {
    navigate('/login')
  }
  const onClickLogout = () => {
    removeCookie('token')
    navigate('/login')
  }

  useEffect(() => {
    getUser()
    console.log(username);
  }, [username])

  return (
    <>
      <Flex
        padding={{ base: 3, md: 5 }}
        bg="gray.800"
        align="center"
        justify="space-between"
        color="white"
      >
        <Flex align="center" mr={8} onClick={onClickTitle}>
          <Box cursor="pointer">
            <Heading as="h1" fontSize={{ base: 'md', md: 'lg' }}>
              書籍レビュー
            </Heading>
          </Box>
        </Flex>
        <Text onClick={onClickCreateReview}>レビュー登録</Text>
        <Text onClick={onClickProfile}>プロフィール</Text>

        <Box fontSize="sm" display={{ base: 'none', md: 'flex' }}>
          {cookies.token ? (
            <>
              <Text pr={10}>{username}</Text>
              <Text onClick={onClickLogout}>ログアウト</Text>
            </>
          ) : (
            <Text onClick={onClickLogin}>ログイン</Text>
          )}
        </Box>
      </Flex>
    </>
  )
})

Header.displayName = 'Header'

export default Header
