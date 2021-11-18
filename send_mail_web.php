<?php

if (isset($_POST)) {

    $name = $_POST["name"];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    //Data of the mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $receiver = "info@antonioweb.es";
    $subject = "Contacto desde la web: " . $name;
    $sender = $email;
    $msg_content = "De: " . $name . "<br>";
    $msg_content .= "Correo: $email <br>";
    $msg_content .= $phone == "" ? "" : "Tlf: $phone <br>"; //optional field
    $msg_content .= "Mensaje: $message";
    
    //Send the mail
    mail($receiver, $subject, $msg_content, $headers);

    echo "Mensaje enviado con éxito";
}
?>