<template>
  <div :key="filter.keyword" :class="`ui-filter-block-item ui-filter-block-item__${filter.keyword}`">
    <div class="ui-filter-block-item--header ui-filter-block-item--header--single">
      <ui-checkbox :disabled="filter.disabled"
                   :checked="filter.selected"
                   :value="filter.value"
                   :flex="true"
                   @change="updateCheckboxValue($event, filter.value)"
      >
        <ui-tooltip position="right"
                    trigger="manual"
                    :isShow="typeof showResults === 'boolean' ? false : true"
                    small
                    tag="span"
        >
          <ui-filter-label :hasTooltip="!!attributeTooltips" single :label="filter.label" :unit="filter.unit" :text="attributeTooltips" />
          <template slot="content">
            <ui-filter-tooltips @refresh="refresh" :key="`${filter.keyword}`" :refTotal="typeof showResults === 'boolean' ? 0 : showResults.total" :onLoad="typeof showResults === 'boolean' ? true : showResults.onLoad"/>
          </template>
        </ui-tooltip>
      </ui-checkbox>
    </div>
  </div>
</template>

<script>
  import '@/components/icons/arrow-small'

  import UiCheckbox from '@/components/ui/Checkbox'
  import UiTooltip from '@/components/ui/Tooltip'
  import UiFilterTooltips from '../tooltips/result'
  import UiFilterLabel from '../label'
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
      UiFilterLabel,
      UiTooltip,
      UiFilterTooltips,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>

