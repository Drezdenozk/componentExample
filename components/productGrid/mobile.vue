<template>
  <div class="ui-product-grid">
    <listings-mobile v-if="config.listings" :listings="listings"></listings-mobile>
    <bar-helper-mobile @change="change" v-if="config.sorts" :sort="sort" :total="totalProducts" enableFilters :showFilters="showFilters" @showFilters="(value) => showFilters = value"/>
    <filters-mobile :preSelected="list" @update="update" @clear="clear" :popularList="popular" :showFilters="showFilters" @close="showFilters = false" :categoryId="id" :key="id"/>

    <section class="l-items l-listing-box" id="main-catalog">
      <no-item-found-mobile @clear="clear" :loading="loading" :total="products.length"></no-item-found-mobile>
      <items-mobile :page="page" :loading="(onMerge ? false : loading)" :total="totalProducts" :list="products" v-show="products.length"></items-mobile>
      <div :class="{'on-merge': loading && onMerge}">
        <ui-loader-block :isShow="loading" />
      </div>
    </section>

    <pagination-helper-mobile @change="change" :limit="limit" :page="page" :total="totalProducts" :loading="loading" v-if="(config.showMore || config.pagination) && products.length" :showMore="config.showMore" :pagination="config.pagination"></pagination-helper-mobile>

  </div>
</template>

<script>
  import gridMixins from './gridMixin'
  import UiLoaderBlock from '@/components/ui/LoaderBlock'
  import paginationHelperMobile from '@/components/ui/productGrid/pagination/mobile'
  import barHelperMobile from '@/components/ui/productGrid/bar/mobile'
  import noItemFoundMobile from '@/components/ui/productGrid/noitem/mobile'
  import itemsMobile from '@/components/ui/productGrid/items/mobile'
  import listingsMobile from '@/components/ui/productGrid/listings/mobile'
  import filtersMobile from '@/components/ui/productGrid/filters/mobile'

  export default {
    'name': 'UiProductGridMobile',
    'components': {
      UiLoaderBlock,
      barHelperMobile,
      paginationHelperMobile,
      noItemFoundMobile,
      itemsMobile,
      listingsMobile,
      filtersMobile,
    },
    'mixins': [
      gridMixins,
    ],
    'data'() {
      return {
        'showFilters': false,
      }
    },
  }
</script>

<style scoped lang="scss">
  // Путь до scss компонента
</style>
