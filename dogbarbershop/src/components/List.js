import React, { useEffect, useState } from 'react';
import Popup from './Popup';
import './site.scss';

const List = (props) => {
    const [qeueList, setqeueList] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [itemToShow, setItemToShow] = useState({});
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
    const [newNickName, setNewNickName] = useState("");
    const [updateFailed, setUpdateFailed] = useState(false);

    const [wantedDate, setWantedDate] = useState("");
    var clientId = Number(sessionStorage.getItem("clientId"));

    const onEdit = ({ id }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
    }

    const fetchInventory = () => {
        var res = httpGet(`${window.location.origin}/api/Queues`);
        var obj = JSON.parse(res);
        setqeueList(obj);
    }


    const onSave = ({ item }) => {
        var http = new XMLHttpRequest();
        var params = `NickName=${newNickName ? newNickName : item.nickName}&WantedTime=${wantedDate ? wantedDate : item.queueTime}&ClientId=${clientId}`;
        http.open('PUT', `${window.location.origin}/api/Queues`, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                setInEditMode({
                    status: false,
                    rowKey: null
                });
                var res = JSON.parse(http.response);
                if (res.length > 0)
                    setqeueList(res);
                else setUpdateFailed(true);
                console.log(JSON.parse(http.response));
                setWantedDate(null);
                setNewNickName(null);


            }
        }
        http.send(params);
    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        });
        setWantedDate(null);
        setNewNickName(null);
    }
    //
    useEffect(() => {
        fetchInventory();
    }, [])

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    const sortBy = (key) => {
        let arrayCopy = qeueList;
        if (key == 1)
            arrayCopy.sort((a, b) => a.nickName.localeCompare(b.nickName))
        else
            arrayCopy.sort(function (a, b) {
                return new Date(b.queueTime) - new Date(a.queueTime);
            });
        setqeueList([...arrayCopy]);
    }

    const handleSubmit = () => {
        setOpenPopup(false);
    }

    const openPopupEvent = (item) => {
        if (clientId == item.clientId)
            return;
        setItemToShow(item);
        setOpenPopup(true)
    }

    const deleteUser = () => {
        var http = new XMLHttpRequest();
        http.open('DELETE', `${window.location.origin}/api/Queues/${clientId}`, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                props.history.push("register");
            }
        }
        http.send();
    }

    return (
        <>
            <Popup handleSubmit={handleSubmit} show={openPopup} item={itemToShow} />

            <div className="wrapper-container">
                <div className="container">
                    <h1>רשימת מוזמנים:</h1>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => sortBy(1)}>שם:</th>
                                <th onClick={() => sortBy(2)}>שעה מוזמנת:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                qeueList.map(item => (
                                    <tr key={item.clientId} onClick={() => openPopupEvent(item)} >
                                        <td>
                                            {
                                                inEditMode.status && inEditMode.rowKey == item.clientId ? (
                                                    <input value={item.nickName} className="base-input"
                                                        onChange={(event) => setNewNickName(event.target.value)}
                                                    />
                                                ) : (
                                                        item.nickName
                                                    )
                                            }
                                        </td>
                                        <td>
                                            {
                                                inEditMode.status && inEditMode.rowKey == item.clientId ?
                                                    <input className="base-input" id="date" type="datetime-local" onChange={(event) => setWantedDate(event.target.value)} value={item.queueDate} />
                                                    :
                                                    new Date(item.queueTime).getFullYear() < 2020 ?
                                                        "---" : item.queueTime

                                            }
                                        </td>
                                        <td>
                                            {clientId == item.clientId &&

                                                inEditMode.status && inEditMode.rowKey === item.clientId ? (
                                                    <React.Fragment>
                                                        <button
                                                            className={"btn-success"}
                                                            onClick={() => onSave({ item })}
                                                        >
                                                            Save
                                            </button>

                                                        <button
                                                            className={"btn-secondary"}
                                                            style={{ marginLeft: 8 }}
                                                            onClick={() => onCancel()}
                                                        >
                                                            Cancel
                                            </button>
                                                    </React.Fragment>
                                                ) : clientId == item.clientId ? (
                                                    <div>
                                                        <button
                                                            className={"btn-primary"}
                                                            onClick={() => onEdit({ id: item.clientId })}
                                                        >
                                                            Edit
                                                    </button>

                                                        <button onClick={deleteUser}>Delete</button>
                                                    </div>
                                                ) : ""
                                            }
                                            <td />
                                        </td>{updateFailed ?
                                            <div className="error">השעה שבחרת אינה פנויה</div> : ""}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        </>)
};

export default List;
