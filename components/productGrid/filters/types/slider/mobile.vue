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
      <ui-slider :disabled="filter.disabled"
                 :existed="filter.list.existed"
                 :value="filter.list.selected"
                 :range="[filter.list.from, filter.list.to]"
                 @input="updateSliderValue($event)"
      />
    </div>
  </div>
</template>

<script>
  import '@/components/icons/arrow-small'

  import UiSlider from '@/components/ui/Slider'
  import UiTooltip from '@/components/ui/Tooltip'
  import UiFilterLabel from '../label'
  import typesMixins from '../mixin'

  /**
   * Фильтр, тип - слайдер
   */
  export default {
    'name': 'sliderFilter',
    'mixins': [
      typesMixins,
    ],
    'components': {
      UiSlider,
      UiTooltip,
      UiFilterLabel,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
