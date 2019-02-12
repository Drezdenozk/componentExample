<template>
  <section class="l-popular" v-if="listings.length">
    <template v-for="(link, index) in listings">
      <router-link class="category__link"
                   :to="link.is_active === false ? '#' : `/catalog/${link.url}/`"
                   :disabled="link.is_active === false"
                   :class="{'last': (index === (listings.length - 1)), 'disabled': link.is_active === false}"
                   exact
      >
        {{link.name}}
      </router-link>
    </template>
  </section>
</template>

<script>
  import ListingsMixins from './listingMixin'

  /**
   * Ссылки на привязанные фильтр листинги
   * listings - массив привязанных ссылок
   */
  export default {
    'name': 'UiProductGridListingsMobile',
    'mixins': [
      ListingsMixins,
    ],
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
