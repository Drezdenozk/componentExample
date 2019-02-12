<template>
  <div :key="filter.keyword" :class="`ui-filter-block-item ui-filter-block-item__${filter.keyword}`">
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
      <ui-tooltip
        position="right"
        trigger="manual"
        :isShow="typeof showResults === 'boolean' ? false : true"
        small
      >
        <ui-slider :disabled="filter.disabled"
                   :value="filter.list.selected"
                   :range="[filter.list.from, filter.list.to]"
                   :existed="filter.list.existed"
                   @input="updateSliderValue($event)"
        />
        <template slot="content">
          <ui-filter-tooltips @refresh="refresh" :refTotal="typeof showResults === 'boolean' ? 0 : showResults.total" :onLoad="typeof showResults === 'boolean' ? true : showResults.onLoad"/>
        </template>
      </ui-tooltip>
    </div>
  </div>
</template>

<script>
  import '@/components/icons/arrow-small'

  import UiSlider from '@/components/ui/Slider'
  import UiTooltip from '@/components/ui/Tooltip'
  import UiFilterTooltips from '../tooltips/result'
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
      UiFilterTooltips,
      UiFilterLabel,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
