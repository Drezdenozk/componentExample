<template>
  <div v-if="!loading && total === 0" class="nothing-found">
    <div class="nothing-found__title">Нет подходящих товаров</div>
    <div class="nothing-found__desc">Попробуйте смягчить условия поиска</div>
    <ui-button @click="clearFilters"
               type="button"
               grey
    >
      Сбросить фильтр
    </ui-button>
  </div>
</template>

<script>
  /**
   * Вывод блока "По вашему запросу товаров не найдено"
   * total - количество товаров
   * loading - идет подгрузка товаров
   */
  import noitemMixins from './noItemMixin'
  import clearMixins from '../clearMixin'
  import UiButton from '@/components/ui/Button'

  export default {
    'name': 'ProductGridNoItemDesktop',
    'mixins': [
      noitemMixins,
      clearMixins,
    ],
    'components': {
      UiButton,
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
