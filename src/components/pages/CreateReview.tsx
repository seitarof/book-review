import icon from '@chakra-ui/icon/dist/icon'
import {
  VStack,
  Input,
  Button,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Textarea,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { url } from '../../const'
import { useMessage } from '../../hooks/useMessage'

type Input = {
  title: string
  url: string
  detail: string
  review: string
}

const CreateReview = () => {
  const [cookies] = useCookies(['token'])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>()
  const { showMessage } = useMessage()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Input> = (value) => {
    const data = {
      title: value.title,
      url: `https://${value.url}`,
      detail: value.detail,
      review: value.review,
    }
    axios
      .post(`${url}/books`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        showMessage({ status: 'success', title: 'レビューを投稿しました！' })
        navigate('/')
      })
      .catch((err) => {
        showMessage({ status: 'error', title: err })
      })
  }
  return (
    <>
      <VStack justify="center" height="80vh" spacing={6}>
        <Box w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            レビュー登録
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.title} mt={5}>
              <FormLabel>タイトル</FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="タイトル"
                {...register('title', {
                  required: 'この項目は必須です',
                })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.url} mt={5}>
              <FormLabel>URL</FormLabel>
              <InputGroup size="sm">
                <InputLeftAddon>https://</InputLeftAddon>
                <Input
                  type="text"
                  id="url"
                  placeholder="URL"
                  {...register('url', {
                    required: 'この項目は必須です',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.url && errors.url.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.detail} mt={5}>
              <FormLabel>詳細</FormLabel>
              <Textarea
                id="detail"
                placeholder="詳細"
                {...register('detail', {
                  required: 'この項目は必須です',
                })}
              />
              <FormErrorMessage>
                {errors.detail && errors.detail.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.review} mt={5}>
              <FormLabel>レビュー</FormLabel>
              <Textarea
                id="review"
                placeholder="レビュー"
                {...register('review', {
                  required: 'この項目は必須です',
                })}
              />
              <FormErrorMessage>
                {errors.review && errors.review.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={5}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
              width="100%"
            >
              登録
            </Button>
          </form>
        </Box>
      </VStack>
    </>
  )
}

export default CreateReview
