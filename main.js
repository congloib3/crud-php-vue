var app = new Vue({
    el: "#app",
    data:{
        errorMsg:false,
        successMsg:false,
        showAddModal:false,
        showEditModal:false,
        showDeleteModal:false,
        users:[],
        formUser:{name:"", email:"", phone:""},
        currentUser:{}
    },
    mounted() {
        this.getAllUsers();
    },
    methods: {
        getAllUsers(){
            axios.get("http://localhost/crud-vue-php/process.php?action=read")
            .then(response=>{
                if(response.data.error){
                    this.errorMsg = response.data.message;
                }else{
                    this.users=response.data.users;
                }
            });
        },
        addUser(){
            var form_data = this.toFormData(this.formUser);
            axios.post("http://localhost/crud-vue-php/process.php?action=create", form_data)
            .then(response=>{
                this.formUser = {name:"", email:"", phone:""};
                if(response.data.error){
                    this.errorMsg = response.data.message;
                }else{
                    this.successMsg = response.data.message;
                    this.getAllUsers();
                }
            });
        },
        updateUser(){
            var form_data = this.toFormData(this.currentUser);
            axios.post("http://localhost/crud-vue-php/process.php?action=update", form_data)
            .then(response=>{
                this.currentUser = {};
                if(response.data.error){
                    this.errorMsg = response.data.message;
                }else{
                    this.successMsg = response.data.message;
                    this.getAllUsers();
                }
            });
        },
        deleteUser(){
            var form_data = this.toFormData(this.currentUser);
            axios.post("http://localhost/crud-vue-php/process.php?action=delete", form_data)
            .then(response=>{
                this.currentUser = {};
                if(response.data.error){
                    this.errorMsg = response.data.message;
                }else{
                    this.successMsg = response.data.message;
                    this.getAllUsers();
                }
            });
        },
        selectUser(user){
            this.currentUser = user;
        },
        toFormData: function(obj){
            var form_data = new FormData();
            for(var key in obj){
                form_data.append(key, obj[key]);
            }
            return form_data;
        },
        clearMsg(){
            this.errorMsg="";
            this.successMsg="";
        }
    },
})