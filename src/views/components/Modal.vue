<template>
  <div class="modal" :class="modalActive" >
    <div class="modal-background" @click="modalActive=''"></div>
    <div class="modal-card">
      <div class="box p-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

defineProps({
  modalActive:String
})
</script>
