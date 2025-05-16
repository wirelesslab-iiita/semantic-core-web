<template>
  <div class="wrapper">
    <div v-if="loading" class="status">
      <v-progress-circular
        indeterminate
        color="#3F5BD9"
        :size="30"
        :width="3"
      />
    </div>
    <div v-else-if="status === 'completed'" class="status">
      <img :src="require('../assets/completed.png')"/>
    </div>

    <div class="outer-div" :class="orientation">
      <div
        class="inner-div"
        :class="[status === 'completed' ? 'completed' : 'pending', orientation]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  props: {
    orientation: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].includes(val)
    },
    status: {
      type: String,
      default: 'pending'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.status {
  display: flex;
  justify-content: center;
  align-items: center;
}

.outer-div {
  background-color: #3F5BD9;
  border-radius: 10px;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.outer-div.horizontal {
  min-width: 150px;
  height: 15px;
}

.outer-div.vertical {
  height: 150px;
  width: 15px;
  flex-direction: column;
}

.inner-div {
  background-color: white;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.inner-div.horizontal.completed {
  width: 100%;
  height: 100%;
}

.inner-div.horizontal.pending {
  width: 15%;
  height: 100%;
}

.inner-div.vertical.completed {
  height: 100%;
  width: 100%;
}

.inner-div.vertical.pending {
  height: 10%;
  width: 100%;
}
</style>
