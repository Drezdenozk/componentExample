/**
 * Примесь для использования ссылок на фильтр-листинги
 */
export default {
  'name': 'UIListingMix',
  'props': {
    'loading': { // в настоящий момент идет подгрузка данных
      'type': Boolean,
      'default': true,
    },
    'listings': { // Всего фильтр-листингов найдено
      'type': Array,
      'default': () => [],
    },
  },
}
