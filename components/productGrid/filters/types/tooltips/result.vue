<template>
  <div>
    <ui-loader-block :isShow="onLoad" transparent/>
    <span :class="{'hidden': onLoad}">
      <template v-if="refTotal && refTotal !== 0">
        <span class="refTooltip"><strong>{{refTotal}}</strong> {{ refTotal | numEnding(['товар', 'товара', 'товаров']) }}</span> <button class="refButton" v-on:click="$emit('refresh')">Показать</button>
      </template>
      <template v-else>
        Нет подходящих товаров
      </template>
    </span>
  </div>
</template>

<script>
  import UiLoaderBlock from '@/components/ui/LoaderBlock'

  /**
   * Подсказка у фильтра по выборке
   * onLoad - идет подгрузка данных по выборке
   * refTotal - количество найденного
   */
  export default {
    'name': 'desktopFilterResults',
    'components': {
      UiLoaderBlock,
    },
    'props': {
      'refTotal': { // Найдено по выборке
        'type': Number,
        'default': 0,
      },
      'onLoad': { // Ждем данных по выборке
        'type': Boolean,
      },
    },
  }
</script>

<style scoped lang="scss">
  // Путь до scss компонента
</style>
