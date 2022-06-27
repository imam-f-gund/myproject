
<template>
    <div class="container">
        <div class="user">
            <h2>this Blog Name : {{ blog.title }} </h2>
            <ul>
                <li> description : {{ blog.desc }} </li>
               <table>
                <img :src="'http://localhost:8000/uploads/'+blog.id+'/' + blog.image" width="300px" height="300px">
               
                 <tr v-for="(img) in img" >

                  <img :src="'http://localhost:8000/uploads/'+ blog.id+'/' + img.image" width="300px" height="300px">
                   <button class="btn btn-danger" v-on:click="deleteThis(img.created_at)">Delete = {{img.created_at}}</button>
                   
                   <li> description : {{ img }} </li>
                    </tr>
                   </table>
            </ul>


            <!--  <form  enctype="multipart/form-data">
    <div >
        
      <label for="taskidinput">id</label>
      <input v-model="id"  type="text" id="tsid" class="form-control " placeholder="id">
          <label for="tasknameinput">Task Name</label>
            <input v-model="taskname" type="text" id="tasknameinput" class="form-control" placeholder="Add title">
          <label for="taskDescinput">Task decs</label>
            <textarea v-model="taskDesc" type="text" id="taskDescinput" class="form-control" placeholder="Add desc"></textarea>
           
           <label for="tasknameinput">Image</label>
            <input v-model="taskImage" type="text" id="tasknameinput" class="form-control" placeholder="image">
          <button id="btnadd" class="btn btn-success">Submit</button> 
    </div>
    </form> -->


  <!--    <button class="btn btn-info" id="ed"  v-on:click="editTask(blog.desc, blog.title, blog.image, blog.id)">Edit = {{blog.id}}</button>
      <button class="btn btn-primary btn-block mt-3"  type="button" v-on:click="update(blog.id)"  >Update</button>
 -->
              <form  @submit="formS" enctype="multipart/form-data">
                          <!--   <label for="post_id">id</label>
      <input v-model="postid"  type="text" id="inputpostid" class="form-control " placeholder="id"> -->
       <label for="tasknameinput"> front Image</label>
          <!--   <input v-model="imgName" type="text" id="tasknameinput" class="form-control" placeholder="Add title"> -->
        
                        <strong>Image:</strong>
                        <input type="file" class="form-control"   v-on:change="onImageChange" >
 
                        <button class="btn btn-success" v-on:click="editTask(blog.desc, blog.title, blog.image, blog.id),update(blog.id)">Submit</button>
                        </form>

             <form  @submit="formSubmit" enctype="multipart/form-data">
                          <!--   <label for="post_id">id</label>
      <input v-model="postid"  type="text" id="inputpostid" class="form-control " placeholder="id"> -->
       <label for="tasknameinput"> Name</label>
          <!--   <input v-model="imgName" type="text" id="tasknameinput" class="form-control" placeholder="Add title"> -->
        
                        <strong>Image:</strong>
                        <input type="file" class="form-control"   v-on:change="onImageChange" >
 
                        <button class="btn btn-success"  >Submit</button>
                        </form>
           <button @click="getData()">look more image</button>
            <router-link to="/img2"> Back </router-link>
        </div>
    </div>
</template>
<!-- <template>
<div>

<form>
<div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <button type="submit">Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn">Cancel</button>
    <span class="psw">Forgot <a href="#">password?</a></span>
  </div>

  <button class="btn btn-primary" type="submit">Submit form</button>
</form>
</div>
</template>
 --><script>
  
import axios from 'axios';
import $ from 'jquery';


export default {

  data() {
   
    return {

      blog: [],
     
      id: '',
      taskname: '',
      taskDesc: '',
      taskImage: '',
      /*tImage:'',*/
      isEdit:false
    }

      
  },
  mounted() {
  this.getData();
  this.getData();
    
  },
  methods: {
    /* getDataImg() {
   // get find id
      
  },
    */
      getData() {
   // get find id
      axios.get(`http://localhost:8000/api/tes/${this.$route.params.id}`).then(
      result => {
        console.log(result.data)
        this.blog = result.data;
      
      sessionStorage.setItem("img", this.$route.params.id);

       // sessionStorage.setItem("name", ob);
      //  alert('ok read');
      },
      error => {
        console.error(error)
      }
    );

      axios.get(`http://localhost:8000/api/tes/img/${this.$route.params.id}`).then(
      result => {

        console.log(result.data)
        this.img = result.data;
      

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

                
                this.image = e.target.files[0];
                var im = e.target.files[0];
                console.log(im.lastModified);
            

                sessionStorage.setItem("name", ob);
              var ob = im.name;
                //var ob = im.lastModified + '.png';
               sessionStorage.setItem("name", ob);
      
      
                
            },
            formS(e) {

                e.preventDefault();
                let currentObj = this;
 
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
 
                let formData = new FormData();
                formData.append('image', this.image);

                /*
               axios.post('http://localhost:8000/api/img', formData, config)*/
               var d  = sessionStorage.getItem("img");
                axios.post('http://localhost:8000/api/img'+d, formData, config)
                .then(function (response) {
                    alert(formData)
                    currentObj.success = response.data.success;
                    console.log(response);
                })
                .catch(function (error) {
                    currentObj.output = error;
                });

                 var Image  = sessionStorage.getItem("name");
                 var d  = sessionStorage.getItem("img");
                /* axios.post("http://localhost:8000/api/tes/create/img", {post_id:d, image:d+Image})
        .then(function (res){
          this.taskname = ''
          this.getData()
          currentObj.success = res.data.success;
           console.log(res)
          console.log('add='+res)
        })
        .catch(function (error) {
          console.log(error)
         /* currentObj.output = error;
        });*/
            },
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;
 
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
 
                let formData = new FormData();
                formData.append('image', this.image);
  var i  = sessionStorage.getItem("img");

                axios.post('http://localhost:8000/api/upload'+i, formData, config)
                .then(function (response) {
                    currentObj.success = response.data.success;
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
                var Image  = sessionStorage.getItem("name");
                 var d  = sessionStorage.getItem("img");
                 axios.post("http://localhost:8000/api/tes/create/img", {post_id:d, image:Image})
        .then(function (res){
          /*this.taskname = ''
          this.getData()
          currentObj.success = res.data.success;*/
           console.log(res)
          console.log('add='+res)
        })
        .catch(function (error) {
          console.log(error)
         /* currentObj.output = error;*/
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


      editTask(desc,title,image, id){
        this.id = id
        this.taskname = title
        this.taskDesc = desc
        this.taskImage = image
        this.isEdit = true


      },

      update(id) {
        var Image  = sessionStorage.getItem("name");
                 var d  = sessionStorage.getItem("img");

        axios.put("http://localhost:8000/api/tes/u/"+id, {title: this.taskname, desc: this.taskDesc, image: d+Image})

        .then(res => {
      //  this.id = id
        this.taskname = title
        this.taskDesc= desc
         this.taskImage = image
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
      //  var d  = sessionStorage.getItem("img");

      axios.delete("http://localhost:8000/api/tesimg/"+id)
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
