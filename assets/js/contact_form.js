//Regular expressions for form fields
/*
var expr_username = new RegExp(/^[0-9A-Za-zÁÉÍÓÚñáéíóúÑ_]+$/);
var expr_name = new RegExp(/^[A-Za-zÁÉÍÓÚñáéíóúÑ\s]+$/);
var expr_text = new RegExp(/^[A-Za-zÁÉÍÓÚñáéíóúÑ_!?¿'¡()%$·@#|\s]+$/);
var expr_email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
var expr_phone = new RegExp(/^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}+$/);
var expr_phone2 = new RegExp(/^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/);
var expr_pass = new RegExp(/^[0-9A-Za-z!@#$&/|*_-]\S{8,16}$/);
var expr_bool = new RegExp(/[0-1]/);
var expreg = "^([0-9]){15,19}$"; //min 15, max 19
*/

var expr_name = new RegExp(/^[A-Za-zÁÉÍÓÚñáéíóúÑ\s]{3,50}$/);
var expr_text = new RegExp(/^[A-Za-zÁÉÍÓÚñáéíóúÑ_!?,.:;¿'*/"&¡()%$·@#|0-9\s]{10,500}$/);
var expr_email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
var expr_phone = new RegExp(/^(\+34|0034|34)?[ -]*(6|7|9)[ -]*([0-9][ -]*){8}/);
var expr_phone2 = new RegExp(/^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/);

$(document).ready(function() {

    $("input").focusout(function() {
        verifyFields();
    });

    $("textarea").focusout(function() {
        verifyFields();
    });

    $("input").keyup(function() {
        verifyFields();
    })

    $("textarea").keyup(function() {
        if ($(this).val().length > 9) {
            verifyFields();
        }
    })

    checkbox = document.getElementById('checkbox');
    checkbox.addEventListener('change', function() {
        if (!checkbox.checked) {
            $('#checkbox').addClass('input__error');
        } else {
            $('#checkbox').removeAttr('title');
        }
    });

    $('#btnSend').click(function() {
        var errors = '';

        //Spinner
        $('#btnSend span').removeClass('no-spinner');

        // Validate name ==============================
        if ($('#name').val() == '') {
            errors += '<p class="error"><i class="fas fa-exclamation-circle"></i>Escriba un nombre al menos</p>';
            $('#name').addClass('input__error');
        } else {
            var name_value = $('#name').val().trim();
            if (!validate(name_value, 'name')) {
                errors += '<p class="error"><i class="fas fa-exclamation-circle"></i>El nombre no puede contener símbolos ni números</p>';
                $('#name').attr("title", "El nombre no puede contener símbolos ni números (3-50)");
            } else {
                $('#name').css("border-bottom-color", "#d1d1d1");
            }
        }

        // Validate email ==============================
        if ($('#email').val() == '') {
            errors += '<p class="error"><i class="fas fa-exclamation-circle"></i>Ingrese un correo, por favor</p>';
            $('#email').addClass('input__error');
        } else {
            var email_value = $('#email').val().trim();
            if (!validate(email_value, 'email')) {
                errors += '<p class="error"><i class="fas fa-exclamation-circle"></i>El correo no tiene un formato correcto</p>';
                $('#email').attr("title", "El correo debe tener un formato válido y su dominio tener entre 2 y 3 caracteres");
            } else {
                $('#email').css("border-bottom-color", "#d1d1d1");
            }
        }

        // Validate message ==============================
        if ($('#message').val() == '') {
            errors += '<p class="error"><i class="fas fa-exclamation-circle"></i>Escriba algo en el mensaje</p>';
            $('#message').attr("title", "El mensaje debe contener algo escrito (10-500)");
            $('#message').addClass('input__error');
        } else {
            $('#message').css("border-bottom-color", "#d1d1d1");
        }

        // Validate checkbox ==============================
        if (!checkbox.checked) {
            errors += '<p class="error"><i class="fas fa-exclamation-circle"></i>Marque la casilla para poder enviar su información</p>';
            $('#checkbox').attr("title", "Es necesario marcarlo para poder enviar su información");
        } else {
            $('#checkbox').removeAttr('title');
        }

        // SENDING message ============================
        if (errors == '' == false) {
            $('#errors').css("visibility", "visible");
            $('.errors').append(errors);

        } else { //If there are no errors, the ajax request is executed to send the mail with the collected data.

            ajaxRequest();
            //Spinner
        }

        // CLOSE/HIDDEN MODAL ==============================
        $('#btnClose').click(function() {
            $('#errors').css("visibility", "hidden");
            $('.errors .error').remove();
            errors = '';
            $('#btnSend span').addClass('no-spinner');
        });

        $('#btnConfirm').click(function() {
            $('#confirm').css("visibility", "hidden");
            $('#btnSend span').addClass('no-spinner');
        });
    });

});

function ajaxRequest() {

    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var phone = $('#phone').val().trim();
    var message = $('#message').val().trim();
    var checkbox = document.getElementById('checkbox');

    if (!checkbox.checked) {
        $('#checkbox').addClass('input__error');
    } else {
        $('#checkbox').removeClass('input__error');
    }

    //if name and email are validated
    if (checkbox.checked && validate(name, 'name') && validate(email, 'email') && validate(message, 'text') && (phone.length == 0 || (phone.length != 0 && validate(phone, 'phone')))) {
        //Form fields data:
        var fields = {
            "name": name,
            "email": email,
            "phone": phone.length == 0 ? "" : phone,
            "message": message,
        }

        $('#form')[0].reset();
        $('input').removeClass('input__validation');
        $('textarea').removeClass('input__validation');

        //Request to PHP where will send the mail
        $.ajax({
            type: "POST",
            url: '../../send_mail_web.php',
            data: fields,
            success: function(response) {
                $('#confirm').css("visibility", "visible");
                $('#textConfirm').text(response);
            }
        });
    }
}
/**
 * 
 * @param {var} field -> Field text to validate
 * @param {var} expr -> Regular expression in text. Ej: 'email','phone','name' 
 * @returns 
 */
function validate(field, expr) {
    //By the 'expr' selected the regular expression testing if it's true or not
    switch (expr) {
        case 'name':
            return expr_name.test(field);
        case 'email':
            return expr_email.test(field);
        case 'text':
            return expr_text.test(field);
        case 'phone':
            return (expr_phone2.test(field) || expr_phone.test(field));
    }
}

function verifyFields() {
    //Verify fields has changed and if it meet the requirements
    if ($("#name").val().trim().length > 0) {
        var name_value = $('#name').val().trim();
        if (validate(name_value, 'name')) {
            $('input#name').removeClass('input__error');
            $('input#name').removeAttr('title');
            $('input#name').addClass('input__validation');
        } else {
            $('input#name').removeClass('input__validation');
            $('input#name').addClass('input__error');
            $('input#name').attr("title", "El nombre no puede contener símbolos ni números (3-50)");
        }
    } else {
        $('input#name').removeClass('input__validation');
        $('input#name').removeAttr('title');
    }

    if ($("#email").val().trim().length > 0) {
        var email_value = $('#email').val().trim();
        if (validate(email_value, 'email')) {
            $('input#email').removeClass('input__error');
            $('input#email').removeAttr('title');
            $('input#email').addClass('input__validation');
        } else {
            $('input#email').removeClass('input__validation');
            $('input#email').addClass('input__error');
            $('input#email').attr("title", "El correo debe tener un formato válido y su dominio tener entre 2 y 3 caracteres");
        }
    } else {
        $('input#email').removeClass('input__validation');
        $('input#email').removeAttr('title');
    }

    if ($("#phone").val().trim().length > 0) {
        var phone_value = $('#phone').val().trim();
        if (validate(phone_value, 'phone')) {
            $('input#phone').removeClass('input__error');
            $('input#phone').removeAttr('title');
            $('input#phone').addClass('input__validation');
        } else {
            $('input#phone').removeClass('input__validation');
            $('input#phone').addClass('input__error');
            $('input#phone').attr("title", "El número escrito no existe");
        }
    } else {
        $('input#phone').removeClass('input__error');
        $('input#phone').removeClass('input__validation');
        $('input#phone').removeAttr('title');
    }

    if ($("#message").val().trim().length > 0) {
        var message_value = $('#message').val().trim();
        if (validate(message_value, 'text')) {
            $('#message').removeClass('input__error');
            $('#message').removeAttr('title');
            $('#message').addClass('input__validation');
        } else {
            $('#message').removeClass('input__validation');
            $('#message').attr("title", "El mensaje debe contener algo escrito (10-500)");
        }
    } else {
        $('#message').removeClass('input__validation');
        $('#message').removeAttr('title');
    }
}