import React, {useState} from 'react';
import axios from 'axios'
import {InertiaLink, usePage} from "@inertiajs/inertia-react";

export default function Menu() {
    const links = usePage().props.app.links

    return (<>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <h5 className="navbar-brand">Workers-shifts app</h5>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <InertiaLink className="nav-link" href={links.shifts_import}>
                                    Import
                                </InertiaLink>
                            </li>
                            <li className="nav-item">
                                <InertiaLink className="nav-link" href={links.workers}>
                                    Workers
                                </InertiaLink>
                            </li>
                            <li className="nav-item">
                                <InertiaLink className="nav-link" href={links.shifts}>
                                    Shifts
                                </InertiaLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
