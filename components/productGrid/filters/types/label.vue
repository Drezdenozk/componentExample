<template>
  <span class="ui-filter-block-item--header-label ui-link tg-accent" :class="{'ui-filter-block-item--header-label--single': single}">
    <template v-if="label.split(' ').length <= 1 && (!unit || !unit.length || unit === 'р')">
      <span class="one-line">
        {{label}}
       <template v-if="unit === 'р'">
         <svgicon color="currentColor" class="minicard__rub" name="rub-light" width="13" height="13"/>
       </template>
       <ui-tooltip class="ui-filter-block-item--header-tooltip"
                    position="bottom"
                    trigger="hover"
                    small
                    v-if="!!hasTooltip"
       >
         <svgicon name="about"
                   class="icon-with-shadow"
                   width="18"
                   height="18"
                   color="#ffffff #9b9b9b"
         />
         <div slot="content">
           {{text}}
         </div>
       </ui-tooltip>
      </span>
    </template>
    <template v-else>
      {{staticLabel(label, unit)}}
      <span class="one-line">
        {{staticLabel(label, unit, true)}}
        <ui-tooltip class="ui-filter-block-item--header-tooltip"
                    position="bottom"
                    trigger="hover"
                    small
                    v-if="!!hasTooltip"
        >
          <svgicon name="about"
                   class="icon-with-shadow"
                   width="18"
                   height="18"
                   color="#ffffff #9b9b9b"
          />
          <div slot="content">
            {{text}}
          </div>
        </ui-tooltip>
      </span>
    </template>
  </span>
</template>
<script>
  import '@/components/icons/rub-light'
  import '@/components/icons/about'

  import UiTooltip from '@/components/ui/Tooltip'

  /**
   * Присовокупить unit к label
   * @param label|String
   * @param unit|String
   */
  const assetUnit = (label, unit) => {
    if (unit && unit !== 'р') {
      return `${label} ${unit}`
    }
    return label
  }
  /**
   * Рисуем label для каждого фильтра. В зависимости от суффикса (unit) и его типа
   */
  export default {
    'name': 'UiFilterLabel',
    'components': {
      UiTooltip,
    },
    'props': {
      'text': { // Текст подсказки
        'type': String,
      },
      'label': { // Дефолтный label
        'type': String,
        'required': true,
      },
      'unit': { // Суффикс с размерностью фильтра
        'validator': (prop) => typeof prop === 'string' || prop === null,
        'required': true,
      },
      'hasTooltip': { // Есть подсказка
        'type': Boolean,
        'default': false,
      },
      'single': { // Single-checkbox
        'type': Boolean,
        'default': false,
      },
    },
    'methods': {
      /**
       * Пилим label по знаку пробел, чтобы к последнему слову добавить подсказку
       * @param label|String
       * @param unit|String
       * @param returnOnlyLast|Boolean
       */
      'staticLabel'(label, unit, returnOnlyLast) {
        let tempLabel = label
        const tempLabelArray = label.split(' ')
        if (tempLabelArray.length > 1) {
          if (returnOnlyLast) {
            tempLabel = tempLabelArray.length > 1 ? tempLabelArray.pop() : tempLabel
            return assetUnit(tempLabel, unit)
          }
          tempLabel = tempLabelArray
            .filter((item, index, original) => index !== (original.length - 1))
            .join(' ')
          return tempLabel
        } else if (!tempLabelArray.length > 1 && !returnOnlyLast) {
          return assetUnit(tempLabel, unit)
        } else if (returnOnlyLast) {
          return assetUnit(tempLabel, unit)
        }
        return ''
      },
    },
  }
</script>
<style scoped lang="scss">
  // Путь до scss компонента
</style>
