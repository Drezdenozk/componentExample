import getProductPrice from '@/utils/getProductPrice'

const loader = (axios, config, id) => new Promise((resolve) => {
  const query = Object.assign({}, config)
  delete query.default
  axios.post(
    `/api/category/${id}/products`,
    query,
  )
    .then((res) => {
      res.data.forEach((item) => {
        item.prices = getProductPrice(item.prices)
      })
      resolve(res)
    })
})

export default loader
