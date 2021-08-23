import React, { useState } from "react";
import AppWrapper from '../AppWrapper';
import * as XLSX from "xlsx";
import { Upload, PlusSquare } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';

function FileUploader() {
    const [items, setItems] = useState([]);

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            console.log("Consoled items", d)
            setItems(d);
        });
    };

    const onFileUpload = () =>{
        toast.success("File uploaded succesfully")
    }

    return (
        <>
            <AppWrapper>
                <div style={{ paddingTop:'50px'}}>
                    <form > 
                        <input
                            style ={{ paddingBottom:'40px'}}
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                readExcel(file);
                            }}
                        />
                        {/* {items} */}
                        <div className="btn btn-outline-primary ml-1" onClick={onFileUpload}><Upload />{"Upload"}</div>
                        {/* <button></button> */}
                    </form>

                    {/* <table class="table container">
                        <thead>
                            <tr>
                                <th scope="col">Full Name</th>
                                <th scope="col">Date of birth</th>
                                <th scope="col">Gender</th>
                                <th scope="col">ID Number</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Route Name</th>
                                <th scope="col">Sacco</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((d) => (
                                <tr key={d.id_number}>
                                    <td>{d.full_name}</td>
                                    <td>{d.date_of_birth}</td>
                                    <td>{d.gender}</td>
                                    <td>{d.id_number}</td>
                                    <td>{d.phonenumber}</td>
                                    <td>{d.route_name}</td>
                                    <td>{d.sacco}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                </div>
            </AppWrapper>
        </>
    )
}

export default FileUploader
