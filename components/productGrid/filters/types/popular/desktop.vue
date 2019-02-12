<template>
  <div :class="`ui-filter-block-item ui-filter-block-item__popular`">
    <div class="ui-filter-block-item--header"
         @click="popularFilter.opened = !popularFilter.opened"
    >
      <svgicon name="arrow-small"
               height="9"
               class="arrows"
               width="9"
               color="#282828"
               :dir="popularFilter.opened ? 'down' : 'right'"
      /><span class="ui-filter-block-item--header-label ui-link tg-accent">
                      <span class="pre-helper">Популярные</span>
                    </span>
    </div>
    <div class="ui-filter-block-item--body type--link" v-show="popularFilter.opened">
      <div class="list">
        <template v-for="option in (popularFilter.all ? popularList : popularList.slice(0, popularLimit))">
          <template v-if="option.url.substr(0, 4) === 'http'">
            <a :href="option.url"
               :key="`${option.category_id}-${option.link_id}`"
               class="item ui-link"
            >
              {{ option.name }}
            </a>
          </template>
          <template v-else>
            <router-link
              :to="option.url"
              :key="`${option.category_id}-${option.link_id}`"
              class="item ui-link"
            >
              {{ option.name }}
            </router-link>
          </template>
        </template>
      </div>
      <template v-if="popularList.length > popularLimit">
        <button class="show-more ui-link ui-link_reverse" @click="popularFilter.all = !popularFilter.all">
          <template v-if="!popularFilter.all">
            Показать все
          </template>
          <template v-else>
            Скрыть
          </template>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
  import '@/components/icons/arrow-small'

  import typesMixins from '../mixin'

  /**
   * Фильтр, тип - популярное
   */
  export default {
    'name': 'popularFilter',
    'mixins': [
      typesMixins,
    ],
    'props': {
      'popularList': {
        'type': Array,
      },
    },
    'data'() {
      return {
        'popularLimit': 3,
        'popularFilter': {
          'opened': true,
          'all': false,
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  // Путь до scss компонента
</style>
