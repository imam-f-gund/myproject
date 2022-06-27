<template>
  <div class="hello">
  <!-- table -->

             <!-- .end table -->

    <h2>Home {{id}}</h2>

                        <div v-if="success != ''" class="alert alert-success" role="alert">
                          {{success}}
                        </div>
                        <form @submit="formSubmit"  v-on:submit.prevent="addNewTask" enctype="multipart/form-data">
    <div >
        
      <label for="taskidinput">id</label>
      <input v-model="id"  type="text" id="taskidinput" class="form-control " placeholder="id">
          <label for="tasknameinput">Task Name</label>
            <input v-model="taskname" type="text" id="tasknameinput" class="form-control" placeholder="Add title">
          <label for="taskDescinput">Task decs</label>
            <textarea v-model="taskDesc" type="text" id="taskDescinput" class="form-control" placeholder="Add desc"></textarea>
          
         
    </div>

                        
                        
                        <strong>Image:</strong>
                        <input type="file" class="form-control"   v-on:change="onImageChange" >
 
                        <button class="btn btn-success">Submit</button>
                        </form>
        <table >
          <td><label><h5>id</h5></label></td> <td><label ><h5>title</h5></label></td> <td><label ><h5>desc</h5></label></td>
        <tr v-for="(blogs) in blog" v-bind:key="blogs.id" v-bind:title="blogs.title"  v-bind:Desc="blogs.desc">
           <img :src="'http://localhost:8000/uploads/' + blogs.image" width="300px" height="300px">

          <td class="text">{{blogs.id}} : </td>
          
    
        
            <router-link :to="{ name: 'Login', params: { id: blogs.id }}">
                {{ blogs.title }}
            </router-link>  <!-- url dinamis -->
       
         

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
      taskImage: '',
      isEdit:false
    }

      
  },
  mounted() {
  this.getData();
    
  },
  methods: {
     
  getData() {
     sessionStorage.removeItem('name');

      axios.get("http://localhost:8000/api/tes").then(
      result => {
        console.log(result.data)
        this.blog = result.data;
      

       // sessionStorage.setItem("name", ob);
      //  alert('ok read');
      },
      error => {
        console.error(error)
      }
    )
  },
  //upload image

            onImageChange(e){

                console.log(e.target.files[0]);

                this.image = e.target.files[0];
                var im = e.target.files[0];
                console.log(im.lastModified);
            

                
                var ob = im.name;
                // var ob = im.lastModified + '.png';
               sessionStorage.setItem("name", ob);
      
                
            },
            formSubmit(e) {

                e.preventDefault();
                let currentObj = this;
 
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
 
                let formData = new FormData();
                formData.append('image', this.image);

                
 
                axios.post('http://localhost:8000/api/img', formData, config)
                .then(function (response) {
                    currentObj.success = response.data.success;
                    console.log('==='+formData);
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            },

    addNewTask() {

      var Image  = sessionStorage.getItem("name");
        axios.post("http://localhost:8000/api/tes/create", {title: this.taskname, desc: this.taskDesc, image: Image})
        .then(function (res){
          this.taskname = ''
          this.getData()
          currentObj.success = res.data.success;
          console.log(res)
        })
        .catch(function (error) {
          console.log(error)
          currentObj.output = error;
        });
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
