<template>
  <section class="l-filter-wrapper" v-show="total && total > 1">
    <section class="l-filter">
      <button class="l-filter__button"
              @click="showSorts = true"
      >
        {{ sortName }}
        <svgicon class="arrow-sort"
                 name="arrow-small"
                 width="9"
                 height="9"
                 dir="down"
                 color="#282828 #282828"
        />
      </button>
      <button id="show-modal"
              class="l-filter__button"
              @click="enableFilters === true ? $emit('showFilters', true) : true"
              :class="{'l-filter__button--disabled': !enableFilters}"
      >
        Фильтры
      </button>
      <ui-modal-mobile :show="showSorts" @close="onClose" >
        <div slot="header">Сортировать</div>
        <div slot="body">
          <div class="sort-row"
               @click="switchSort(sort)"
               v-for="(name, sort) in sorts"
          >
            <span>{{ name }}</span>
            <svgicon v-if="sortName === name"
                     name="tick"
                     height="17"
                     width="17"
            />
          </div>
        </div>
      </ui-modal-mobile>
    </section>
  </section>
</template>

<script>
  /**
   * Отвечает за бар с кнопками "По рейтингу", "Фильтры". Если не передан слот filters то
   * кнопка Фильтры ставится disabled
   */
  import '@/components/icons/arrow-small'
  import '@/components/icons/tick'

  import barMixins from './barMixin'
  import UiModalMobile from '@/components/ui/ModalMobile'
  import scrollTo from '@/utils/scrollTo'

  export default {
    'name': 'ProductGridBarMobile',
    'mixins': [
      barMixins,
    ],
    'components': {
      UiModalMobile,
    },
    'computed': {
      'sortName'() { // Сортируем
        return this.sorts[this.sort || 'by_popular']
      },
    },
    'data'() {
      return {
        'showSorts': false, // Показать модалку с сортировкой
        'sorts': { // Ключи фильтров
          'by_popular': 'По популярности',
          'by_price': 'По цене',
          'by_rating': 'По рейтингу',
          'by_discount': 'По скидке',
        },
      }
    },
    'props': {
      'enableFilters': {
        'type': Boolean,
        'default': false,
      },
      'showFilters': {
        'type': Boolean,
        'default': false,
      },
    },
    'methods': {
      /**
       * Событие по закрытию модалок
       */
      onClose() {
        this.showSorts = false
      },
      /**
       * Сменить сортировку
       */
      switchSort(sort) {
        this.changeSort({
          sort,
        })
        setTimeout(() => { // Через секунду после закрытия - скролл до товаров
          this.showSorts = false
          scrollTo(document.querySelector('.l-listing-box'), {
            'offset': -60,
          })
        }, 1000)
      },
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
