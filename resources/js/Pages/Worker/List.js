import React, {useMemo} from 'react';
import MaterialReactTable from 'material-react-table';
import {Box} from '@mui/material';
import {route} from "../../Shared/route";
import {InertiaLink} from "@inertiajs/inertia-react";
import Menu from "../../Shared/Menu";

export default function List(props) {
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
        <Menu/>
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
