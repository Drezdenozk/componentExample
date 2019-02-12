<template>
  <div class="ui-product-grid" :class="{'ui-product-grid--negative-margin': negativeMargin}">
    <section class="l-listing">
      <listings-desktop v-if="config.listings" :listings="listings" />
      <section class="l-listing-box">
        <aside class="l-listing-sidebar l-sidebar-width-with-margin is-dynamic-padding-hori is-dynamic-padding-bottom" v-if="config.sidebar">
          <section class="l-listing-filter" v-if="config.filters">
            <filters-desktop @update="update" :preSelected="list" :popularList="popular" :categoryId="id" :key="id" @clear="clear"/>
          </section>
          <no-ssr>
            <ui-banners class="l-listing-sidebar__banner"
                        placement="listing_sidebar"
                        :defaultHidden="true"
                        :height="325"
            />
          </no-ssr>
        </aside>
        <section class="l-listing-content">
          <bar-helper-desktop @change="change" :display="display" :limit="limit" :sort="sort" v-if="config.sorts" :total="totalProducts"/>

          <section class="l-listing-items">
            <no-item-found-desktop :loading="loading" :total="products.length" @clear="clear"/>
            <items-desktop :startPage="startPage" :page="page" :display="display" :category="category" :merge="onMerge" :loading="(onMerge ? false : loading)" :total="totalProducts" :list="products" v-show="products.length"/>
            <div :class="{'on-merge': onMerge}">
              <ui-loader-block :isShow="loading" />
            </div>
          </section>

          <pagination-helper-desktop @change="change" :total="totalProducts" :limit="limit" :page="page" :loading="loading" v-if="(config.showMore || config.pagination) && products.length" :showMore="config.showMore" :pagination="config.pagination" />
        </section>
      </section>
    </section>


  </div>
</template>

<script>
  import gridMixins from './gridMixin'
  import UiBanners from '@/components/ui/Banners'
  import UiLoaderBlock from '@/components/ui/LoaderBlock'
  import paginationHelperDesktop from '@/components/ui/productGrid/pagination/desktop'
  import barHelperDesktop from '@/components/ui/productGrid/bar/desktop'
  import noItemFoundDesktop from '@/components/ui/productGrid/noitem/desktop'
  import itemsDesktop from '@/components/ui/productGrid/items/desktop'
  import listingsDesktop from '@/components/ui/productGrid/listings/desktop'
  import filtersDesktop from '@/components/ui/productGrid/filters/desktop'

  export default {
    'name': 'UiProductGridDesktop',
    'components': {
      UiLoaderBlock,
      barHelperDesktop,
      paginationHelperDesktop,
      noItemFoundDesktop,
      itemsDesktop,
      listingsDesktop,
      UiBanners,
      filtersDesktop,
    },
    'mixins': [
      gridMixins,
    ],
  }
</script>

<style scoped lang="scss">
  // Путь до scss компонента
</style>
