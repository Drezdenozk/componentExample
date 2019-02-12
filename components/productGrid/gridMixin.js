/**
 * Примесь для использования $emit от пагинации, кнопки Показать Еще,
 * Смены типа вывода списка товаров, лимиты, сортировки, применение фильтров
 */

/**
 * Возвращаем пересечения элементов
 * @param first|Array
 * @param second|Array
 * @returns {*|Array.<T>|{type, default}|{type}}
 */
const intersect = (first, second) => {
  if (second.length > first.length) {
    return second.filter((element) => first.indexOf(element) > -1)
  }
  return first.filter((element) => second.indexOf(element) > -1)
}

export default {
  'name': 'UIProductGridMixin',
  'props': {
    'data': { // Данные каталогу данной сущности
      'type': Object,
      'required': true,
    },
    'id': { // ID сущности
      'type': [
        String,
        Number,
      ],
      'required': true,
    },
    'listings': { // Список фильтр-листингов
      'type': Array,
      'default': () => [],
    },
    'popular': { // Список популярного
      'type': Array,
      'default': () => [],
    },
    'loader': { // Ф-ия загрузчик товаров
      'type': Function,
      'required': true,
    },
    'config': { // Конфиг компонента
      'type': Object,
      'required': true,
    },
    'negativeMargin': { // Необходимо ли добавить отрицательный margin
      'type': Boolean,
      'default': false,
    },
    'filter': { // Фильтры переданные по дефолту с данной категорией
      'type': Object,
      'default': () => {},
    },
  },
  'created'() {
    this.list = this.data.defaults.list
  },
  'methods': {
    /**
     * Обновляем роут (возможно тут редирект)
     * @param query|Object
     * @param replace|Object
     */
    'refreshURL'(query, replace) {
      const param = replace ? 'replace' : 'push'
      this.$router[param]({
        query,
      })
    },
    /**
     * Докидываем данные в data при необходимости
     * @param query|Object
     */
    'repairState'(query) {
      if (query) {
        Object.keys(query).forEach((item) => {
          if (item !== 'noreload' && item !== 'merge' && item !== 'useHash') {
            this[item] = query[item]
          }
        })
      } else {
        let limit = 24
        let page = 1
        let sort = 'by_popular'
        let display = 'grid'
        try {
          if (this.data.defaults.config.limit === false || this.data.defaults.config.limit === 'false') {
            limit = false
          } else if (this.data.defaults.config.limit) {
            limit = parseInt(this.data.defaults.config.limit, 10)
          }
        } catch (error) {
          console.warn(error)
        }
        try {
          page = parseInt(this.data.defaults.config.page, 10) || 1
        } catch (error) {
          console.warn(error)
        }
        try {
          sort = this.data.defaults.config.sort || 'by_popular'
        } catch (error) {
          console.warn(error)
        }
        try {
          display = this.data.defaults.config.display || 'grid'
        } catch (error) {
          console.warn(error)
        }
        this.startPage = 0
        this.onMerge = false
        this.list = {}
        this.limit = limit
        this.sort = sort
        this.page = page
        this.display = display
        this.loading = false
        // ToDo убрать хардкод лишних параметров
        this.category = {
          'id': this.id,
          'name': 'Перфораторы',
        }
      }
    },
    /**
     * Что мы делаем после удачного запроса на обновление товаров
     * Возможно требуется редирект на страницу листинг + бренд / фильтрлистинг / фильтрлистинг + бренд
     * @param clear|Boolean
     */
    'afterQuery'(clear) {
      const finalQuery = (Object.assign(
        {},
        this.modifyConfig(this.data.defaults).config,
        this.modifyConfig(this.data.defaults).list,
        this.display !== 'grid' ? {
          'display': this.display,
        } : undefined
      ))
      // toDo Перенести все в ноду
      const preDefinedFilters = Object.keys(this.filter || {})
      const executedFilters = Object.keys(finalQuery || {})
      let checkForRedirect = true
      if (preDefinedFilters.length) {
        if (intersect(preDefinedFilters, executedFilters).length === preDefinedFilters.length) {
          // Все фильтры для редиректа есть в наличии
          preDefinedFilters.forEach((filter) => {
            if (this.filter[filter].length === finalQuery[filter].length) {
              this.filter[filter].forEach((filterValue) => {
                if (filterValue === 'true') {
                  if (finalQuery[filter].indexOf('есть') !== -1 || finalQuery[filter].indexOf('да') !== -1) {
                    // В наличии значения для редиректа
                  } else {
                    // В наличии нет значения для редиректа
                    checkForRedirect = false
                  }
                } else {
                  if (finalQuery[filter].indexOf(filterValue) !== -1) {
                    // В наличии значения для редиректа
                  } else {
                    // В наличии нет значения для редиректа
                    checkForRedirect = false
                  }
                }
              })
            } else {
              // - В одном из фильров для редиректа выбрано более или менее значений необходимых для редиректа
              checkForRedirect = false
            }
          })
        } else {
          // Не все фильтры для редиректа есть в наличии
          checkForRedirect = false
        }
      } else {
        checkForRedirect = false
      }
  
      /**
       * Делаем запрос к api чтобы узнать страницу куда мы должны перекинуть
       */
      if (checkForRedirect) {
        this.$axios.post(
          '/api/page-redirect',
          {
            'path': this.$route.path,
            'category': this.id,
            'query': finalQuery,
          },
        )
          .then((res) => {
            // ToDo: Прокинуть res.url в ф-ию редиректа
            this.beforeRedirect(clear, finalQuery)
          })
          .catch((error) => {
            console.dir(error)
            // Данной ситуации быть не должно
            this.beforeRedirect(clear, finalQuery)
          })
      } else {
        this.beforeRedirect(clear, finalQuery)
      }
    },
    /**
     * Снимаем прелоадер с блока товаров
     * @param clear|Boolean
     * @param finalQuery|Object
     */
    'beforeRedirect'(clear, finalQuery) {
      if (clear) {
        this.refreshURL(null, true)
      } else {
        this.refreshURL(finalQuery)
      }
      this.loading = false
    },
    /**
     * Возможно что данный запрос может использовать hash
     * @param config|Object
     * @param hash|String
     */
    'modifyConfig'(config, hash) {
      if (!hash) {
        return Object.assign({}, config, {
          'config': {
            'limit': this.limit,
            'page': this.page,
            'sort': this.sort,
          },
          'list': this.list,
        })
      }
      return Object.assign({}, config, {
        'config': {
          'limit': this.limit,
          'page': this.page,
          'sort': this.sort,
        },
        'list': this.list,
        hash,
      })
    },
    /**
     * $emit от дочерних компонентов на очистку
     */
    'clear'() {
      this.loading = true
      const clearData = this.data.defaults
      const defValue = this.data.defaults.default
      this.loader(this.$axios, Object.assign(this.data.defaults, {
        'config': defValue,
      }), this.id)
        .then((data) => {
          this.$emit('update', Object.assign(data, {
            'defaults': {
              ...clearData,
            },
          }))
          this.repairState((Object.assign(this.modifyConfig(this.data.defaults))).default)
        })
        .finally(() => {
          this.afterQuery(true)
        })
    },
    /**
     * $emit от дочерних компонентов на изменение
     * @param config|Object
     */
    'update'(query) {
      this.loading = true
      this.page = 1
      this.list = query
      const defaults = {
        'config': this.data.defaults.config,
        'defaults': this.data.defaults.default,
        'kladr': this.data.defaults.kladr,
        'list': query,
        'hash': null,
      }
      this.loader(this.$axios, this.modifyConfig(this.data.defaults, null), this.id)
        .then((data) => {
          this.$emit('update', Object.assign(data, {
            'defaults': {
              ...defaults,
            },
          }))
        })
        .finally(() => {
          this.afterQuery()
        })
    },
    /**
     * $emit от дочерних компонентов на изменение
     * @param config|Object
     */
    'change'(query) {
      let reload = true
      let merge = false
      let hash
      this.repairState(query)
      if (query.noreload) {
        reload = false
        delete query.noreload
      }
      if (query.useHash) {
        // Добавить HASH!!!
        hash = this.data.paginated_data || null
        delete query.useHash
      } else {
        hash = null
      }
      if (query.merge) {
        this.onMerge = true
        this.startPage = query.page - 1
        merge = true
        delete query.merge
      } else {
        this.onMerge = false
        this.startPage = 0
      }
      if (!reload) {
        this.refreshURL((Object.assign({}, this.modifyConfig(this.data.defaults).config, query)))
      } else {
        this.loading = true
        this.loader(this.$axios, this.modifyConfig(this.data.defaults, hash), this.id)
          .then((data) => {
            const defaults = this.modifyConfig(this.data.defaults)
            if (merge) {
              defaults.merge = true
            }
            this.$emit('update', Object.assign(data, {
              'defaults': {
                ...defaults,
              },
            }))
          })
          .finally(() => {
            this.afterQuery()
          })
      }
    },
  },
  'computed': {
    'hash'() {
      // ToDo переименовать поле в node в hash!!
      return this.data.paginated_data || null
    },
    'totalProducts'() {
      return this.data.total || 0
    },
    'products'() {
      return this.data.data || []
    },
  },
  'data'() {
    let limit = 24
    let page = 1
    let sort = 'by_popular'
    let display = 'grid'
    try {
      if (this.data.defaults.config.limit === false || this.data.defaults.config.limit === 'false') {
        limit = false
      } else if (this.data.defaults.config.limit) {
        limit = parseInt(this.data.defaults.config.limit, 10)
      }
    } catch (error) {
      console.warn(error)
    }
    try {
      page = parseInt(this.data.defaults.config.page, 10) || 1
    } catch (error) {
      console.warn(error)
    }
    try {
      sort = this.data.defaults.config.sort || 'by_popular'
    } catch (error) {
      console.warn(error)
    }
    try {
      display = this.data.defaults.config.display || 'grid'
    } catch (error) {
      console.warn(error)
    }
    return {
      'startPage': 0, // Начинать строго с указанной страницы
      'onMerge': false, // Сработала кнопка "показать еще"
      'list': {}, // Список фильтров привязанных к сущности
      limit, // Показывать на странице
      sort, // Текущая сортировка
      page, // Текущая страница пагинатора
      display, // Грид или Табличный вид
      'loading': false, // Данные обновляются
      'category': { // Удалить хардкод
        'id': this.id,
        'name': 'Перфораторы',
      },
    }
  },
}
