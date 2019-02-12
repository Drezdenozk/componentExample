<template>
  <ui-modal-mobile :show="showFilters" @close="$emit('close')">
    <div slot="header">Фильтр</div>
    <div slot="body">
      <div class="ui-filter">
        <no-ssr>
          <div class="ui-filter-block-wrapper">
            <div class="ui-filter-mobile" :class="{'active':false, 'ui-filter-mobile--disabled': false}">
              <div class="ui-filter-mobile-block">
                <template v-for="filter in filtersList" :class="`ui-filter-mobile-block-item ui-filter-mobile-block-item__${filter.keyword}`">
                  <component :is="`${filter.type}-filter`" :filter="filter" :attributeTooltips="attributeTooltips[filter.keyword]" @update="update"/>
                </template>
              </div>
            </div>
          </div>
        </no-ssr>
      </div>
    </div>
    <div slot="footer" v-show="showFooter" class="ui-filter-mobile-footer">
      <ui-button type="button"
                 class="ui--show">
        Показать ({{ refTotal | price }})
      </ui-button>
      <ui-button type="button" class="ui--clear">
        Сбросить
      </ui-button>
    </div>
  </ui-modal-mobile>
</template>

<script>
  import clearMixins from '../clearMixin'
  import checkboxFilter from './types/checkbox/mobile'
  import checkboxSingleFilter from './types/checkbox-single/mobile'
  import sliderFilter from './types/slider/mobile'
  import UiModalMobile from '@/components/ui/ModalMobile'
  import UiButton from '@/components/ui/Button'
  import UiLoaderBlock from '@/components/ui/LoaderBlock'
  import filterMixins from './filtersMixin'

  export default {
    'name': 'UiFilter',
    'mixins': [
      clearMixins,
      filterMixins,
    ],
    'components': {
      UiModalMobile,
      UiLoaderBlock,
      checkboxFilter,
      checkboxSingleFilter,
      sliderFilter,
      UiButton,
    },
    'props': {
      'showFilters': {
        'type': Boolean,
        'default': false,
      },
    },
    'data'() {
      return {
        'refTotal': 0,
        'showFooter': true,
      }
    },
    'methods': {
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
