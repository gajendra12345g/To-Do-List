const addUserBtn =document.getElementById("addUser");
const btnText=addUserBtn.innerText;
const usernameTextField =document.getElementById("username");
const recordsDisplay=document.getElementById("records");
let userArray=[];
edit_id=null;
let objStr=localStorage.getItem('users');
if(objStr!=null){
    userArray=JSON.parse(objStr);

}
 displayInfo();

addUserBtn.onclick=()=>{
    const name=usernameTextField.value;
    if(edit_id!=null){
        // edit
        userArray.splice(edit_id,1,{"name": name});

        edit_id=null;
    }else{
        // insert
       
        userArray.push({"name": name});
    }
    
    console.log(userArray);
    saveInfo(userArray);
    usernameTextField.value="";
    addUserBtn.innerHTML=btnText;
}

function saveInfo(userArray){
    let str=JSON.stringify(userArray);
    localStorage.setItem("users",str);
    displayInfo();

}

function displayInfo(){
 let statement='';
 userArray.forEach((item,i)=>{
    statement += `<tr>
    <th scope="row">${i+1}</th>
    <td>${item.name}</td>
    <td><i class="btn text-white fa fa-edit btn-info mx-3" onclick='editInfo(${i})'></i>
    <i class="btn text-white fa fa-trash-o btn-danger" onclick='deleteInfo(${i})'></i></td>
  </tr>`;
 });
 
recordsDisplay.innerHTML=statement;

}

function editInfo(id){
    edit_id=id;
    addUserBtn.innerHTML="save changes";
    usernameTextField.value=userArray[id].name;

}

function deleteInfo(id){
    userArray.splice(id,1);
    saveInfo(userArray);
    displayInfo()
}



