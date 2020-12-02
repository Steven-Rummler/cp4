<template>
  <div class="wrapper">
    <div class="section">
      <div class="heading">
        <h2>Add a Book</h2>
      </div>
      <div class="add">
        <div class="form">
          <input v-model="title" placeholder="Title" />
          <p></p>
          <textarea v-model="description" placeholder="Description" />
          <p></p>
          <input v-model="author" placeholder="Author" />
          <p></p>
          <input v-model="publisher" placeholder="Publisher" />
          <p></p>
          <input v-model="year" placeholder="Release Year" />
          <p></p>
          <input v-model="pages" placeholder="Page Count" />
          <p></p>
          <input type="file" name="photo" @change="fileChanged" />
          <p />
          <button @click="upload">Submit</button>
        </div>
        <div class="upload" v-if="addItem">
          <h2>{{ addItem.title }} added</h2>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="heading">
        <h2>Edit/Delete a Book</h2>
      </div>
      <div class="edit">
        <div class="form">
          <input v-model="findTitle" placeholder="Search" />
          <div class="suggestions" v-if="suggestions.length > 0">
            <div
              class="suggestion"
              v-for="s in suggestions"
              :key="s.id"
              @click="selectItem(s)"
            >
              {{ s.title }}
            </div>
          </div>
        </div>
        <div class="upload" v-if="findItem">
          <input v-model="findItem.title" />
          <p></p>
          <textarea v-model="findItem.description" />
          <p></p>
          <input v-model="findItem.author" />
          <p></p>
          <input v-model="findItem.publisher" />
          <p></p>
          <input v-model="findItem.year" />
          <p></p>
          <input v-model="findItem.pages" />
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
  name: "Movie",
  data() {
    return {
      title: "",
      description: "",
      author: "",
      publisher: "",
      year: "",
      pages: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    };
  },
  computed: {
    suggestions() {
      let items = this.items.filter((item) =>
        item.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return items.sort((a, b) => a.title > b.title);
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
      this.findTitle = "";
      this.findItem = item;
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post("/api/books", {
          title: this.title,
          description: this.description,
          author: this.author,
          publisher: this.publisher,
          year: this.year,
          pages: this.pages,
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
        let response = await axios.get("/api/books");
        this.items = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/books/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/books/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          author: this.findItem.author,
          publisher: this.findItem.publisher,
          year: this.findItem.year,
          pages: this.findItem.pages,
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