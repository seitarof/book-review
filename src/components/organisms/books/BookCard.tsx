import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import { url as baseUrl } from '../../../const'

type Props = {
  id: string
  title: string
  url: string
  review: string
  reviewer: string
  isMine: boolean
}

const BookCard: FC<Props> = (props) => {
  const { id, title, url, review, reviewer, isMine } = props
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleCardClick = () => {
    axios
      .post(
        `${baseUrl}/logs`,
        { selectBookId: id },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .catch((err) => {
        console.error(err)
      })
    if (isMine) {
      navigate(`/edit/${id}`)
    } else {
      navigate(`/detail/${id}`)
    }
  }

  return (
    <>
      <Card w={400} h={400} onClick={handleCardClick}>
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <Heading size="xs">URL</Heading>
            <Link href={url}>
              {url.length > 30 ? url.substring(0, 30) + '...' : url}
            </Link>
            <Heading size="xs">レビュワー</Heading>
            <Text>{reviewer}</Text>
            <Heading size="xs">レビュー</Heading>
            <Text>{review}</Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}

export default BookCard
