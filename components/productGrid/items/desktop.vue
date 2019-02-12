<template>
  <div class="items-wrapper">
    <div class="in-stock" v-if="total" v-show="!loading">
      <div class="catalog--grid" :class="{'onGrid': (display !== 'list')}">
        <template v-for="(config, itemIndex) in list.filter((item) => item.available)">
          <template v-if="itemIndex === 12 && ((merge === true && startPage === 1) || page === 1)">
            <ui-banners class="l-listing-banner"
                        placement="listing_list"
                        :defaultHidden="true"
                        :height="110"
            />
          </template>
          <div :class="{'item--list': display === 'list', 'item--grid': display !== 'list'}"
          >
            <ui-minicard :ranks="display === 'list'"
                         :config="config"
                         :key="config.sku"
                         :category="{'id': category.id, 'name': category.name}"
                         @clickLink="clickMinicard(config)"
            />
          </div>
        </template>
        <template v-if="list.filter((item) => !item.available).length">
          <div class="listing-title" :class="{'has-padding': list.filter((item) => item.available).length}">Товары, временно отсутствующие в продаже</div>
          <template v-for="(config, itemIndex) in list.filter((item) => !item.available)">
            <template v-if="itemIndex === 12 && page === 1 && !list.filter((item) => item.available).length">
              <ui-banners class="l-listing-banner"
                          placement="listing_list"
                          :defaultHidden="true"
                          :height="110"
              />
            </template>
            <div :class="{'item--list': (display === 'list'), 'item--grid': (display !== 'list')}"
            >
              <ui-minicard :ranks="display === 'list'"
                           :config="config"
                           :key="config.sku"
                           :category="{'id': category.id, 'name': category.name}"
                           @clickLink="clickMinicard(config)"
              />
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import itemsMixins from './itemsMixin'
  import UiMinicard from '@/components/ui/Minicard'
  import UiBanners from '@/components/ui/Banners'

  /**
   * Отрисовываем компоненты товаров для данной страницы на десктопе
   * total - количество товаров
   * loading - идет подгрузка товаров
   * list - товары в выборке
   * item - сущность страницы
   */
  export default {
    'name': 'UiProductGridItemsDesktop',
    'mixins': [
      itemsMixins,
    ],
    'components': {
      UiMinicard,
      UiBanners,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
