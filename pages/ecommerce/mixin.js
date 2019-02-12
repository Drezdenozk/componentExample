/**
 * Примесь для использования пагинации, кнопки Показать Еще,
 * Смены типа показа списка товара, лимита, сортировок
 */

export default {
  'name': 'UIProductGridMix',
  'data'() {
    return {
      'data': false,
      'settings': {
        'pagination': true,
        'showMore': true,
        'sorts': true,
        'filters': true,
        'sidebar': true,
        'listings': true,
      },
    }
  },
  'created'() {
    this.data = this.config
  },
  'methods': {
    'update'(res) {
      let result
      if (res.defaults && res.defaults.merge) {
        delete res.defaults.merge
        const data = this.data.data.concat(res.data)
        const newRes = res
        newRes.data = data
        result = newRes
      } else {
        result = res
      }
      this.data = {
        ...result,
      }
    },
  },
}
