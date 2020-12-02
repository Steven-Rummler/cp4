<template>
  <div class="wrapper">
    <div class="section">
      <div class="heading">
        <h2>Add a Character</h2>
      </div>
      <div class="add">
        <div class="form">
          <input v-model="name" placeholder="Name" />
          <p></p>
          <textarea v-model="description" placeholder="Description" />
          <p></p>
          <input v-model="species" placeholder="Species" />
          <p></p>
          <input v-model="age" placeholder="Age" />
          <p></p>
          <input type="file" name="photo" @change="fileChanged" />
          <p />
          <button @click="upload">Submit</button>
        </div>
        <div class="upload" v-if="addItem">
          <h2>{{ addItem.name }} added</h2>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="heading">
        <h2>Edit/Delete a Character</h2>
      </div>
      <div class="edit">
        <div class="form">
          <input v-model="findName" placeholder="Search" />
          <div class="suggestions" v-if="suggestions.length > 0">
            <div
              class="suggestion"
              v-for="s in suggestions"
              :key="s.id"
              @click="selectItem(s)"
            >
              {{ s.name }}
            </div>
          </div>
        </div>
        <div class="upload" v-if="findItem">
          <input v-model="findItem.name" />
          <p></p>
          <textarea v-model="findItem.description" />
          <p></p>
          <input v-model="findItem.species" />
          <p></p>
          <input v-model="findItem.age" />
          <p></p>
          <div class="actions" v-if="findItem">
            <button @click="deleteItem(findItem)">Delete</button>
            <button @click="editItem(findItem)">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Character",
  data() {
    return {
      name: "",
      description: "",
      species: "",
      age: "",
      file: null,
      addItem: null,
      items: [],
      findName: "",
      findItem: null,
    };
  },
  computed: {
    suggestions() {
      let items = this.items.filter((item) =>
        item.name.toLowerCase().startsWith(this.findName.toLowerCase())
      );
      return items.sort((a, b) => a.name > b.name);
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    selectItem(item) {
      this.findName = "";
      this.findItem = item;
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post("/api/characters", {
          name: this.name,
          description: this.description,
          species: this.species,
          age: this.age,
          likes: 0,
          image_path: r1.data.path,
        });
        this.addItem = r2.data;
      } catch (error) {
        //console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/characters");
        this.items = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/characters/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/characters/" + item._id, {
          name: this.findItem.name,
          description: this.findItem.description,
          species: this.findItem.species,
          age: this.findItem.age,
          likes: this.findItem.likes,
          image_path: this.findItem.image_path,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  },
};
</script>