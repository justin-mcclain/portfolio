import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Dashboard = () => {
    let [name, setName] = useState("");
    let [category, setCategory] = useState("");
    let [price, setPrice] = useState("");
    let [date, setDate] = useState("");
    let [refresh, setRefresh] = useState(false)
    let [loggedInUser, setLoggedInUser] = useState({});
    let [transactions, setTransactions] = useState([]);
    let [formErrors, setFormErrors] = useState({});
    const history = useHistory();
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/getLoggedInUser", {
                withCredentials: true,
            })
            .then((res) => {
                console.log("res when getting logged in user", res);
                setLoggedInUser(res.data.results);
                console.log(res.data.results._id);
                axios
                    .get(
                        `http://localhost:8000/api/transactionsbyuser/${res.data.results._id}`
                    )
                    .then((res) => {
                        console.log("Retrieved users transactions", res);
                        setTransactions(res.data.results);
                    })
                    .catch((err) => {
                        console.log("Error retrieveing user transactions", err);
                    });
            })
            .catch((err) => {
                console.log("err when gettign logged in user", err);
                history.push("/");
            });
    }, [refresh]);
    const upload = (e) => {
        e.preventDefault();
        let formInfo = {
            name,
            category,
            price,
            date,
            user_id: loggedInUser._id,
        };
        axios
            .post("http://localhost:8000/api/transactions/", formInfo, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.errors) {
                    setFormErrors(res.data.errors);
                } else {
                    console.log("Successfully created transaction", res);
                    setName("");
                    setCategory("");
                    setPrice("");
                    setDate("");
                    setRefresh(!refresh);
                }
            })
            .catch((err) => {
                console.log("Error creating user", err);
            });
    };
    const logout = () => {
        axios
            .get("http://localhost:8000/api/users/logout", {
                withCredentials: true,
            })
            .then((res) => {
                history.push("/");
            })
            .catch((err) => {
                console.log("errrr logging out", err);
            });
    };
    const nameSort = () =>{
        let nameSortedData = [...transactions].sort((a,b) => {
            return a.name.charAt(0).toUpperCase() > b.name.charAt(0).toUpperCase() ? 1 : -1
        })
        setTransactions(nameSortedData)
    }
    const priceSort = () =>{
        let priceSortedData = [...transactions].sort((a,b) => {
            return a.price > b.price ? 1 : -1
        })
        setTransactions(priceSortedData)
    }
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(transactions.length / usersPerPage);
    const displayTransactions = transactions
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((tObj) => {
        return (
            <>
                <div className="row mb-3">
                    <div className="col d-flex flex-column">
                        <p><b>{tObj.name
                            .charAt(0)
                            .toUpperCase() +
                            tObj.name.slice(1)}</b></p>
                        <p><em>{tObj.category}</em></p>
                    </div>
                    <div className="col text-end d-flex flex-column">
                        <p style={{fontSize: "25px"}}>
                            $
                            {(
                                Math.round(
                                    tObj.price * 100
                                ) / 100
                            ).toFixed(2)}
                        </p>
                        <p>
                            {tObj.date.slice(0, 10)}
                        </p>
                    </div>
                </div>
                <hr />
            </>
        );
    })
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <>
            <div className="container d-flex">
                <div className="left">
                    <div className="leftcontent d-flex flex-column justify-content-between">
                        <img src="/images/logo.png" alt="" />
                        <div className="leftcontentnav d-flex flex-column mt-3 mb-3 align-items-center">
                            <p>Dashboard</p>
                            <p>Something Else</p>
                            <p>Settings</p>
                        </div>
                        <button className="btn btn-secondary" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
                <div className="right">
                    <div className="top d-inline-flex">
                        <h1>Welcome {loggedInUser.firstname}</h1>
                        <div className="boxholder d-flex justify-content-between">
                            <div className="float d-flex justify-content-center align-items-center float1">
                                <p>GRAPH</p>
                            </div>
                            <div className="float d-flex justify-content-center align-items-center float2">
                                <p>GRAaaPH</p>
                            </div>
                            <div className="float d-flex justify-content-center align-items-center float3">
                                <p>GRAPH</p>
                            </div>
                        </div>
                    </div>
                    <div className="middle d-flex justify-content-around">
                    </div>
                    <div className="bottom d-flex justify-content-center">
                        <div className="contentsquare">
                            <div className="contenttop d-flex justify-content-between">
                                <h3>Transactions</h3>
                                <div className="sorting d-flex">
                                    <button className="btn btn-success" onClick={nameSort}>Sort by Name</button>
                                    <button className="btn btn-success" onClick={priceSort}>Sort by Price</button>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                >
                                    Upload
                                </button>
                            </div>
                            <div className="contentdata">
                                {displayTransactions}
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={changePage}
                                    containerClassName={"pagination justify-content-center"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />
                            </div>
                            <div
                                className="modal"
                                id="exampleModal"
                                tabIndex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5
                                                className="modal-title"
                                                id="exampleModalLabel"
                                            >
                                                Upload Transaction
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <label htmlFor="">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    value={name}
                                                />
                                                <label htmlFor="">
                                                    Category
                                                </label>
                                                <select
                                                    className="form-select"
                                                    defaultValue={"default"}
                                                    onChange={(e) =>
                                                        setCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="default">
                                                        Select Category
                                                    </option>
                                                    <option value="Bills">
                                                        Bills
                                                    </option>
                                                    <option value="Clothing">
                                                        Clothing
                                                    </option>
                                                    <option value="Groceries">
                                                        Groceries
                                                    </option>
                                                    <option value="Rent/Mortgage">
                                                        Rent/Mortgage
                                                    </option>
                                                    <option value="Restaurants">
                                                        Restaurants
                                                    </option>
                                                    <option value="Shopping">
                                                        Shopping
                                                    </option>
                                                    <option value="Travel">
                                                        Travel
                                                    </option>
                                                </select>
                                                <label className="control-label">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                    value={price}
                                                />
                                                <label htmlFor="">Date</label>
                                                <input
                                                    type="date"
                                                    id="today"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setDate(e.target.value)
                                                    }
                                                />
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={upload}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;


