<script lang="ts" setup>

defineProps({
  img: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  showName: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  }
});

</script>

<template>
  <div
    :class="{
      'item-wrapper': true,
      selected: isSelected
    }"
  >
    <img
      v-if="img"
      class="image tw-object-cover"
      :src="img"
    />
    <div v-else class="image tw-bg-gray-200" />
    <span v-if="label" class="label">{{ label }}</span>
    <span v-if="showName" class="label">{{ name }}</span>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  border: 2px solid transparent;
  align-items: center;
  text-align: center;
  font-size: 12px;
  background: #F2F4FA;
  color: #3F414D;
  line-height: 20px;
  cursor: pointer;
  .image {
    border-radius: 4px 4px 0 0;
    width: 108px;
    height: 108px;
  }
  .label {
    padding: 4px 0;
  }
  &.selected {
    border-color: #605CE5;
    color: #605CE5;
  }
  &:hover {
    color: #605CE5;
  }
}
</style>
