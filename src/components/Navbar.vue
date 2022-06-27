<template>
<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
<a class="navbar-brand" href="#">Top navbar</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarCollapse">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link" href="/#/">Home <span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/#/img">Image</a>
    </li>
     <li class="nav-item">
      <a class="nav-link" href="/#/img2" @click="getData()">Image2</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="/#/login" >Login</a>
    </li>
     <li class="nav-item">
      <a class="nav-link" href="/#/category" >category</a>
    </li>
  </ul>
  <form class="form-inline mt-2 mt-md-0" >
    <input v-model="messege" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
    
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getCari(messege)">cari</button>
  </form>
</div>
</nav>
</template>

<script>
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
