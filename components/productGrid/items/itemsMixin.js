/**
 * Примесь для вывода листинга товаров
 */
import {
  ecommerceList,
  ecommerceProductClick
} from '@/utils/ecommerce'
export default {
  'name': 'UIItemsMix',
  'props': {
    'loading': { // в настоящий момент идет подгрузка данных
      'type': Boolean,
      'default': true,
    },
    'page': { // Страница
      'type': Number,
      'default': 1,
    },
    'startPage': { // Страница с которой начали нажимать "Показать еще"
      'type': Number,
      'default': 1,
    },
    'total': { // Всего товаров найдено
      'type': Number,
      'default': 0,
    },
    'merge': { // Нажали кнопку "Показать еще"
      'type': Boolean,
      'default': false,
    },
    'list': { // Всего товаров найдено
      'type': Array,
      'default': () => [],
    },
    'category': { // Всего товаров найдено
      'type': Object,
      'default': () => ({
        'id': null,
        'category': null,
      }),
    },
    'display': { // Текущий вид вывода товаров
      'type': String,
    },
  },
  'watch': {
    'list'() { // При изменении содержимого списка - пушим в window данные товары
      if (Array.isArray(...this.list)) {
        ecommerceList([
          ...this.list.map((item, index) => ({
            'id': item.sku,
            'name': item.name,
            'price': item.prices.original,
            'position': index + 1,
            'category': this.page.name,
            // ToDo: 'list': this.name,
          })),
        ])
      }
    },
  },
  'methods': {
    /**
     * @param config|Object
     */
    'clickMinicard'(config) { // Событие по нажатию на любую мини-карточку
      ecommerceProductClick({
        'name': config.name,
        'id': config.sku,
        'price': config.prices.original,
        'position': this.list.findIndex((item) => item === config) + 1,
        'category': this.page.name,
        // ToDo: 'list': this.name,
      })
    },
  },
}
