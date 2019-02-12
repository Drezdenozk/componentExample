<template>
  <div :key="filter.keyword" :ref="filter.keyword" class="ui-filter-block-item" :data-filter="filter.keyword" :class="{'hidden': !filteredList.length}">
    <div class="ui-filter-block-item--header"
         @click="filter.opened = !filter.opened"
    >
      <svgicon name="arrow-small"
               height="9"
               class="arrows"
               width="9"
               color="#282828"
               :dir="filter.opened ? 'down' : 'right'"
      />
      <ui-filter-label :hasTooltip="!!attributeTooltips" :label="filter.label" :unit="filter.unit" :text="attributeTooltips" />
    </div>
    <div :class="'ui-filter-block-item--body type--' +  filter.type" v-show="filter.opened">

      <div v-if="filter.keyword === 'vendor' && sortedList.length > 20" class="ui-filter-block__search">
        <ui-input placeholder="Поиск по бренду"
                  type="text"
                  name="search_brand"
                  class="ui-filter-block__input"
                  v-model="searchString"
        />
      </div>
      <ui-scroll>
        <div class="list">
          <div class="item"
               v-for="(option, optionIndex) in filteredList"
               :key="`${filter.keyword}-${optionIndex}-${option.value}`"
          >
            <ui-checkbox :disabled="option.disabled"
                         :checked="option.selected"
                         :value="option.value"
                         :flex="true"
                         @change="updateCheckboxValue($event, option.value)"
            >
              <ui-tooltip position="right"
                          trigger="manual"
                          :isShow="(typeof showResults !== 'boolean' && showResults.value === option.value)  ? true : false"
                          small
                          tag="span"
              >
                {{ option.label }}
                <template slot="content">
                  <ui-filter-tooltips @refresh="refresh" :key="`${filter.keyword}-${option.label}`" :refTotal="typeof showResults === 'boolean' ? 0 : showResults.total" :onLoad="typeof showResults === 'boolean' ? true : showResults.onLoad"/>
                </template>
              </ui-tooltip>
            </ui-checkbox>
          </div>
          <div v-if="filteredList.length === 0 && searchString"
               class="ui-filter-block__empty"

          >
            Ничего не найдено
          </div>
        </div>
      </ui-scroll>
    </div>
  </div>
</template>

<script>
  import '@/components/icons/arrow-small'
  import UiScroll from '@/components/ui/Scroll'
  import UiInput from '@/components/ui/Input'
  import UiTooltip from '@/components/ui/Tooltip'
  import UiCheckbox from '@/components/ui/Checkbox'
  import UiFilterTooltips from '../tooltips/result'
  import UiFilterLabel from '../label'
  import typesMixins from '../mixin'

  /**
   * Фильтр, тип - чекбокс
   */
  export default {
    'name': 'checkbox',
    'mixins': [
      typesMixins,
    ],
    'components': {
      UiFilterTooltips,
      UiCheckbox,
      UiFilterLabel,
      UiScroll,
      UiInput,
      UiTooltip,
    },
    data() {
      return {
        'searchString': '',
      }
    },
    mounted() {
      if (!this.filteredList.length) {
        console.warn(`Фильтр ${this.filter.keyword} (${this.filter.label}) - скрыт с пустыми значениями`)
      }
    },
    'computed': {
      'sortedList'() {
        return this.sortListByLabel(this.filter.list, this.filter.keyword)
      },
      'filteredList'() {
        if (!this.searchString.length) {
          return this.sortedList
        }
        return this.sortedList.filter((el) => el.label.toString().toLowerCase()
          .indexOf(this.searchString.toLowerCase()) > -1)
      },
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>

