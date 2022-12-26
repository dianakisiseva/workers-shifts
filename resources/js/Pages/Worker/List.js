import React, {useMemo} from 'react';
import MaterialReactTable from 'material-react-table';
import {Box} from '@mui/material';
import {route} from "../../Shared/route";
import {InertiaLink} from "@inertiajs/inertia-react";

export default function List(props) {

    console.log(props.workers)

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'name',
                header: 'Name',
            },

        ], []
    )


    return <>
        <div className="table-striped">
            <MaterialReactTable
                columns={columns}
                data={props.workers}
                positionActionsColumn="last"
                enableRowActions={true}
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        header: '', //change header text
                        size: 300, //make actions column wider
                    },
                }}
                renderRowActions={({row}) => (
                    <Box>
                        <InertiaLink
                            className="btn btn-primary"
                            href={route(props.links.show, {worker: row.original.id})}>
                            View
                        </InertiaLink>
                    </Box>
                )}
            />
        </div>

    </>

}
