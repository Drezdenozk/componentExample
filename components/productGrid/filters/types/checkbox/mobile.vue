<template>
  <div :key="filter.keyword" :class="`ui-filter-mobile-block-item ui-filter-mobile-block-item__${filter.keyword}`">
    <div class="ui-filter-mobile-block-item--header" @click="filter.opened = !filter.opened" v-if="filter.type !== 'link'">
      <span class="ui-filter-mobile-block-item--header-label">{{filter.label}}<template v-if="filter.unit"><template v-if="filter.unit === 'р'"><svgicon color="currentColor" class="ui-filter-mobile__rub" name="rub-medium" width="11" height="12"/></template><template v-else> ({{filter.unit}})</template></template></span>
      <svgicon name="arrow-small"
               height="14"
               width="14"
               :dir="filter.opened ? 'up' : 'down'"
               class="ui-filter-mobile__arrow"
      />
    </div>
    <div :class="'ui-filter-mobile-block-item--body type--' +  filter.type" v-show="filter.opened">
      <div class="list">
        <template v-for="option in (!filter.show.open ? sortListByLabel(filter.list, filter.keyword).slice(0, filter.show.limit) : sortListByLabel(filter.list, filter.keyword))">
          <div class="item">
            <ui-button-filter @click="updateCheckboxValue($event, option.value)" :disabled="option.disabled" :actived="option.selected" :value="option.value">{{option.label}}</ui-button-filter>
          </div>
        </template>
      </div>
      <template v-if="filter.show">
        <button class="show-more" @click="filter.show.open = !filter.show.open">
          <template v-if="!filter.show.open">
            Показать все
          </template>
          <template v-else>
            Скрыть
          </template>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
  import '@/components/icons/arrow-small'

  import UiButtonFilter from '@/components/ui/ButtonFilter'
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
      UiButtonFilter,
      UiFilterLabel,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>

