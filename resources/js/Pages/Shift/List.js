import React, {useMemo, useState, useCallback} from 'react';
import MaterialReactTable from 'material-react-table';
import {Box, Tooltip} from '@mui/material';
import {InertiaLink} from "@inertiajs/inertia-react";
import {SHIFTS, STATUS, STATUSES} from "../../Shared/Constants";
import {Edit, Delete, Visibility} from "@mui/icons-material";
import {route} from "../../Shared/route";
import axios from "axios";
import {useToasts} from "react-toast-notifications";
import Menu from "../../Shared/Menu";

export default function List(props) {
    const [tableData, setTableData] = useState(() => props.shifts);
    const {addToast} = useToasts();

    const handleDeleteShift = useCallback(
        (row) => {
            if (!confirm(`Are you sure you want to delete this shift?`)) {
                return;
            }

            axios.delete(route(props.links.destroy, {shift: row.id})).then(res => {
                tableData.splice(row.index, 1);
                setTableData([...tableData]);
                addToast(res.data.message, {appearance: 'success'})

            })
        },
        [tableData],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 10,
            },
            {
                accessorKey: 'date',
                header: 'Date',
            },
            {
                accessorKey: 'worker.name',
                header: 'Worker',
                Cell: ({cell}) => <>
                    <Box>
                        <InertiaLink
                            href={route(props.links.showWorker, {worker: cell.row.original.worker.id})}>
                            {cell.getValue()}
                        </InertiaLink>
                    </Box>
                </>
            },
            {
                accessorKey: 'company',
                header: 'Company'
            },
            {
                accessorKey: 'hours',
                header: 'Hours',
            },
            {
                accessorKey: 'rate_per_hour',
                header: 'Rate per hour',
                Cell: ({cell}) => cell.getValue() + '£'
            },
            {
                accessorKey: 'taxable',
                header: 'Taxable',
                Cell: ({cell}) => cell.getValue() === 1 ? 'Yes' : 'No'
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({cell}) => STATUSES[cell.getValue()]
            },
            {
                accessorKey: 'shift_type',
                header: 'Shift',
                Cell: ({cell}) => SHIFTS[cell.getValue()]
            },
            {
                accessorKey: 'paid_at',
                header: 'Paid at',
                Cell: ({cell}) => cell.getValue() ?? '/'

            },
            {
                accessorKey: 'total_pay',
                header: 'Total pay',
                Cell: ({cell}) => cell.getValue() + '£'
            }
        ], []
    )


    return <>
        <Menu/>
        <div className="table-striped">
            <MaterialReactTable
                columns={columns}
                data={props.shifts}
                positionActionsColumn="first"
                enableRowActions={true}
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        header: '',
                        size: 100,
                    },
                }}
                renderRowActions={({row}) => (
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Tooltip arrow placement="left">
                            <InertiaLink
                                href={row.original.status === STATUS.COMPLETE ?
                                    route(props.links.show, {shift: row.original.id}) :
                                    route(props.links.edit, {shift: row.original.id})}>
                                {row.original.status === STATUS.COMPLETE ? <Visibility/> : <Edit/>}
                            </InertiaLink>
                        </Tooltip>
                        <Tooltip arrow placement="right">
                            <InertiaLink
                                onClick={() => handleDeleteShift(row.original)}>
                                <Delete/>
                            </InertiaLink>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <InertiaLink className="btn btn-primary"
                                 href={route(props.links.create)}>
                        Create new shift
                    </InertiaLink>
                )}
            />
        </div>


    </>
}
