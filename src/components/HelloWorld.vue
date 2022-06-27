<template>
  <div class="hello">
  <!-- table -->

             <!-- .end table -->

    <h2>IMAGE 2</h2>

                        <div v-if="success != ''" class="alert alert-success" role="alert">
                          {{success}}
                        </div>
                        
   <form  v-on:submit.prevent="addNewTask"  enctype="multipart/form-data">
    <div >
        
      <label for="taskidinput">id</label>
      <input v-model="id"  type="text" id="tsid" class="form-control " placeholder="id">
          <label for="tasknameinput">Task Name</label>
            <input v-model="taskname" type="text" id="tasknameinput" class="form-control" placeholder="Add title">
          <label for="taskDescinput">Task decs</label>
            <textarea v-model="taskDesc" type="text" id="taskDescinput" class="form-control" placeholder="Add desc"></textarea>
         <!--  <label for="tasknameinput">Image</label>
            <input v-model="taskImage" type="text" id="tasknameinput" class="form-control" placeholder="image"> -->
          <a href="/#/img2"><button id="btnadd" class="btn btn-success" >Submit
          </button></a> 
    </div>
    </form>

                        
                        <!-- <form  @submit="formSubmit">
                            <label for="post_id">id</label>
      <input v-model="postid"  type="text" id="inputpostid" class="form-control " placeholder="id">
       <label for="tasknameinput"> Name</label>
            <input v-model="imgName" type="text" id="tasknameinput" class="form-control" placeholder="Add title">
        
                        <strong>Image:</strong>
                        <input type="file" class="form-control"   v-on:change="onImageChange" >
 
                        <button class="btn btn-success"  >Submit</button>
                        </form> -->
        <table >

         
          <td><label><h5>id</h5></label></td> <td><label ><h5>title</h5></label></td> <td><label ><h5>desc</h5></label></td>
        <tr v-for="(blogs) in post" v-bind:key="blogs.id" v-bind:title="blogs.title"  v-bind:Desc="blogs.desc">
           <!--  <img :src="'http://localhost:8000/uploads/' + blogs.image" width="300px" height="300px">  -->

          
          <td class="text" id='blogid'>{{blogs.id}} : </td>
          
    
        
            <router-link :to="{ name: 'Login', params: { id: blogs.id }}">
                <!-- {{ blogs.title }}  --><img :src="'http://localhost:8000/uploads/'+blogs.id+'/' + blogs.image" width="300px" height="300px">
            </router-link>  <!-- url dinamis -->
       
         

            <td class="text"> {{blogs.title}}</td>
            

              <td class="text">{{blogs.desc}}</td>
              
                 <!--  <td class="text">{{blogs.imgg}} -->
                   </td>

            
             
            

             
          <td class="text-right">
            <button class="btn btn-info" id="ed"  v-on:click="editTask(blogs.desc, blogs.title, blogs.image, blogs.id)">Edit = {{blogs.id}}</button>
            <button class="btn btn-danger" v-on:click="deleteThis(blogs.id)">Delete = {{blogs.id}}</button>

              <button class="btn btn-primary btn-block mt-3"  type="button" v-on:click="update(blogs.id)"  >Update</button>


          </td>
        </tr>
         <tr v-for="(img) in img" v-bind:key="img.id" v-bind:title="img.id_blogs"  v-bind:Desc="img.image">
          
          
    
        
             <!-- url dinamis -->
      
         <td>
          <!-- <img :src="'http://localhost:8000/uploads/' + img.image" width="300px" height="300px">     -->       
         </td>


           <!--  <td class="text"> {{img.id_blogs}}</td>
            

              <td class="text">{{img.image}}</td> -->
        </tr>
      </table>
       <table>
         
      </table >

     
         
         
     

  <a href="/#/data" >go</a>

    <button @click="getData()" v-on:click="getDataImg()" type="button" name="button" id="b">look</button>
     <button @click="getDataImg()" type="button" name="button" id="a">look img</button>
     
  </div>
</template>



<script>

import axios from 'axios';
import $ from 'jquery';


export default {

  data() {
   
    return {

      post: [],

      id: '',
      taskname: '',
      taskDesc: '',
      taskImage: '',
      
      isEdit:false
    }

      
  },
  mounted() {
  this.getData();
  this.getData();
    
  },


  methods: {
   
   /* getId(){
 axios.get("http://localhost:8000/api/getID").then(
      result => {
       // console.log(result.data.id)
        this.oid = result.data.id;
       this.idd = this.oid+1;
       console.log(this.idd);
        sessionStorage.setItem("img", this.idd);

      },
      error => {
        console.error(error)
      }
    );
    },*/
     
  getData() {
     sessionStorage.removeItem('name');
      
      axios.get("http://localhost:8000/api/tes").then(
      result => {
        console.log(result.data)
        this.post = result.data;
      
        
            

       // sessionStorage.setItem("name", ob);
      //  alert('ok read');
      },
      error => {
        console.error(error)
      }
    )
  },
  getDataImg() {
    // sessionStorage.removeItem('name');

      axios.get("http://localhost:8000/api/tes/img").then(
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

                console.log(e.target.files[0]);

                this.image = e.target.files[0];
                var im = e.target.files[0];
                console.log(im.lastModified);
            

                sessionStorage.setItem("name", ob);
              var ob = im.name;
                //var ob = im.lastModified + '.png';
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

    addNewTask() {
      
        var d  = sessionStorage.getItem("img");
      var Image  = sessionStorage.getItem("name");
        axios.post("http://localhost:8000/api/tes/create", {title: this.taskname, desc: this.taskDesc, image: d+Image})
        .then(function (res){
          /*this.taskname = ''
          this.getData()
          currentObj.success = res.data.success;*/
           console.log(res.data)
           alert(res.data)
          console.log('add='+res.data)
          
        })
        .catch(function (error) {
          console.log(error)
         /* currentObj.output = error;*/
        });

        axios.get("http://localhost:8000/api/getID").then(
      result => {
       // console.log(result.data.id)
        this.oid = result.data.id;
       this.idd = this.oid+1;
       console.log(this.idd);
        sessionStorage.setItem("img", this.idd);

      },
      error => {
        console.error(error)
      }
    );

        
      },


      editTask(desc,title,image, id){
        this.id = id
        this.taskname = title
        this.taskDesc = desc
        this.taskImage = image
        this.isEdit = true

        sessionStorage.setItem("imgNameEd", image);
      },

        update(id) {
        var Image  = sessionStorage.getItem("name");
                 var d  = sessionStorage.getItem("imgNameEd");

        axios.put("http://localhost:8000/api/tes/u/"+id, {title: this.taskname, desc: this.taskDesc, image: d})

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
