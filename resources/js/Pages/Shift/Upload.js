import React, {useState} from 'react';
import axios from 'axios'

export default function Upload(props) {

    const [file, setFile] = useState();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            const data = new FormData()
            data.append('file', file)
            axios.post(props.links.storeFile, data)
        }
    };

    return (<>
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Import shifts.csv to database</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <input
                                    type="file"
                                    id="csvFileInput"
                                    accept=".csv"
                                    onChange={handleOnChange}
                                />

                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        handleOnSubmit(e);
                                    }}
                                >
                                    IMPORT CSV
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
