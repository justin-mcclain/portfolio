import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import CurrencyInput from "react-currency-input-field";
import { toast, ToastContainer } from "react-toastify";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { setRef } from "@mui/material";

const Dashboard = () => {
    let [name, setName] = useState("");
    let [category, setCategory] = useState("");
    let [price, setPrice] = useState("");
    let [date, setDate] = useState("");
    let [refresh, setRefresh] = useState(false);
    let [loggedInUser, setLoggedInUser] = useState({});
    let [transactions, setTransactions] = useState([]);
    let [monthTransactions, setMonthTransactions] = useState([]);
    let [mT, setMT] = useState([]);
    let oneMonthAgo = 0
    let twoMonthAgo = 0
    let [formErrors, setFormErrors] = useState({});
    let [ns, setNs] = useState(false);
    let [ps, setPs] = useState(false);
    let [data1, setData1] = useState([]);
    let [data2, setData2] = useState("");
    let [data3, setData3] = useState("");
    let [data4, setData4] = useState("");
    let [filteredBills, setFilteredBills] = useState(false);
    let [filteredCloth, setFilteredCloth] = useState(false);
    let [filteredGroc, setFilteredGroc] = useState(false);
    let [filteredRent, setFilteredRent] = useState(false);
    let [filteredRes, setFilteredRes] = useState(false);
    let [filteredShop, setFilteredShop] = useState(false);
    let [filteredTravel, setFilteredTravel] = useState(false);
    let [monthCategories, setMonthCategories] = useState([]);
    let billTotal = 0;
    let restaurantTotal = 0;
    let clothTotal = 0;
    let rentTotal = 0;
    let travelTotal = 0;
    let shopTotal = 0;
    let groceryTotal = 0;
    let [loaded, setLoaded] = useState(false);
    const history = useHistory();
    var moment = require("moment");
    let currentMonth = moment().format("MMMM");
    useEffect(() => {
        setMonthTransactions([])
        setMonthCategories([])
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
                        setTransactions(res.data.results.sort((a, b) => (a.date > b.date) ? -1 : 1));
                        res.data.results.forEach((mapObj) => {
                            if (
                                mapObj.category === "Bills" &&
                                moment(mapObj.date).utc().format("MMMM") ===
                                    currentMonth
                            ) {
                                billTotal += mapObj.price;
                            }
                            if (
                                mapObj.category === "Clothing" &&
                                moment(mapObj.date).utc().format("MMMM") ===
                                    currentMonth
                            ) {
                                clothTotal += mapObj.price;
                            }
                            if (
                                mapObj.category === "Restaurants" &&
                                moment(mapObj.date).utc().format("MMMM") ===
                                    currentMonth
                            ) {
                                restaurantTotal += mapObj.price;
                            }
                            if (
                                mapObj.category === "Groceries" &&
                                moment(mapObj.date).utc().format("MMMM") ===
                                    currentMonth
                            ) {
                                groceryTotal += mapObj.price;
                            }
                            if (
                                mapObj.category === "Rent/Mortgage" &&
                                moment(mapObj.date).utc().format("MMMM") ===
                                    currentMonth
                            ) {
                                rentTotal += mapObj.price;
                            }
                            if (
                                mapObj.category === "Shopping" &&
                                moment(mapObj.date).utc().format("MMMM") ===
                                    currentMonth
                            ) {
                                shopTotal += mapObj.price;
                            }
                            if (
                                mapObj.category === "Travel" &&
                                moment(mapObj.date).utc().format("MMMM") ===
                                    currentMonth
                            ) {
                                travelTotal += mapObj.price;
                            }
                            if (moment(mapObj.date).utc().format("MMMM") === moment().subtract(1, 'month').utc().format("MMMM")) {
                                oneMonthAgo += mapObj.price;
                            }
                            if (moment(mapObj.date).utc().format("MMMM") === moment().subtract(2, 'month').utc().format("MMMM")) {
                                twoMonthAgo += mapObj.price
                            }
                            if (moment(mapObj.date).utc().format("MMMM") === currentMonth) {
                                setMonthTransactions(monthTransactions => [...monthTransactions, mapObj]);
                                setMT(mT => [...mT, mapObj]);
                            }
                            if (moment(mapObj.date).utc().format("MMMM") === currentMonth && monthCategories.includes(mapObj.category) === false) {
                                setMonthCategories(monthCategories => [...monthCategories, mapObj.category])
                            }
                        });
                        setData1([
                            billTotal,
                            clothTotal,
                            restaurantTotal.toFixed(2),
                            groceryTotal,
                            rentTotal,
                            shopTotal,
                            travelTotal,
                        ]);
                        setData2(
                            billTotal +
                                clothTotal +
                                restaurantTotal +
                                groceryTotal +
                                rentTotal +
                                shopTotal +
                                travelTotal
                        );
                        setData3(oneMonthAgo);
                        setData4(twoMonthAgo);
                        setLoaded(true);
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
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    function displayChart() {
        if (loaded === true) {
            const data = {
                labels: [
                    "Bills",
                    "Clothing",
                    "Restaurants",
                    "Groceries",
                    "Rent/Mortgage",
                    "Shopping",
                    "Travel",
                ],
                datasets: [
                    {
                        label: "test",
                        data: data1,
                        backgroundColor: [
                            "#d41f23",
                            "#982890",
                            "#77b862",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0",
                        ],
                    },
                ],
            };
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Bar + Line Chart",
                    fontSize: 25,
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            };
            return <Doughnut data={data} options={options} />;
        } else {
            return "Loading...";
        }
    }

    function displayChart2() {
        if (loaded === true) {
            const data = {
                labels: [
                    moment().subtract(2, "month").format("MMMM"),
                    moment().subtract(1, "month").format("MMMM"),
                    moment().format("MMMM"),
                ],
                datasets: [
                    {
                        label: "Total",
                        data: [data4, data3, data2],
                        backgroundColor: [
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0",
                        ],
                    },
                ],
            };
            const options = {
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: true
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Bar + Line Chart",
                    fontSize: 25,
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            };
            return <Bar data={data} options={options} />;
        } else {
            return "Loading...";
        }
    }

    const notify = () => {
        toast.success("Successfully uploaded transaction.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
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
                    notify();
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
    const deleteT = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/transactions/${id}`)
        .then((res) => {
            console.log("Successfully deleted transaction", res)
            setRefresh(!refresh);
        })
        .catch((err) =>{
            console.log("Error deleting transaction", err)
        })
    }
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
    const nameSort = () => {
        let nameSortedData = [...monthTransactions].sort((a, b) => {
            return a.name.charAt(0).toUpperCase() >
                b.name.charAt(0).toUpperCase()
                ? 1
                : -1;
        });
        setMonthTransactions(nameSortedData);
    };
    const reverseNameSort = () => {
        let nameSortedData = [...monthTransactions].sort((a, b) => {
            return a.name.charAt(0).toUpperCase() >
                b.name.charAt(0).toUpperCase()
                ? -1
                : 1;
        });
        setMonthTransactions(nameSortedData);
    };
    const priceSort = () => {
        let priceSortedData = [...monthTransactions].sort((a, b) => {
            return a.price > b.price ? 1 : -1;
        });
        setMonthTransactions(priceSortedData);
    };
    const reversePriceSort = () => {
        let priceSortedData = [...monthTransactions].sort((a, b) => {
            return a.price > b.price ? -1 : 1;
        });
        setMonthTransactions(priceSortedData);
    };
    const filterByCat = (e, category) => {
        setMonthTransactions(mT.filter(monthTransaction => monthTransaction.category === category))
        
    }
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(monthTransactions.length / usersPerPage);
    const displayTransactions = monthTransactions
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((tObj) => {
            if (loaded) {
                return (
                    <>
                        <div className="d-flex justify-content-between align-items-center">
                            <p style={{ fontSize: "30px" }}>
                                <b>
                                    {tObj.name.charAt(0).toUpperCase() +
                                        tObj.name.slice(1)}
                                </b>
                            </p>
                            <div className="pricedel d-flex align-items-center">
                                <p style={{ fontSize: "30px" }}>
                                    $
                                    {(
                                        Math.round(tObj.price * 100) / 100
                                    ).toFixed(2)}
                                </p>
                                <a
                                    href="#"
                                    className="material-icons-outlined"
                                    style={{
                                        fontSize: "12px",
                                        textDecoration: "none",
                                    }}
                                    onClick={(e)=>deleteT(e,tObj._id)}
                                >
                                    delete
                                </a>
                            </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <p>
                                <em>{tObj.category}</em>
                            </p>
                            <div className="editdate d-flex align-items-center">
                                <p>
                                    {moment(tObj.date).utc().format("MMMM Do, YYYY")}
                                </p>
                                <a
                                    href="#"
                                    className="material-icons-outlined"
                                    style={{
                                        fontSize: "12px",
                                        textDecoration: "none",
                                    }}
                                >
                                    mode_edit
                                </a>
                            </div>
                        </div>
                        <hr />
                    </>
                );
            }
        });
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
                            <p>Transactions</p>
                            <p>Settings</p>
                        </div>
                        <button className="btn btn-secondary" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
                <div className="right">
                    <div className="top d-inline-flex">
                        <ToastContainer />
                        <h1>Welcome {loggedInUser.firstname}</h1>
                        <div className="boxholder">
                            <div className="float d-flex justify-content-center align-items-center float1 d-flex flex-wrap">
                                {displayChart()}
                            </div>
                            <div className="float d-flex justify-content-center align-items-center float2 d-flex flex-wrap text-center">
                                <h3>
                                    Current Spending in{" "}
                                    {moment().format("MMMM")}
                                </h3>
                                <h3>
                                    $
                                    {(Math.round(data2 * 100) / 100).toFixed(2)}
                                </h3>
                            </div>
                            <div className="float d-flex justify-content-center align-items-center float3">
                                {displayChart2()}
                            </div>
                        </div>
                    </div>
                    <div className="middle d-flex justify-content-around"></div>
                    <div className="bottom d-flex justify-content-center">
                        <div className="contentsquare">
                            <div className="contenttop d-flex justify-content-between">
                                <h2>{moment().format("MMMM")} Transactions</h2>
                                <div className="sorting d-flex">
                                <Menu menuButton={<button className="btn btn-success">Filter by</button>} transition>
                                    <SubMenu label="Price">
                                        <MenuItem onClick={priceSort}>Ascending</MenuItem>
                                        <MenuItem onClick={reversePriceSort}>Descending</MenuItem>
                                    </SubMenu>
                                    <SubMenu label="Category">
                                        <MenuItem type="checkbox" checked={filteredBills} onClick={(e)=>filterByCat(e, "Bills")}>Bills</MenuItem>
                                        <MenuItem type="checkbox" checked={filteredCloth} onClick={(e)=>filterByCat(e, "Clothing")}>Clothing</MenuItem>
                                        <MenuItem type="checkbox" checked={filteredGroc} onClick={(e)=>filterByCat(e, "Groceries")}>Groceries</MenuItem>
                                        <MenuItem type="checkbox" checked={filteredRent} onClick={(e)=>filterByCat(e, "Rent/Mortgage")}>Rent/Mortgage</MenuItem>
                                        <MenuItem type="checkbox" checked={filteredRes} onClick={(e)=>filterByCat(e, "Restaurants")}>Restaurants</MenuItem>
                                        <MenuItem type="checkbox" checked={filteredShop} onClick={(e)=>filterByCat(e, "Shopping")}>Shopping</MenuItem>
                                        <MenuItem type="checkbox" checked={filteredTravel} onClick={(e)=>filterByCat(e, "Travel")}>Travel</MenuItem>
                                    </SubMenu>
                                </Menu>
                                    <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                >
                                    Add
                                </button>
                                </div>
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
                                    containerClassName={
                                        "pagination justify-content-center"
                                    }
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
                                                <CurrencyInput
                                                    id="input-example"
                                                    className="form-control"
                                                    name="input-name"
                                                    decimalsLimit={2}
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                    // prefix="$"
                                                />
                                                {/* <input
                                                    type="number"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                    value={price}
                                                /> */}
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
