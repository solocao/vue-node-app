<template>
  <div class="container">
    <b-list-group>
      <transition-group name="fade">
        <b-list-group-item :key="item._id" v-for="item in items">
          <item :item="item"></item>
        </b-list-group-item>
      </transition-group>
    </b-list-group>

    <div class="row control-buttons">
      <b-button v-b-modal.modal-1>Add Item</b-button>
    </div>

    <b-modal id="modal-1" hide-footer title="Add Item">
      <insertModal></insertModal>
    </b-modal>
  </div>
  <!-- NOTE:Read Vuex -->
</template>
<script>
import item from "./item";
import insertModal from "./insertModal";
import axios from "axios";
import Vue from "vue";

export default {
  name: "event-list",
  components: {
    item,
    insertModal
  },
  data: function() {
    return {
      items: [],
      counter: 0,
      isConnected: false
    };
  },
  methods: {},
  sockets: {
    connect() {
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    thingsave(data) {
      let idx = this.items.findIndex(element => {
        return element._id === data._id;
      });
      if (idx === -1) {
        Vue.toasted.success("New thing was created");
        this.items.unshift(data);
      }
    },
    thingUpdate(data) {
      
      this.items = this.items.map(element => {
        if (element._id === data._id) return data;
        else return element;
      })
    },
    thingDelete(data) {
      let idx = this.items.findIndex(element => {
        return element._id === data._id;
      });
      if (idx !== -1) {
        this.items.splice(idx, 1);
        Vue.toasted.info("A thing was deleted");
      }
    }
  },
  mounted() {
    axios
      .get("/api/things")
      .then(response => {
        this.items = response.data.data;
      })
      .catch(error => {
        Vue.toasted.error(error);
      });
  }
};
</script>

<style>
.modal-dialog.modal-md {
  top: 15%;
}

.modal-dialog.modal-md .modal-body {
  text-align: center;
}

.modal-dialog.modal-md footer {
  justify-content: center;
}

.fade-leave-active {
  transition: opacity 0.5s;
  background-color: red;
}

.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  background-color: red;
}

.list-group {
  overflow-y: auto;
  height: 80vh;
}

.list-group-item {
  width: 65%;
  margin: auto;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  padding-bottom: 0px !important;
  min-height: 212px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.55);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.55);
}

.list-group-item:first-child {
  border-top-left-radius: 50px !important;
  border-top-right-radius: 50px !important;
}

.list-group-item:last-child {
  border-bottom-left-radius: 50px !important;
  border-bottom-right-radius: 50px !important;
}

.control-buttons {
  justify-content: center;
  position: fixed;
  width: 100%;
  bottom: 30px;
  left: 0px;
  right: 0px;
}

.btn.btn-danger {
  margin-left: 10px;
}
</style>
