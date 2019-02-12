/**
 * Примесь для очистки примененных фильтров
 */
export default {
  'name': 'clearFiltersMix',
  'methods': {
    // ToDo Переделать!! Сделать как у фильтров
    'clearFilters'() {
      this.$emit('clear')
    },
  },
}
