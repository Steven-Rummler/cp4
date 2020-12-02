<template>
  <div id="app">
    <div class="header">
      <router-link to="/">
        <div class="title_link">
          <div class="logo">
            <img id="logo" src="/Star_Wars_Logo.svg" />
          </div>
          <div class="title">
            <h1>CODEX</h1>
          </div>
        </div>
      </router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <router-link to="/admin">Admin</router-link>
    </div>
  </div>
</template>

<style>
.wrapper {
  margin: 20px 100px;
}

html {
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  justify-content: center;
  padding: 10px 100px 0px 100px;
  background-color: black;
  color: #1c454f;
}

#logo {
  max-height: 100px;
}

.title_link {
  display: flex;
}

a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
}

.title {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 50px;
}

.title h1 {
  font-size: 30px;
  color: #ffe81f;
}

.content {
  /*padding: 20px 100px;*/
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
