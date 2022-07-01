import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
    let [firstname, setFirstName] = useState("");
    let [lastname, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");
    let [formErrors, setFormErrors] = useState({});
    let [loginFormErrors, setLoginFormErrors] = useState({});
    let [modalState, setModalState] = useState(true);

    const history = useHistory();
    const notify = () => {
        toast.success("Successfully registered user.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const registerUser = (e) => {
        e.preventDefault();
        let formInfo = { firstname, lastname, email, password, confirm };
        axios
            .post("http://localhost:8000/api/users/register", formInfo, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.errors) {
                    setFormErrors(res.data.errors);
                    setModalState(true)
                } else {
                    setModalState(false)
                    notify();
                    console.log("Successfully created user", res);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setConfirm("");
                }
            })
            .catch((err) => {
                console.log("Error creating user", err);
            });
    };
    const login = (e) => {
        e.preventDefault();
        let loginInfo = { email, password };
        axios
            .post("http://localhost:8000/api/users/login", loginInfo, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.error) {
                    setLoginFormErrors(res.data.error);
                } else {
                    console.log("Successfully created user", res);
                    history.push("/dashboard");
                }
            })
            .catch((err) => {
                console.log("Error when logging in", err);
            });
    };
    return (
        <>
            <div className="content">
                <div className="leftlogin">
                    <ToastContainer />
                    <form onSubmit={login}>
                        <h2>Log into your account</h2>
                        <label htmlFor="">Email address</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary mt-2">
                            Login
                        </button>
                    </form>
                    <p>
                        New User? Register{" "}
                        <a
                            href="#"
                            data-toggle="modal"
                            data-target="#exampleModal"
                        >
                            Here
                        </a>
                    </p>
                    {!modalState?
                                    null:
                    <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5
                                        class="modal-title"
                                        id="exampleModalLabel"
                                    >
                                        Register
                                    </h5>
                                    <button
                                        type="button"
                                        class="btn-close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={registerUser}>
                                        <div className="form-group">
                                            <label htmlFor="">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                value={firstname}
                                            />
                                            <small id="emailHelp" class="form-text text-muted">{formErrors.firstname?.message}</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                                value={lastname}
                                            />
                                            <small id="emailHelp" class="form-text text-muted">{formErrors.lastname?.message}</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Email address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                value={email}
                                            />
                                            <small id="emailHelp" class="form-text text-muted">{formErrors.email?.message}</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                value={password}
                                            />
                                            <small id="emailHelp" class="form-text text-muted">{formErrors.password?.message}</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setConfirm(e.target.value)
                                                }
                                                value={confirm}
                                            />
                                            <small id="emailHelp" class="form-text text-muted">{formErrors.confirm?.message}</small>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    {
                                        
                                    !modalState?
                                        <button
                                        type="submit"
                                        class="btn btn-primary"
                                        data-dismiss="modal"
                                        onClick={registerUser}
                                        id="submit"
                                    >
                                        Submit
                                    </button> :
                                        <button
                                        type="submit"
                                        class="btn btn-primary"
                                       // data-dismiss="modal"
                                        onClick={registerUser}
                                        id="submit"
                                    >
                                        Submit
                                    </button>
}
                                </div>
                            </div>
                        </div>
                    </div>
}
                </div>
                <div className="rightlogin"></div>
            </div>
        </>
    );
};

export default Login;
