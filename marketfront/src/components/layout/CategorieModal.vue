<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__dialog">
          
        <div class="modal__header">
          <slot name="header"/>
          <button type="button" class="modal__close" @click="closeModal()">
            <img src="../../assets/moins.png" alt="">
          </button>
        </div>

        <div class="modal__body">
          <ul>
              <li>
                  <p></p>
                  <button>
                      <img src="../../assets/trash.png" alt="">
                  </button>
              </li>
          </ul>
        </div>

        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    }
  }
};
</script>


<style scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
}

.modal__body ul li {
    display: flex;
    justify-content: space-between;
}
</style>