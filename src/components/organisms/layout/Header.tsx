import { Box, Button, Flex, Heading, LinkBox, Text } from '@chakra-ui/react'
import axios from 'axios'
import { remove } from 'cypress/types/lodash'
import React, { FC, memo, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { url } from '../../../const'

const Header: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [username, setUsername] = useState<string>('')
  const navigate = useNavigate()

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
    if (cookies.token) {
      axios
        .get(`${url}/users`, {
          headers: {
            Authorization: `
          Bearer ${cookies.token}
        `,
          },
        })
        .then((res) => {
          setUsername(res.data.name)
        })
        .catch((err) => {
          console.error(err)
          removeCookie('token')
        })
    }
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
        <Text onClick={onClickProfile}>プロフィール</Text>
        <Text onClick={onClickCreateReview}>レビュー登録</Text>

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
}

Header.displayName = 'Header'

export default Header
