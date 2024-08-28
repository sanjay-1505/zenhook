const form=document.querySelector('form')

const name1=document.getElementById("name");
const email1=document.getElementById("email");
const subject=document.getElementById("subject");
const message=document.getElementById("message");

function sendEmail(){
    const body=`Name:${name1.value}<br>Email:${email1.value}<br>Message:${message.value}`
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "nsanjay1505@gmail.com",
        Password : "74F3506290162834B5EF2DBDFAEF49528888",
        To : 'nsanjay1505@gmail.com',
        From : "nsanjay1505@gmail.com",
        Subject : subject.value,
        Body : body
    }).then(
      message => {
        if(message=="OK"){
            Swal.fire({
                title: "Good job!",
                text: "Succesfully Delivered!",
                icon: "success"
              });
        }
      }
    );
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    sendEmail();
    form.reset();
    return false;
})