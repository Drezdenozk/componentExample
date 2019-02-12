<template>
  <div class="items"
       v-if="total && !loading"
  >
    <div class="item"
         v-for="item in list"
         :key="item.sku"
    >
      <ui-minicard-mobile :config="item"
                          :category="{'id': item.category.id, 'name': item.category.name}"
                          @clickLink="clickMinicard(config)"/>
    </div>
  </div>
</template>

<script>
  import itemsMixins from './itemsMixin'
  import UiMinicardMobile from '@/components/ui/MinicardMobile'

  /**
   * Отрисовываем компоненты товаров для данной страницы на мобильнике
   * total - количество товаров
   * loading - идет подгрузка товаров
   * list - товары в выборке
   * item - сущность страницы
   */
  export default {
    'name': 'UiProductGridItemsMobile',
    'mixins': [
      itemsMixins,
    ],
    'components': {
      UiMinicardMobile,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
