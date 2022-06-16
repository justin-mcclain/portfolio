import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [message, setMessage] = useState("");
    const form = useRef();
    const notifySuccess = () => {
        toast.success("Email sent!", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const notifyError = () => {
        toast.error("Please submit name and message.", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const sendEmail = (e) => {
        e.preventDefault();
        if (name.length > 1 && email.length > 1 && message.length > 1) {
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
                        setName("");
                        setEmail("");
                        setMessage("");
                        notifySuccess();
                    },
                    (error) => {
                        console.log(error.text);
                    }
                );
        } else {
            notifyError();
        }
    };

    return (
        <>
            <div className="contact">
                <ToastContainer/>
                <h2 className="headertext">CONTACT ME</h2>
                <form ref={form} onSubmit={sendEmail}>
                    <div className="emailform">
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <textarea
                            name="message"
                            placeholder="Message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <input
                            type="submit"
                            value="Send"
                            className="subbutton"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactUs;
