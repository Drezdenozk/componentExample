/**
 * Примесь для использования блока "Нет товаров"
 */
export default {
  'name': 'UINoItemMix',
  'props': {
    'loading': { // в настоящий момент идет подгрузка данных
      'type': Boolean,
      'default': true,
    },
    'total': { // Всего товаров найдено
      'type': Number,
      'default': 0,
    },
  },
}
