import React from 'react';
import {SHIFTS, STATUSES, STATUS} from "../../Shared/Constants";
import Menu from "../../Shared/Menu";

export default function Show(props) {
    const {shift} = props
    return (<>
            <Menu/>
            <div className='container pt-4' >
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Show shift</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Worker</b>
                                            <p>{shift.worker.name}</p>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Company:</b>
                                            <p>{shift.company}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Hours:</b>
                                            <p>{shift.hours}</p>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Rate per hour:</b>
                                            <p>{shift.rate_per_hour}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Total pay:</b>
                                            <p>{shift.total_pay}</p>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Date:</b>
                                            <p>{shift.date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Status:</b>
                                            <p>{STATUSES[shift.status]}</p>
                                        </div>
                                    </div>
                                    {shift.status === STATUS.COMPLETE &&
                                        <div className="col-6 mb-2">
                                            <div className="form-group">
                                                <b>Paid at:</b>
                                                <p>{shift.paid_at}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Shift type:</b>
                                            <p>{SHIFTS[shift.shift_type]}</p>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <b>Taxable:</b>
                                            <p>{shift.taxable === 1 ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
