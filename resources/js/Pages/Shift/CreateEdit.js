import React, {useState} from 'react';
import axios from 'axios'
import {useToasts} from "react-toast-notifications";
import {Inertia} from "@inertiajs/inertia";
import {FieldError} from "../../Shared/FieldError";
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import {SHIFTS, STATUS, STATUSES} from "../../Shared/Constants";
import {route} from "../../Shared/route";
import Menu from "../../Shared/Menu";

export default function CreateEdit(props) {
    const {shift, links, options} = props
    const {addToast} = useToasts()
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(shift ? shift.status : '')
    const [shiftType, setShiftType] = useState(shift ? shift.shift_type : '')
    const [isChecked, setIsChecked] = useState(shift ? shift.taxable : false);
    const [date, setDate] = useState(shift ? new Date(shift.date) : null);
    const [paidAt, setPaidAt] = useState(shift && shift.paid_at ? new Date(shift.paid_at) : '');

    console.log(shift)

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        const formData = new FormData(e.target)
        const body = {
            company: formData.get('company'),
            worker: formData.get('worker'),
            hours: formData.get('hours'),
            rate_per_hour: formData.get('rate_per_hour'),
            status: formData.get('status'),
            shift_type: formData.get('shiftType'),
            taxable: formData.get('taxable'),
            date: formData.get('date'),
            paid_at: formData.get('paid_at')

        }
        const request = shift ? axios.put((route(links.update,{ shift: shift.id })), body) : axios.post(links.store, body)
        request.then((response) => {
                if (response.status === 200) {
                    Inertia.visit(links.list)
                    addToast(response.data.message, {appearance: 'success'})
                }
            }).catch((error) => {

            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            }
        })
    }


    return (<>
            <Menu/>
            <form
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
            >

                <div className='container pt-4' >
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>{shift ? 'Edit' : 'Create'}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6 ">
                                            <h6>Worker</h6>
                                            <div className="form-group">
                                                <input className="form-control" type='text' name='worker'
                                                       defaultValue={shift?.worker.name ?? null}/>
                                                <FieldError errors={errors.worker}/>
                                            </div>
                                        </div>

                                        <div className="col-6 mb-2">
                                            <h6>Company</h6>
                                            <div className="form-group">
                                                <input className="form-control" type='text' name='company'
                                                       defaultValue={shift?.company ?? null}/>
                                                <FieldError errors={errors.company}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <h6>Hours</h6>
                                            <div className="form-group">
                                                <input className="form-control" type='text' name='hours'
                                                       defaultValue={shift?.hours ?? null}/>
                                                <FieldError errors={errors.hours}/>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <h6>Rate per hour (in £)</h6>
                                            <div className="form-group">
                                                <input className="form-control" type='text' name='rate_per_hour'
                                                       defaultValue={shift?.rate_per_hour ?? null}/>
                                                <FieldError errors={errors.rate_per_hour}/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <h6>Status</h6>
                                            <div className='input-text input-element'>
                                                <Select
                                                    value={options.statuses.filter(st => st?.value === status)}
                                                    onChange={(e) => {
                                                        setStatus(e.value)
                                                    }}
                                                    options={options.statuses}
                                                    noOptionsMessage={() => 'No options'}
                                                    name='status'
                                                    className='field-wrapper-selector input-element'
                                                    classNamePrefix='select'
                                                    hideSelectedOptions
                                                    isSearchable={false}
                                                    defaultValue={shift?.status?.value}
                                                />
                                                <FieldError errors={errors.status}/>
                                            </div>
                                        </div>
                                        {status === STATUS.COMPLETE &&
                                            <div className="col-6 mb-2">
                                                <h6>Paid at</h6>
                                                <div className="form-group">
                                                    <DatePicker className="form-control" name='paid_at'
                                                                selected={paidAt} onChange={(d) => setPaidAt(d)}/>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <h6>Date</h6>
                                            <div className="form-group">
                                                <DatePicker className="form-control" name='date' selected={date}
                                                            onChange={(d) => setDate(d)}/>
                                            </div>
                                            <FieldError errors={errors.date}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <h6>Shift Type</h6>
                                            <div className='input-text input-element'>
                                                <Select
                                                    value={options.shiftTypes.filter(st => st?.value === shiftType) ?? ''}
                                                    onChange={(e) => {
                                                        setShiftType(e.value)
                                                    }}
                                                    options={options.shiftTypes}
                                                    noOptionsMessage={() => 'No options'}
                                                    name='shiftType'
                                                    className='field-wrapper-selector input-element'
                                                    classNamePrefix='select'
                                                    hideSelectedOptions
                                                    isSearchable={false}
                                                    defaultValue={shiftType?.value}
                                                />
                                                <FieldError errors={errors.shift_type}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <h6>Taxable</h6>
                                            <div className="form-group">
                                                <input className="form-check"
                                                       type="checkbox"
                                                       name="taxable"
                                                       checked={isChecked}
                                                       onChange={() => setIsChecked(!isChecked)}
                                                       defaultValue={isChecked}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <button
                                                className='btn btn-success'
                                                type='submit'>
                                                {shift ? 'Edit' : 'Create'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
