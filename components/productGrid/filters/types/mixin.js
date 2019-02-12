/**
 * Примесь для разных типов фильтров
 */

export default {
  'name': 'UIFiltersMix',
  'data'() {
    return {
      'list': [], // Список выбранных значений
    }
  },
  'props': {
    'showResults': { // Тултип "по результатам выборки"
      'type': [
        Boolean,
        Object,
      ],
      'default': false,
    },
    'filter': { // Сущность фильтра
      'type': Object,
    },
    'attributeTooltips': { // Тултип с данными фильтра
      'type': [
        Number,
        String,
        null,
      ],
    },
  },
  'created'() {
    if (this.filter) {
      switch (this.filter.type) {
        case 'checkbox': {
          this.filter.list.forEach((item) => {
            if (item.selected) {
              this.updateCheckboxValue(true, item.value, true)
            }
          })
          break
        }
        case 'slider': {
          if (this.filter.list.selected.length) {
            this.updateSliderValue(this.filter.list.selected, true)
          }
          break
        }
        case 'checkbox-single': {
          if (this.filter.selected) {
            this.updateCheckboxValue(true, this.filter.value, true)
          }
          break
        }
      }
    }
  },
  'methods': {
    /**
     * Стукнуть в родителя на обновление товаров
     */
    'refresh'() {
      this.$emit('refresh')
    },
    /**
     * Значения чекбоксов
     */
    'toggleUpdateEvent'(noEmit, slider, lastActivedKey) {
      this.$emit('update', this.list, this.filter.keyword, noEmit, slider, lastActivedKey)
    },
    /**
     * Значения слайдера
     */
    'updateSliderValue'(values, noEmit) {
      this.list = []
      values.forEach((val) => {
        this.list.push(val)
      })
      this.toggleUpdateEvent(noEmit, true, undefined)
    },
    /**
     * Обновить массив с "выбранным" для типа checkbox(checkbox-single)
     */
    'updateCheckboxValue'(value, option, noEmit) {
      const exist = this.list.indexOf(option)
      if (value && exist === -1) {
        this.list.push(option)
      } else if (exist !== -1) {
        this.list.splice(exist, 1)
      }
      this.toggleUpdateEvent(noEmit, false, option)
    },
    /**
     * Отсортировать и захардкодить
     */
    'sortListByLabel'(list, keyword) {
      let newList = list.map((item, index) => ({
        ...item,
        index,
      }))
      let mustBeFirst
      if (keyword === 'vendor') {
        mustBeFirst = newList
          .filter((item) => ([
            'hammer',
            'military',
            'tesla',
            'wester',
            'iron',
            'gravizappa',
          ].indexOf(`${item.label}`.toLowerCase()) !== -1))
        newList = newList.filter((item) => ([
          'hammer',
          'military',
          'tesla',
          'wester',
          'iron',
          'gravizappa',
        ].indexOf(`${item.label}`.toLowerCase()) === -1))
        newList
          .sort((first, second) => {
            if (first.label > second.label) {
              return 1
            }
            if (first.label < second.label) {
              return -1
            }
            return 0
          })
        mustBeFirst = mustBeFirst.concat(newList)
      } else {
        mustBeFirst = newList
        if (mustBeFirst.every((item) => !isNaN(item.label))) {
          return mustBeFirst.sort((first, second) => {
            if (parseFloat(first.label) > parseFloat(second.label)) {
              return 1
            }
            if (parseFloat(first.label) < parseFloat(second.label)) {
              return -1
            }
            return 0
          })
        }
        return mustBeFirst.sort((first, second) => {
          if (first.label > second.label) {
            return 1
          }
          if (first.label < second.label) {
            return -1
          }
          return 0
        })
      }
      return mustBeFirst
    },
  },
}
