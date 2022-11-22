<template>
  <q-menu
    :touch-position="props.touchPosition"
    :anchor="props.anchor"
    :self="props.self"
  >
    <q-list style="min-width: 100px">
      <template v-for="item in props.items" :key="item.label">
        <!-- Put a separator if needed -->
        <q-separator v-if="item.separator" />

        <q-item
          :disable="item.isDisabled"
          v-close-popup="!item.submenu"
          @click.prevent="onItemClicked(item)"
          clickable
          dense
        >
          <q-item-section v-if="item.prependIcon" side>
            <q-icon
              :name="item.prependIcon"
              size="0.8rem"
              :color="item.iconColor ? item.iconColor : props.iconColor"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="item.appendIcon" side>
            <q-icon
              :name="item.submenu ? 'arrow_forward_ios' : item.appendIcon"
              size="0.8rem"
              :color="item.iconColor ? item.iconColor : props.iconColor"
            />
          </q-item-section>

          <!-- For submenu's items -->
          <q-menu v-if="item.submenu" anchor="top end" self="top left">
            <q-list style="min-width: 100px">
              <template v-for="subItem in item.submenu" :key="subItem.label">
                <!-- Put a separator if needed -->
                <q-separator v-if="item.separator" />

                <q-item
                  :disable="subItem.isDisabled"
                  :v-close-popup="true"
                  v-close-popup="!subItem.submenu"
                  @click="onItemClicked(subItem)"
                  clickable
                  dense
                >
                  <q-item-section v-if="subItem.prependIcon" side>
                    <q-icon
                      :name="subItem.prependIcon"
                      size="0.8rem"
                      :color="
                        subItem.iconColor ? subItem.iconColor : props.iconColor
                      "
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ subItem.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section v-if="subItem.appendIcon" side>
                    <q-icon
                      :name="
                        subItem.submenu
                          ? 'arrow_forward_ios'
                          : subItem.appendIcon
                      "
                      size="0.8rem"
                      :color="
                        subItem.iconColor ? subItem.iconColor : props.iconColor
                      "
                    />
                  </q-item-section>

                  <!-- For submenu's items level2-->
                  <q-menu v-if="item.submenu" anchor="top end" self="top left">
                    <q-list style="min-width: 100px">
                      <template
                        v-for="child in subItem.submenu"
                        :key="child.label"
                      >
                        <!-- Put a separator if needed -->
                        <q-separator v-if="item.separator" />

                        <q-item
                          :disable="child.isDisabled"
                          :v-close-popup="true"
                          v-close-popup="!child.submenu"
                          @click="onItemClicked(child)"
                          clickable
                          dense
                        >
                          <q-item-section v-if="child.prependIcon" side>
                            <q-icon
                              :name="child.prependIcon"
                              size="0.8rem"
                              :color="
                                child.iconColor
                                  ? child.iconColor
                                  : props.iconColor
                              "
                            />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ child.label }}</q-item-label>
                          </q-item-section>
                          <q-item-section v-if="child.appendIcon" side>
                            <q-icon
                              :name="
                                child.submenu
                                  ? 'arrow_forward_ios'
                                  : child.appendIcon
                              "
                              size="0.8rem"
                              :color="
                                child.iconColor
                                  ? child.iconColor
                                  : props.iconColor
                              "
                            />
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-list>
                  </q-menu>
                </q-item>
              </template>
            </q-list>
          </q-menu>
        </q-item>
      </template>
    </q-list>
  </q-menu>
</template>

<script lang="ts" setup>
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { PropType } from 'vue';

const emit = defineEmits(['click:item']);

const props = defineProps({
  touchPosition: {
    type: Boolean,
    default: true,
  },

  anchor: {
    type: String as PropType<
      | 'top left'
      | 'top middle'
      | 'top right'
      | 'top start'
      | 'top end'
      | 'center left'
      | 'center middle'
      | 'center right'
      | 'center start'
      | 'center end'
      | 'bottom left'
      | 'bottom middle'
      | 'bottom right'
      | 'bottom start'
      | 'bottom end'
      | undefined
    >,
    required: false,
  },

  self: {
    type: String as PropType<
      | 'top left'
      | 'top middle'
      | 'top right'
      | 'top start'
      | 'top end'
      | 'center left'
      | 'center middle'
      | 'center right'
      | 'center start'
      | 'center end'
      | 'bottom left'
      | 'bottom middle'
      | 'bottom right'
      | 'bottom start'
      | 'bottom end'
      | undefined
    >,
    required: false,
  },

  iconColor: {
    type: String,
    require: false,
  },

  items: {
    type: Array as PropType<Array<ItemContextMenu>>,
    default: () => [
      {
        label: 'Item 1',
        event: 'item-1',
        appendIcon: 'euro',
        isDisabled: false,
      },
      { label: 'Item 2', event: 'item-2', isDisabled: true },
      {
        label: 'Item 3',
        event: 'item-3',
        appendIcon: 'alternate_email',
        isDisabled: false,
      },
      {
        label: 'Submenu 1',
        appendIcon: 'call_merge',
        isDisabled: false,
        separator: true,
        submenu: [
          {
            label: 'Sub Item 1',
            event: 'sub-item-1',
            appendIcon: 'alternate_email',
            isDisabled: false,
          },
          {
            label: 'Sub Item 2',
            event: 'sub-item-2',
            appendIcon: 'schedule',
            isDisabled: true,
          },
        ],
      },
    ],
  },
});

/**
 * @desc Emit event if the item is not a submenu's label
 * @param { ItemContextMenu } item
 */
function onItemClicked(item: ItemContextMenu) {
  if (item.event && !item.submenu) {
    emit('click:item', item);
  }
}
</script>
