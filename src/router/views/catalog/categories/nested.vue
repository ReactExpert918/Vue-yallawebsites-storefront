<template>
  <draggable class="dragArea" v-bind="dragOptions" :list="tasks" :group="{ name: 'g1' }">
    <div 
      v-for="(category, index) in tasks" :key="index + 10"
    >
      <b-card static 
        no-body 
        class="mb-0 shadow-none"
      >
        <div header-tag="header" role="tab" class="category-tab">
          <h6 class="m-0">
          <span class="move">
            <i class="bx bx-move"></i>
          </span>
          <a
            v-b-toggle="'accordion-' + index"
            class="text-dark"
            href="javascript: void(0);"
          >
            <i class="bx bx-caret-down mr-3"></i>
            <span>{{category.name}}</span>
          </a>
          <span class="actions-right cursor-ponter btn-primary">
            <i @click="currentCategoryData(category)" class="bx bx-edit-alt"></i>
          </span>
          </h6>
          <b-collapse 
            :id="'accordion-' + index"
            accordion="" role="tabpanel"
          >
            <nested-draggable :tasks="category.sub_categories" />
          </b-collapse>
        </div>
      </b-card>
    </div>

  </draggable>
</template>
<script>
import draggable from 'vuedraggable';
export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable"
};
</script>
<style scoped>

</style>