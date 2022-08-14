import axios from './request'

export const loginApi = (data: LoginFormItf): PromiseRef<LoginRes> =>
  axios.post('/user/login', data)

export const getArticleList = (data: {
  page: number
}): PromiseRef<ArticleListRes> => axios.post('/article/getArticleList', data)

export const getArticleById = (data: { _id: string }): PromiseRef<ArticleItf> =>
  axios.post('/article/getArticleById', data)

export const getPageInfo = (data: { page: number }): PromiseRef<PageInfo> =>
  axios.post('/article/getPageInfo', data)

export const addArticle = (data: ArticleParams): PromiseRef =>
  axios.post('/article/addArticle', data)

export const updateArticle = (data: ArticleParams): PromiseRef =>
  axios.post('/article/updateArticle', data)

export const getRecord = (): PromiseRef<RecordItf> =>
  axios.get('/article/getRecord')

export const addComment = (data: {
  userinfo: string | null
  comments: string
}): PromiseRef => axios.post('/message/addComment', data)

export const getCommentList = (data: {
  count: number
  flag: boolean
}): PromiseRef<{ total: number; list: CommentsRes[] }> =>
  axios.post('/message/getCommentList', data)

export const deleteMessage = (data: { _id: string }): PromiseRef =>
  axios.post('/message/deleteMessage', data)

export const getMessagePageInfo = (data: {
  page: number
}): PromiseRef<PageInfo> => axios.post('/message/getMessagePageInfo', data)

export const addResponse = (data: MessageParams): PromiseRef =>
  axios.post('/message/addResponse', data)

export const getUserList = (data: { page: number }): PromiseRef<UserList> =>
  axios.post('/userinfo/getUserList', data)

export const getUserPageInfo = (data: { page: number }): PromiseRef<PageInfo> =>
  axios.post('/userinfo/getUserPageInfo', data)
