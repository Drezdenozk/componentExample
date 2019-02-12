<template>
  <section class="l-listing-page-nav is-dynamic-padding-bottom" v-if="count > 1 && limit !== false" :class="{'hidden': loading}">
    <div class="component-listing-page-nav">
      <div class="l-page-nav-row">
        <div class="more-wrapper" v-show="page < count" v-if="showMore">
          <ui-show-more-button @click="updatePage(false)"/>
        </div>
        <div class="pagination-wrapper" v-if="pagination">
          <ui-pagination :clickHandler="updatePage"
                         :pageCount="count"
                         :initialPage="page"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  /**
   * Отвечает за пагинацию и кнопку "показать еще"
   * count - количество страниц
   * limit - сколько выводить на странице
   * page - текущая страница
   * loading - идет подгрузка товаров
   * Показываем блок если товаров больше 0 и лимит не равен false (показывать все)
   * В моменты когда листинг подгружает новые данные, вешаем класс hidden
   * "Показать еще" показывается только если "впереди" еще есть страницы
   */
  import paginationMixins from './mixin'
  import UiPagination from '@/components/ui/paginationMixin'
  import UiShowMoreButton from '@/components/ui/ShowMoreButton'

  export default {
    'name': 'UiProductGridPaginationDesktop',
    'mixins': [
      paginationMixins,
    ],
    'components': {
      UiShowMoreButton,
      UiPagination,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
