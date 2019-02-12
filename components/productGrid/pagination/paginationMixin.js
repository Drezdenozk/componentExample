/**
 * Примесь для работы с пагинацией, кнопки "Показать Еще".
 */
import scrollTo from '@/utils/scrollTo'

export default {
  'name': 'UIPaginationMix',
  'props': {
    'showMore': { // показывать кнопку "Показать Еще"
      'type': Boolean,
      'default': false,
    },
    'loading': { // в настоящий момент идет подгрузка данных
      'type': Boolean,
      'default': true,
    },
    'pagination': { // показывать цифровую пагинацию
      'type': Boolean,
      'default': false,
    },
    'page': { // Страница
      'type': Number,
      'default': 0,
    },
    'limit': { // Лимит на страницу
      'type': [
        Number,
        Boolean,
      ],
      'default': 24,
    },
    'total': { // Всего товаров найдено
      'type': Number,
      'default': 0,
    },
  },
  'computed': {
    'count'() { // Количество страниц с товарами
      return (Math.ceil(this.total / this.limit) || 0)
    },
  },
  'methods': {
    /**
     * Изменить активную страницу
     * @param value|Boolean|Number
     */
    'updatePage'(value) {
      const query = {}
      let page = 1
      let needScroll = false
      query.useHash = true
      if (value === false) {
        page = this.page + 1
        query.merge = true
      } else {
        needScroll = !needScroll
        page = value
      }
      if (page <= this.count) {
        if (needScroll) {
          // После обновления DOM
          this.$nextTick(() => {
            if (this.$device === 'mobile') {
              scrollTo(document.querySelector('.l-listing-box'), {
                'offset': -60,
              })
            } else {
              scrollTo(document.querySelector('.l-listing-box'), {
                'offset': document.querySelector('.l-listing-box').offsetTop > document.querySelector('.l-header__wrapper').offsetHeight ? -90 : 0,
              })
            }
          })
        }
        query.page = page
        // Стучим в родительский компонент что надо обновить данные
        this.$emit('change', query)
      }
    },
  },
}
