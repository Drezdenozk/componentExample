<template>
  <div>
      <!--
          update - метод который здесь будет обновлять data с товарами. Первично он дергается в asyncData страницы чтобы в ssr заполнить данными
          config - базовый конфиг для компонента (что показывать, пагинацию там, все дела)
          loader - функция которая используется для подгрузки товара
          popular - отдельно получаемый список "популярных ссылок"
          listings - отдельно получаемый список "ссылок на фильтр-листинги"
          filter - предустановленные фильтры
      -->
      <ui-product-grid @update="update" :config="settings" :data="data || config" :loader="loader" :id="id" :listings="page.listings" :popular="page.popular_links" :filter="page.filter"></ui-product-grid>
  </div>
</template>

<script>
  import '@/components/icons/about'

  import mixin from '../mixin'
  import loader from '../loader'
  import UiProductGrid from '@/components/productGrid/desktop'

  export default {
    'name': 'ecommerceCatalogPageListing',
    'mixins': [
      mixin,
    ],
    'components': {
      UiProductGrid,
    },
  }
</script>

<style lang="scss" scoped>
</style>
