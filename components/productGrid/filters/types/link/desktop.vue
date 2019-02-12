<template>
  <div :key="filter.keyword" :class="`ui-filter-block-item ui-filter-block-item__link`">
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
      <div class="list">
        <template v-for="(option, optionIndex) in (!filter.show.open ? filter.list.slice(0, filter.show.limit) : filter.list)">
          <router-link v-if="filter.show && !filter.show.open && filter.show.limit > optionIndex"
                       :to="option.value"
                       class="item ui-link"
          >
            {{ option.label }}
          </router-link>
          <router-link v-else-if="!filter.show || filter.show.open"
                       :to="option.value"
                       class="item ui-link"
          >
            {{ option.label }}
          </router-link>
        </template>
      </div>
      <template v-if="filter.show">
        <button class="show-more ui-link ui-link_reverse" @click="filter.show.open = !filter.show.open">
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

  import UiFilterLabel from '../label'
  import typesMixins from '../mixin'

  /**
   * Фильтр, тип - ссылки
   */
  export default {
    'name': 'linkFilter',
    'mixins': [
      typesMixins,
    ],
    'components': {
      UiFilterLabel,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
