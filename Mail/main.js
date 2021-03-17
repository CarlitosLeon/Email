var nodemailer = require("nodemailer");
/*var express = require("express");
var app = express();*/
var correo = "carlos.linares@sinapsist.net";

module.exports = (formulario) => {
     var transporter = nodemailer.createTransport({
         host:"smtp.ionos.mx",
         post:995,
        //host: "smtp.gmail.com",
       // post: 465,
        secure: true,
        auth: {
            user: correo,
            pass: 'C@rl1tos99'
           // user: "linaresalberto1998@gmail.com",
           // pass: 'yplrmhleqrpqtatr'
        },
    });

    const mailOptions = {
        from: `"${formulario.nombre} 👻" <${correo}>`,
        to: ` <${formulario.email}>`, // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
         ${formulario.mensaje}
        `
        
    }
    console.log(formulario);

    transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            res.status(500).send(error.message);
        }else{
            console.log("Email enviado.");
            res.status(200).jsonp(req.body);
        }

    }); 

}

