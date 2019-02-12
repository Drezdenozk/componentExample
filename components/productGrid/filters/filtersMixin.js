/**
 * Примесь для блока фильтрации
 */

import filterModel from '@/models/filter'
import scrollTo from '@/utils/scrollTo'

/**
 * Ищем в массиве значение
 * @param arr|Array
 * @param key|String
 */
const findInSelected = (arr, key) => arr.findIndex((element, index) => element.keyword === key)

export default {
  'name': 'UIProductGridMix',
  'props': {
    'parentUrl': { // Урл родительской категории
      'type': String,
    },
    'preSelected': { // Предопределенные фильтры
      'type': Object,
    },
    'popularList': { // Ссылки типа "популярное"
      'type': Array,
      'default': () => [],
    },
    'categoryId': { // ID категории в которой работаем
      'type': [
        Number,
        String,
      ],
    },
  },
  'computed': {
    'convertedFilters'() {
      // toDo выдать бэку пня за string вместо object
      let tempFilter = this.filters || ''
      const tempFilterObject = {}
      tempFilter = tempFilter.split('?')
      tempFilter = tempFilter[1] || ''
      tempFilter = tempFilter.split('&')
      tempFilter.forEach((item) => {
        const temp = item.split('=')
        if (temp[0] && temp[1]) {
          tempFilterObject[temp[0]] = (temp[1] === 'true' ? 'есть' : temp[1])
        }
      })
      return tempFilterObject
    },
  },
  'data'() {
    return {
      'showResults': {
        'id': null, // Доп. данные для тултипа блокировок
        'value': null, // Доп. данные для тултипа блокировок
        'total': 0, // В данной выборке по данным фильтрам найдено товаров
        'onLoad': false, // блокировщики обновляются
      },
      'attributeTooltips': {}, // Массив тултипов с подсказками
      'filtersLoaded': false, // Фильтры обновляются
      'filtersList': [], // Список фильтров
      'filtersSelected': [], // Список выбранных фильтров
      'foundByFilters': null, // В данной выборке по данным фильтрам найдено товаров
      'preventProductLoad': false, // Запретить обновление продуктов
    }
  },
  'methods': {
    /**
     * Триггер обновления фильтров
     * @param values|Array
     * @param filter|String
     * @param noUpdate|Boolean
     * @param slider|Boolean
     * @param lastActivedKey|String
     */
    'update'(values, filter, noUpdate, slider, lastActivedKey) {
      this.showResults.id = filter
      this.showResults.onLoad = true
      this.showResults.value = lastActivedKey
      /**
       * А вот тут мы можем хранить все-все последовательные действия с фильтрами юзера (хотелка от декабря)
       * ДАННЫЕ МУТИРУЮТ НЕТ СМЫСЛА 2 РАЗА КЛАСТЬ
       */
      if (!this.filtersSelected.some((item) => Object.keys(item)[0] === filter)) {
        this.filtersSelected.push({
          [`${filter}`]: values,
        })
      } else if (slider) {
        const index = this.filtersSelected.findIndex((element, index) => !element[filter] ? -1 : true)
        this.filtersSelected[index][filter] = [].concat(values)
      }
      if (!noUpdate) {
        this.preventProductLoad = true
        // Подгрузить блокировщики
        this.loadBlockers(this.returnAssigned())
          .then((res) => {
            if (res.list) {
              for (const key in res.list) {
                const index = findInSelected(this.filtersList, key)
                if (res.list[key].length) {
                  if (this.filtersList[index]) {
                    if (this.filtersList[index].type === 'slider') {
                      const len = res.list[key].length
                      this.filtersList[index].disabled = (len !== 2)
                      if (len === 2) {
                        this.filtersList[index].existed = res.list[key]
                      }
                    } else if (this.filtersList[index].type === 'checkbox') {
                      for (const item of this.filtersList[index].list) {
                        item.disabled = res.list[key].indexOf(item.value) === -1
                      }
                    } else {
                      this.filtersList[index].disabled = res.list[key].indexOf(this.filtersList[index].value) === -1
                    }
                  }
                } else {
                  if (this.filtersList[index]) {
                    if (this.filtersList[index].type !== 'checkbox') {
                      this.filtersList[index].disabled = true
                    } else {
                      for (const item of this.filtersList[index].list) {
                        item.disabled = true
                      }
                    }
                  }
                }
              }
            }
            this.showResults.total = res.total
            this.showResults.onLoad = false
            this.preventProductLoad = false
          })
          .catch(() => {
            this.showResults.total = 0
            this.showResults.onLoad = false
            this.preventProductLoad = false
          })
      }
    },
    /**
     * Запустить $emit обновления товаров
     * @param fromButton|Boolean (щелкнули по кнопке показать в подвале блока)
     */
    'refresh'(fromButton) {
      if (!this.preventProductLoad) {
        this.showResults.id = null
        if (fromButton) {
          this.showResults.onLoad = true
        }
        if (this.$device === 'mobile') {
          scrollTo(document.querySelector('.l-listing-box'), {
            'offset': -60,
          })
        } else {
          scrollTo(document.querySelector('.l-listing-box'), {
            'offset': document.querySelector('.l-listing-box').offsetTop > document.querySelector('.l-header__wrapper').offsetHeight ? -90 : 0,
          })
        }
        this.$emit('update', this.returnAssigned())
        this.$nextTick(() => {
          this.showResults.onLoad = false
        })
      }
    },
    /**
     * Модифицировать список чтобы его съел Elastic
     */
    'returnAssigned'() {
      const assigned = {}
      this.filtersSelected.forEach((item) => {
        const [
          [
            key,
            values,
          ],
        ] = (Object.entries(item))
        if (values.length) {
          assigned[key] = [
            ...values,
          ]
        }
      })
      return assigned
    },
    /**
     * Подгрузить блокировки
     * @param filterList|Object
     */
    'loadBlockers'(filterList) {
      return new Promise((resolve, reject) => {
        // ToDo Передавать с created хоть какой-то список
        if (!filterList) resolve(false)
        if (!Object.keys(filterList).length) resolve(false)
        else {
          this.$axios.post(
            `/api/category/${this.categoryId}/blockers`,
            {
              'list': filterList,
              'kladr': this.$store.state['info/countries'].kladrSelected,
            },
          )
            .then((blockers) => {
              // console.dir(blockers.list)
              // console.dir(blockers.total)
              if (!blockers.total) {
                reject(new Error())
              }
              resolve(blockers)
            })
            .catch((error) => resolve(error))
        }
      })
    },
  },
  'created'() {
    if (process.client) {
      Promise.all([
        this.$axios.get( // Список фильтров из МАСЯ
          `/api/filters/${this.categoryId}/full/${this.$store.state['info/countries'].kladrSelected}`,
        ),
        this.$axios.get( // Дефолтные блокировки для фильтров
          `/api/attrdescription/categoryId/${this.categoryId}`,
        ),
      ])
        .then(([
          res,
          attrs,
        ]) => {
          const tooltips = {}
          if (attrs) {
            attrs.forEach((item) => {
              tooltips[item.attribute_code] = item.text
            })
          }
          this.attributeTooltips = Object.assign({}, tooltips)
          const filtersRaw = res.allFilters || {}
          // const hash = res.paginated_data || null хэш тут юзать смысла нет
          const total = res.total || 0
          const filters = []
            .concat(
              Object.keys(filtersRaw).filter((item) => [
                'price',
                'vendor',
              ].indexOf(item) !== -1)
                .sort((first, second) => {
                  if (filtersRaw[first].order === filtersRaw[second].order) {
                    return 0
                  }
                  return +(filtersRaw[first].order > filtersRaw[second].order) || -1
                })
                .map((item) => Object.assign(filterModel(filtersRaw[item], this.preSelected), {
                  'opened': true,
                })),
              Object.keys(filtersRaw).filter((item) => [
                'price',
                'vendor',
              ].indexOf(item) === -1)
                .sort((first, second) => {
                  if (filtersRaw[first].order === filtersRaw[second].order) {
                    return 0
                  }
                  return +(filtersRaw[first].order > filtersRaw[second].order) || -1
                })
                .map((item) => filterModel(filtersRaw[item], this.preSelected))
            )
          filters.forEach((item) => {
            if (item.type === 'slider') {
              item.disabled = false
              item.existed = []
            } else if (item.type === 'checkbox-single') {
              item.disabled = false
            } else {
              for (const checkbox of item.list) {
                checkbox.disabled = false
              }
            }
          })
          this.filtersList = filters
          this.foundByFilters = total
          // console.dir(filters)
          // console.dir(total)
        })
        .finally(() => {
          this.filtersLoaded = true
        })
    }
  },
}
