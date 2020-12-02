<template>
  <div class="wrapper">
    <div class="flex-container" v-for="item in items" :key="item.id">
      <img :src="item.image_path" />
      <div class="info_box">
        <div class="title">
          <h1>{{ item.title }}</h1>
        </div>
        <div class="info">
          <div class="stats">
            <h2>Author: {{ item.author }}</h2>
            <h2>Publisher: {{ item.publisher }}</h2>
            <h2>Release Year: {{ item.year }}</h2>
            <h2>Pages: {{ item.pages }}</h2>
          </div>
          <div class="description">
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
      <div class="votes">
        <button @click="incrementLikes(item)">↑</button>
        <h5>{{ item.likes }}</h5>
        <button @click="decrementLikes(item)">↓</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieHome",
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/books");
        this.items = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async incrementLikes(item) {
      try {
        let likesVal = item.likes + 1;
        await axios.put("/api/books/" + item._id, {
          title: item.title,
          description: item.description,
          author: item.author,
          publisher: item.publisher,
          year: item.year,
          pages: item.pages,
          likes: likesVal,
          image_path: item.image_path,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async decrementLikes(item) {
      try {
        let likesVal = item.likes - 1;
        await axios.put("/api/books/" + item._id, {
          title: item.title,
          description: item.description,
          author: item.author,
          publisher: item.publisher,
          year: item.year,
          pages: item.pages,
          likes: likesVal,
          image_path: item.image_path,
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

<style scoped>
.flex-container {
  display: flex;
  width: 100%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

img {
  max-width: 200px;
  max-height: 350px;
  height: auto;
  width: auto;
}

.stats {
  min-width: 200px;
}

.stats h2 {
  font-size: 1em;
  line-height: 1.5em;
}

.info-box {
  width: 100%;
}

.title h1 {
  margin-left: 10px;
  color: black;
}

.info {
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
}

.description {
  width: 100%;
  margin-left: 10px;
  padding-right: 40px;
}

.votes {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
}
</style>