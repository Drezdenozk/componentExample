<template>
  <section class="l-listing-sort">
    <ui-catalog-widgets class="component-listing-sort"
                        @type="changeDisplay"
                        @limit="changeLimit"
                        @switch="changeSort"
                        :limit="limit"
                        :sort="sort"
                        :type="display"
                        :showLimit="total > 24"
    />
  </section>
</template>

<script>
  /**
   * Отвечает за бар c лимитами, сортировками и прочим
   */
  import barMixins from './barMixin'
  import UiCatalogWidgets from '@/components/ui/CatalogWidgets'

  export default {
    'name': 'ProductGridBarDesktop',
    'mixins': [
      barMixins,
    ],
    'components': {
      UiCatalogWidgets,
    },
    'props': {
      'display': {
        'type': String,
      },
      'limit': {
        'type': [
          Number,
          Boolean,
        ],
      },
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
