<template>
  <div class="admin">
    <div class="navbar">
      <div class="nav-link">
        <router-link to="/admin/movie">Movies</router-link>
      </div>
      <div class="nav-link">
        <router-link to="/admin/book">Books</router-link>
      </div>
      <div class="nav-link">
        <router-link to="/admin/character">Characters</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Admin",
};
</script>

<style>
.navbar {
  width: 100%;
  display: flex;
  padding: 10px;
  background-color: black;
}

.section {
  display: flex;
  width: 100%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  flex-direction: column;
  padding: 20px;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  justify-content: center;
}

.heading h2 {
  font-size: 1.5em;
  margin-block-start: 0em;
  margin-block-end: 0em;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5bdeff;
  color: #fff;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
