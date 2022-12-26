import React, {useState} from 'react';
import axios from 'axios'
import Menu from "../../Shared/Menu";
import {Spinner } from 'react-bootstrap'
import {useToasts} from "react-toast-notifications";

export default function Upload(props) {
    const [file, setFile] = useState();
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const {addToast} = useToasts()

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            return setError('File is required')
        }
        setIsLoading(true)
        const data = new FormData()
        data.append('file', file)
        axios.post(props.links.storeFile, data).then((response) => {
            if(response.status === 200){
                setIsLoading(false)
                addToast(response.data.message, {appearance: 'success'})
            }
        });


    };
    return (<>
            <Menu/>
            <div className='container pt-4'>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Import shifts.csv to database</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <input
                                                type="file"
                                                id="csvFileInput"
                                                accept=".csv"
                                                required
                                                onChange={handleOnChange}
                                            />
                                            {error && <p className="text-danger">{error}</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <button
                                                disabled={isLoading}
                                                className="btn btn-primary"
                                                onClick={(e) => {
                                                    handleOnSubmit(e);
                                                }}
                                            >
                                                {isLoading &&
                                                <Spinner
                                                    as="span"
                                                    variant="warning"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    animation="grow"/>
                                                }
                                                IMPORT CSV
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
