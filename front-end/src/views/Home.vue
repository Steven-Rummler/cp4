<template>
  <div class="home">
    <div class="navbar">
      <div class="nav-link">
        <router-link to="/movie">Movies</router-link>
      </div>
      <div class="nav-link">
        <router-link to="/book">Books</router-link>
      </div>
      <div class="nav-link">
        <router-link to="/character">Characters</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
.navbar {
  width: 100%;
  display: flex;
  padding: 10px;
  background-color: black;
}

.nav-link {
  flex-grow: 1;
  text-align: center;
  color: white;
}

.nav-link a {
  color: white;
}

/* above this needs moved */
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
