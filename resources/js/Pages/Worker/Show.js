import React, {useMemo} from 'react';
import MaterialReactTable from "material-react-table";
import {SHIFTS, STATUSES} from "../../Shared/Constants";
import Menu from "../../Shared/Menu";

export default function Show(props) {

    const columns = useMemo(
        () => [
            {
                accessorKey: 'company',
                header: 'Company',
            },
            {
                accessorKey: 'paid_at',
                header: 'Paid at',
            },
            {
                accessorKey: 'rate_per_hour',
                header: 'Rate per hour',
                Cell: ({cell}) => cell.getValue() + '£'

            },
            {
                accessorKey: 'hours',
                header: 'Hours',
            },
            {
                accessorKey: 'shift_type',
                header: 'Shift',
                Cell: ({cell}) => SHIFTS[cell.getValue()]
            },
            {
                accessorKey: 'taxable',
                header: 'Taxable',
                Cell: ({cell}) => cell.getValue() === 1 ? 'Yes' : 'No'
            },
            {
                accessorKey: 'total_pay',
                header: 'Total pay',
                Cell: ({cell}) => cell.getValue() + '£'
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({cell}) => STATUSES[cell.getValue()]
            },

        ], []
    )
    return (<>
            <Menu/>
            <div className='container pt-4' >
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Show worker</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 mb-2">
                                        <div className="form-group">
                                            <b>Name</b>
                                            <p>{props.worker.name}</p>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-2">
                                        <div className="form-group">
                                            <b>Average pay per hour:</b>
                                            <p>{props.averagePayPerHour + '£'}</p>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-2">
                                        <div className="form-group">
                                            <b>Average total pay:</b>
                                            <p>{props.averageTotalPay + '£'}</p>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-2">
                                        <div className="form-group">
                                            <b>Last five payments:</b>
                                            <div className="table-striped">
                                                <MaterialReactTable
                                                    columns={columns}
                                                    data={props.lastFivePayments}
                                                />
                                            </div>
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
