<template>
  <div>
    <b-form>
      <b-form-group label="Type">
        <b-form-select v-model="form.type" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group label="Name">
        <b-form-input type="text" placeholder="Name" v-model="form.name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Number">
        <b-form-input type="number" placeholder="Number" v-model="form.number" required></b-form-input>
      </b-form-group>
      <b-form-textarea
        id="textarea"
        v-model="form.notes"
        placeholder="Enter something..."
        rows="3"
        max-rows="3"
      ></b-form-textarea>
    </b-form>
    <b-button class="mt-3" @click="cancel">Cancel</b-button>
    <b-button class="mt-3 ml-3" variant="primary" :disabled="!validForm" @click="save">Save</b-button>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  methods: {
    cancel() {
      this.$bvModal.hide("modal-1");
    },
    save() {
      axios
        .post("/api/thing", {
          type: this.form.type,
          name: this.form.name,
          number: this.form.number,
          note: this.form.notes
        })
        .then(() => {
          this.cancel();
        })
        .catch(err => {
          Vue.toasted.error(err);
        });
    }
  },
  computed: {
    validForm: function() {
      return this.form.type && this.form.name && this.form.notes;
    }
  },
  data: function() {
    return {
      options: [
        { value: "note", text: "A note type" },
        { value: "thing", text: "A thing type" },
        { value: "ping", text: "A ping type" }
      ],
      form: {
        type: "",
        name: "",
        number: "",
        note: ""
      }
    };
  }
};
</script>

<style scoped>

textarea {
  resize: none;
}
</style>
