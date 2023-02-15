import { VStack, Heading, Box, Text, Skeleton, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router'
import { url } from '../../const'
import { Book } from '../../types/Book'

const DetailReview = () => {
  const [cookies] = useCookies(['token'])
  const params = useParams<{ id: string }>()
  const [book, setBook] = useState<Book>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${url}/books/${params.id}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`
      }
    }).then(res => {
      setBook(res.data)
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <>
      <VStack justify="center" height="80vh" spacing={6}>
        <Box w="" p={4} maxWidth={1000}>
          {isLoading ? (
            <Stack width={500}>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>
          ) : (
            <>
              <Heading as="h1">{book?.title}</Heading>
              <Text>{book?.reviewer}</Text>
              <Heading as="h2" size="md" pt={10}>詳細</Heading>
              <Text>{book?.detail}</Text>
              <Heading as="h2" size="md" pt={10}>レビュー</Heading>
              <Text>{book?.review}</Text>
            </>
          )}
        </Box>
      </VStack>
    </>
  )
}

export default DetailReview