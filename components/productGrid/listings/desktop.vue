<template>
  <section class="l-top-filter"
           v-if="listings.length"
  >
    <ui-button v-for="(link, index) in listings"
               tag="router-link"
               :disabled="link.is_active === false"
               exact
               :to="link.is_active === false ? '#' : `/catalog/${link.url}/`"
               filterLink
               :key="index"
    >
      {{ link.name }}
      <template v-if="link.tooltip">
        <ui-tooltip class="link__ui-tooltip"
                    position="bottom"
                    trigger="hover"
                    small
        >
          <svgicon name="about"
                   class="link__icon"
                   width="16"
                   height="16" color="#ffffff #9b9b9b"
          />
          <template slot="content">
            {{ link.tooltip }}
          </template>
        </ui-tooltip>
      </template>
    </ui-button>
  </section>
</template>

<script>
  import '@/components/icons/about'
  import ListingsMixins from './listingMixin'
  import UiTooltip from '@/components/ui/Tooltip'
  import UiButton from '@/components/ui/Button'

  /**
   * Ссылки на привязанные фильтр листинги
   * listings - массив привязанных ссылок
   */
  export default {
    'name': 'UiProductGridListingsDesktop',
    'mixins': [
      ListingsMixins,
    ],
    'components': {
      UiTooltip,
      UiButton,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
