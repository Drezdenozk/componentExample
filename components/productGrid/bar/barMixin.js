/**
 * Примесь для смены типа показа списка товара, лимита, сортировок
 */
export default {
  'name': 'UIBarMix',
  'props': {
    'sort': {
      'type': String,
    },
    'total': {
      'type': Number,
      'default': 0,
    },
  },
  'methods': {
    /**
     * Изменить тип показа
     * @param value|String
     */
    'changeDisplay'(value) {
      const query = Object.assign({}, this.$route.query)
      query.display = value
      query.noreload = true
      this.$emit('change', query)
    },
    /**
     * Изменить лимит показа
     * @param values|Object
     */
    'changeLimit'(values) {
      const query = Object.assign({}, this.$route.query)
      query.limit = values.limit
      query.page = 1
      this.$emit('change', query)
    },
    /**
     * Обновить параметры показа
     * @param values|Object
     */
    'changeSort'(values) {
      const query = Object.assign({}, this.$route.query)
      query.sort = values.sort
      query.page = 1
      this.$emit('change', query)
    },
  },
}
