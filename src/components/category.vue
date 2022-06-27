<template>
  <div class="hello">
  <!-- table -->

             <!-- .end table -->

    <h2>Cari</h2>
<form class="form-inline mt-2 mt-md-0" >
    <input v-model="messege" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
    
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="getCari(messege)">{{messege}}</button>
  </form>
      <div class="row ">
    <button class="btn btn-primary"  v-on:click="getCari('teknologi')">teknologi</button>
   <button class="btn btn-info"  v-on:click="getCari('lain')">lain</button>
    <div class="col-sm-2" style="background-color:grey;">.col-sm-4</div>
    <div class="col-sm-2" style="background-color:red;">.col-sm-4</div>
   
  </div>
        <table >
          <td><label><h5>id</h5></label></td><td><label><h5>Categori</h5></label></td> <td><label ><h5>title</h5></label></td> <td><label ><h5>desc</h5></label></td>
         
        <tr v-for="(blogs) in post" v-bind:key="blogs.id" v-bind:title="blogs.title"  v-bind:Desc="blogs.desc">


          <td class="text">{{blogs.id}} : </td>
          <td class="text">{{blogs.category}} : </td>
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
     <td class="alert"><h4>{{result}}</h4></td>
     
<td id="td">
  <button class="btn btn-primary" id="t" v-on:click="counterT += 1" @click="recomen(counterT,'Th')">tekno</button>
  <button class="btn  btn-info" id="f" v-on:click="counterF += 1" @click="recomen(counterF,'Fh')">fasion</button>
  <button class="btn btn-primary" id="s" v-on:click="counterS += 1" @click="recomen(counterS,'Sh')">spot</button>
  <div id="Thasil">{{counterT}}</div>
  <div id="Fhasil">{{counterF}}</div>
  <div id="Shasil">{{counterS}}</div>
  <button class="btn btn-primary" id="o"  @click="hasil()" >Hasil</button>
</td>

  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';


export default {

  data() {
    
    return {
      messege:'',
      post: [],
      id: '',
      taskname: '',
      taskDesc: '',
      result:'',
      counterF:0,
       counterT:0,
        counterS:0,
      isEdit:false
      

    }
  },
  mounted() {
  this.getData()
  },
  
  methods: {
  //read
   getCari(id){
   
 axios.get("http://localhost:8000/api/cari/"+id).then(
      result => {
        if (result.data.length != 0) {
           console.log(result.data.length)
        this.post = result.data;
        this.result = '';

        }else if(result.data.length == 0){
        console.log(result.data.length)

        this.result = 'Data Not Found';
       }
       

      },
      error => {
        console.error(error)
      }
    );
    },
     

    addNewTask() {
        axios.post("http://localhost:8000/api/tes/create", {title: this.taskname, desc: this.taskDesc}).then(res => {
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

      },

      recomen(id,n){
       if (n == "Th") {
        console.log('Th');
          var Th=$("#Thasil").text();
        sessionStorage.setItem("Th", id);
          console.log('Th='+id);
       }else if (n == "Fh") {
        console.log('Fh');
         var Fh=$("#Fhasil").text();
         sessionStorage.setItem("Fh", id);
         console.log('Fh='+id);
       }else if (n ==  "Sh") {
        console.log('Sh');

         var Sh=$("#Shasil").text();
          sessionStorage.setItem("Sh", id);

          console.log('Sh='+id);          

       }
        
       
       
         
          console.log('clik='+id);
          
          

           
      },

      hasil(){

        var T  = sessionStorage.getItem("Th");
        var F  = sessionStorage.getItem("Fh");
        var S  = sessionStorage.getItem("Sh");



        if (F < T && S < T) {
          console.log('Tekno');
          axios.get("http://localhost:8000/api/cari/"+'teknologi').then(
      result => {
        if (result.data.length != 0) {
           console.log(result.data.length)
        this.post = result.data;
        this.result = '';
        

        }else if(result.data.length == 0){
        console.log(result.data.length)

        this.result = 'Data Not Found';
       }
       

      },
      error => {
        console.error(error)
      }
    );

        }else if(T < F && S < F){
          console.log('fasion');
           axios.get("http://localhost:8000/api/cari/"+'lain').then(
      result => {
        if (result.data.length != 0) {
           console.log(result.data.length)
        this.post = result.data;
        this.result = '';
        


        }else if(result.data.length == 0){
        console.log(result.data.length)

        this.result = 'Data Not Found';
       }
       

      },
      error => {
        console.error(error)
      }
    );
           
        }else if (F < S && T < S) {
          console.log('spot');
           axios.get("http://localhost:8000/api/cari/"+'spot').then(
      result => {
        if (result.data.length != 0) {
           console.log(result.data.length)
        this.post = result.data;
        this.result = '';


        }else if(result.data.length == 0){
        console.log(result.data.length)

        this.result = 'Data Not Found';
       }
       

      },
      error => {
        console.error(error)
      }
    );

        }
        
      },
      jquery(){
        $("#cat").hide();
        $("#td").show();

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
