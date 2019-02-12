<template>
  <section class="l-page-nav" v-if="count > 1 && limit !== false" v-show="!loading">
    <div class="show-more-wrapper" v-show="page < count" v-if="showMore">
      <ui-show-more-button :mobile="true" @click="updatePage(false)"/>
    </div>
    <div class="pagination-wrapper" v-if="pagination">
      <ui-pagination :clickHandler="updatePage"
                     :pageCount="count"
                     :initialPage="page"
                     spaceBetween
                     mobile
      />
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
  import paginationMixins from './paginationMixin'
  import UiPagination from '@/components/ui/Pagination'
  import UiShowMoreButton from '@/components/ui/ShowMoreButton'

  export default {
    'name': 'UiProductGridPaginationMobile',
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
