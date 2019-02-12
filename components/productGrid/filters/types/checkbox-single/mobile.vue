<template>
  <div :key="filter.keyword" :class="`ui-filter-mobile-block-item ui-filter-mobile-block-item__${filter.keyword}`">
    <div class="ui-filter-mobile-block-item--header ui-filter-mobile-block-item--header--single">
      <ui-checkbox :disabled="filter.disabled"
                   :checked="filter.selected"
                   :value="filter.value"
                   @change="updateCheckboxValue($event, filter.value)">
        <span class="ui-filter-mobile-block-item--header-label">{{filter.label}}</span>
      </ui-checkbox>
    </div>
  </div>
</template>

<script>
  import '@/components/icons/arrow-small'

  import UiCheckbox from '@/components/ui/Checkbox'
  import typesMixins from '../mixin'

  /**
   * Фильтр, тип - чекбокс (сингл)
   */
  export default {
    'name': 'checkboxSingle',
    'mixins': [
      typesMixins,
    ],
    'components': {
      UiCheckbox,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>

