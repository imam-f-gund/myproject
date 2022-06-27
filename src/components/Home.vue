<template>
  <div class="hello">
  <!-- table -->

             <!-- .end table -->

    <h2>Home {{id}}</h2>

  <form v-on:submit.prevent="addNewTask">
      
          <label for="tasknameinput">Name</label>
            <input v-model="taskname" type="text" id="tasknameinput" class="form-control" placeholder="Add title">
          <label for="taskDescinput">email</label>
            <input v-model="taskDesc" type="text" id="taskDescinput" class="form-control" placeholder="Add desc">
          
           <label for="taskNim">nim</label>
            <input v-model="taskNim" type="text" id="taskDescinput" class="form-control" placeholder="Add desc">

          <button  type="submit" class="btn btn-success btn-block mt-3">Submit</button>


        </form>

   <!--  <form v-on:submit.prevent="addNewTask">
      <label for="taskidinput">id</label>
      <input v-model="id"  type="text" id="taskidinput" class="form-control " placeholder="id">
          <label for="tasknameinput">Task Name</label>
            <input v-model="taskname" type="text" id="tasknameinput" class="form-control" placeholder="Add title">
          <label for="taskDescinput">Task decs</label>
            <input v-model="taskDesc" type="text" id="taskDescinput" class="form-control" placeholder="Add desc">
          

          <button  type="submit" class="btn btn-success btn-block mt-3">Submit</button>


        </form> -->
        <table >
          <td><label><h5>id</h5></label></td> <td><label ><h5>title</h5></label></td> <td><label ><h5>desc</h5></label></td>
        <tr v-for="(blogs) in blog" v-bind:key="blogs.id" v-bind:title="blogs.title"  v-bind:Desc="blogs.desc">


          <td class="text">{{blogs.id}} : </td>

            <td class="text"> {{blogs.title}}</td>

              <td class="text">{{blogs.desc}}</td>
          <td class="text-right">
            <button class="btn btn-info" id="ed"  v-on:click="editTask(blogs.desc, blogs.title, blogs.id)">Edit = {{blogs.id}}</button>
            <button class="btn btn-danger" v-on:click="deleteThis(blogs.id)">Delete = {{blogs.id}}</button>

              <button class="btn btn-primary btn-block mt-3"  type="button" v-on:click="update(blogs.id)"  >Update</button>

          </td>
        </tr>
      </table>

  <a href="/#/data" >go</a>

    <button @click="getData()" type="button" name="button">look</button>
  </div>
</template>

<script>
import axios from 'axios';


export default {

  data() {

    return {

      blog: [],
      id: '',
      taskname: '',
      taskDesc: '',
      taskNim: '',
      isEdit:false

    }
  },
  mounted() {
  this.getData()
  },
  methods: {
  //read
  getData() {

      axios.get("http://localhost:8000/api/view").then(
      result => {
        console.log(result.data)
        this.blog = result.data
        console.log(this.blog[0].id)
      //  alert('ok read');
      },
      error => {
        console.error(error)
      }
    )
  },

    addNewTask() {
    //  console.log({name: this.taskname, email: this.taskDesc, nim: this.taskNim });
        axios.post("http://localhost:8000/api/Create", {name: this.taskname, email: this.taskDesc, nim: this.taskNim}).then(res => {
          this.taskname = ''
          this.getData()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      },


      editTask(desc,title, id){
        this.id = id
        this.taskname = title
        this.taskDesc = desc
        this.isEdit = true


      },

      update(id) {

        axios.put("http://localhost:8000/api/tes/u/"+id, {title: this.taskname, desc: this.taskDesc})

        .then(res => {
      //  this.id = id
        this.taskname = title
        this.taskDesc= desc
        this.isEdit = false
        this.getData()
        alert('ok')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      },

      //delete
      deleteThis(id) {

      axios.delete("http://localhost:8000/api/tes/"+id)
      .then(res => {

        this.getData()
        console.log(res)
      })
      .catch(err => {
        console.log(err)
        this.getData()
      })

      }



  /*  tes (){
      axios.get("http://localhost:8000/api/tes")
      .then(function (response){
        console.log(response)

      });
    },*/

  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
