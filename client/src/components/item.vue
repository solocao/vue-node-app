<template>
  <div v-click-outside="cancelChanges">
    <div class="row">
      <div class="col">
        <b-form-input
          class="item-type"
          @click="edit"
          :readonly="!editable"
          type="text"
          v-model="backUpItem.type"
        ></b-form-input>
      </div>
      <div class="col-auto">
        <b-form-input
          class="item-name"
          :class="{'updated':isUpdated}"
          @click="edit"
          :readonly="!editable"
          type="text"
          v-model="backUpItem.name"
        ></b-form-input>
      </div>
      <div class="col">
        <b-form-input
          class="item-number"
          @click="edit"
          :readonly="!editable"
          type="text"
          v-model="backUpItem.number"
        ></b-form-input>
      </div>
    </div>
    <div class="row notes">
      <span class="item-notes">Notes:</span>
      <b-form-textarea
        :readonly="!editable"
        @click="edit"
        rows="3"
        max-rows="3"
        v-model="backUpItem.note"
      ></b-form-textarea>
    </div>
    <div class="row">
      <div class="col-6 left-align">
        <div class="item-date">{{backUpItem.created |formatDate}}</div>
      </div>
      <transition name="bounce">
        <div class="col-6 ctrl-btns" v-if="editable">
          <b-button variant="primary" @click="cancelChanges()">
            <i class="fa fa-times"></i>
          </b-button>
          <b-button variant="success" @click="updateItem(item._id)">
            <i class="fa fa-save"></i>
          </b-button>
          <b-button variant="danger" @click="removeItem(item._id)">
            <i class="fa fa-trash"></i>
          </b-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import * as _ from "lodash";
import ClickOutside from "vue-click-outside";

export default {
  name: "item",
  props: ["item"],
  data() {
    return {
      backUpItem: _.cloneDeep(this.item),
      editable: false,
      isUpdated: false
    };
  },
  watch: {
    item: function(value, oldValue) {
      //Here handle the animation
      this.backUpItem = _.cloneDeep(value);
      this.isUpdated = true;
      setTimeout(() => {
        this.isUpdated = false;
      }, 2000);
    }
  },
  methods: {
    removeItem(itemId) {
      axios
        .delete("http://localhost:5000/api/thing/" + itemId)
        .then(() => {})
        .catch(err => {
          Vue.toasted.error(err);
        });
    },
    updateItem(itemId) {
      //ll be handled by the sockets
      if (_.isEqual(this.backUpItem, this.item)) this.editable = false;
      else
        axios
          .put("http://localhost:5000/api/thing/" + itemId, this.backUpItem)
          .then(() => {
            this.editable = false;
          })
          .catch(err => {
            Vue.toasted.error(err);
          });
    },
    cancelChanges() {
      this.backUpItem = _.cloneDeep(this.item);
      this.editable = false;
    },
    edit() {
      this.editable = true;
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style scoped>
.form-control:focus {
  outline: none;
  border: 0px;
}

.left-align {
  text-align: left;
}

.item-notes {
  font-weight: 900 !important;
  text-align: left;
}

.form-control[readonly] {
  border: 0px;
  background-color: unset;
}

.form-control {
  padding: 0px;
}

.btn {
  border-radius: 50px;
  width: 32px;
  height: 32px;
}

.updated {
  color: red;
}

.fa {
  position: relative;
  left: -3.5px;
  top: -2px;
}

textarea {
  resize: none;
  max-height: 70px;
}

.btn.btn-danger {
  margin-left: 5px;
}

.btn.btn-success {
  margin-left: 5px;
}

.notes {
  padding-left: 15px;
  text-align: center;
}

.ctrl-btns {
  text-align: right;
  margin: 10px 0px;
}

.item-type {
  font-weight: 900 !important;
  text-align: center;
  min-width: 80px;
  /* width: auto; */
}

.item-number {
  font-weight: 900;
  text-align: center;
  min-width: 80px;
  /* width: auto; */
}

.col-auto {
  margin: auto;
}

.item-name {
  text-align: center;
  font-weight: 900;
  font-size: 25px;
  width: auto;
}

.list-group-item:last-child .item-date {
  padding-left: 10px;
}

.item-date {
  opacity: 0.7;
  font-size: 13px;
  margin: 16px 0px;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes bounce-in-up {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 30px, 0);
    transform: translate3d(0, 30px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.bounce-enter-active {
  animation: bounce-in-up 0.5s;
}

.bounce-leave-active {
  animation: fade-out 0.5s;
}
</style>
