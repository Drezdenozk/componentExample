<template>
  <div class="ui-filter">
    <no-ssr>
      <div class="ui-loader-preloader"
           v-show="!filtersLoaded"
      >
        <ui-loader-block />
      </div>
      <div class="ui-filter-block-wrapper"
           v-show="filtersLoaded && filtersList.length"
      >
        <div class="ui-filter-block">
          <template v-if="popularList.length">
            <component :is="'popular-filter'" :popularList="popularList"/>
          </template>
          <template v-for="filter in filtersList" :class="`ui-filter-block-item ui-filter-block-item__${filter.keyword}`">
            <component @refresh="refresh" :is="`${filter.type}-filter`" :filter="filter" :attributeTooltips="attributeTooltips[filter.keyword]" @update="update" :showResults="(showResults.id !== filter.keyword) ? false : showResults"/>
          </template>
        </div>
        <div class="ui-filter-footer">
          <ui-button class="button" size="small"
                     :loading="showResults.onLoad" @click="refresh(true)">Показать</ui-button>
          <ui-button class="button ui--clear ui--black" size="small"
                     @click="clearFilters">Сбросить</ui-button>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
  import clearMixins from '../clearMixin'
  import checkboxFilter from './types/checkbox/desktop'
  import checkboxSingleFilter from './types/checkbox-single/desktop'
  import linkFilter from './types/link/desktop'
  import popularFilter from './types/popular/desktop'
  import sliderFilter from './types/slider/desktop'
  import UiLoaderBlock from '@/components/ui/LoaderBlock'
  import filterMixins from './filtersMixin'
  import UiButton from '@/components/ui/Button'

  /**
   * Компонент фильтров для десктопа. Отрисовывает сингл-чекбокс,
   * чекбокс, слайдер цен. Добавляет подсказки. По изменению значения фильтров - вызывает
   * блокировщик и затем перезагрузку контента
   */
  export default {
    'name': 'UiFilterDesktop',
    'mixins': [
      clearMixins,
      filterMixins,
    ],
    'components': {
      UiLoaderBlock,
      checkboxFilter,
      checkboxSingleFilter,
      linkFilter,
      popularFilter,
      sliderFilter,
      UiButton,
    },
    'methods': {
      showTooltip(ref) {
        const timeClose = 1000

        this.$nextTick(() => {
          if (ref.type === 'checkbox') {
            this.tooltipList[ref.key][ref.value] = true

            this.$nextTick(() => {
              setTimeout(() => {
                if (this.tooltipList[ref.key]) {
                  this.tooltipList[ref.key][ref.value] = false
                }
              }, timeClose)
            })
          } else if (ref.type === 'checkbox-single' || ref.type === 'slider') {
            this.tooltipList[ref.key] = true

            this.$nextTick(() => {
              setTimeout(() => {
                this.tooltipList[ref.key] = false
              }, timeClose)
            })
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
