import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_fk052as",
                "template_lig44sm",
                form.current,
                "JKHM6BYxoM2a70kOq"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (
        <>
            <div className="contact" id="contact">
                <h2>CONTACT ME</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <div className="emailform">
                        <input type="text" name="user_name" placeholder="Name" />
                        <input type="email" name="user_email" placeholder="Email" />
                        <textarea name="message" placeholder="Message"/>
                        <input type="submit" value="Send" />
                    </div>
                </form>
            </div>
            <br />
        </>
    );
};

export default ContactUs;
