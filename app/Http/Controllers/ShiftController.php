<?php

namespace App\Http\Controllers;

use App\BLL\ShiftBLL;
use App\BLL\WorkerBLL;
use App\Http\Requests\CreateEditShiftRequest;
use App\Models\Shift;
use Illuminate\Http\Request;

/**
 * @property WorkerBLL $workerBLL
 * @property ShiftBLL $shiftBLL
 */
class ShiftController extends Controller
{

    public function __construct(WorkerBLL $workerBLL, ShiftBLL $shiftBLL)
    {
        $this->workerBLL = $workerBLL;
        $this->shiftBLL = $shiftBLL;
    }

    public function uploadShifts()
    {
        return inertia('Shift/Upload',[
            'links' => [
                'storeFile' => route('shifts.import.store')
            ]
        ]);
    }

    public function importShifts(Request $request)
    {
        $file = $request->file('file');

        $shifts = array_slice(array_map('str_getcsv', file($file)),1);

        $this->shiftBLL->importShifts($shifts);

        return response()->json([
            'message' => 'Shifts successfully imported!'
        ]);
    }

    public function list()
    {
        ini_set('max_execution_time', 180);

        $shifts = $this->shiftBLL->getAllShifts();

        return inertia('Shift/List',[
            'shifts' => $shifts,
            'links' => [
                'create' => route('shifts.create'),
                'store' => route('shifts.store'),
                'show' => route('shifts.show', ['shift' => '%shift%']),
                'edit' => route('shifts.edit', ['shift' => '%shift%']),
                'update' => route('shifts.update', ['shift' => '%shift%']),
                'destroy' => route('shifts.destroy', ['shift' => '%shift%']),
                'showWorker' => route('workers.show', ['worker' => '%worker%'])
            ]
        ]);
    }

    public function show(Shift $shift)
    {
        $shift->load('worker');

        return inertia('Shift/Show',[
            'shift' => $shift
        ]);

    }

    public function create()
    {
        return inertia('Shift/CreateEdit',[
            'links' => [
                'create' => route('shifts.create'),
                'store' => route('shifts.store'),
                'list' => route('shifts.list'),
                'edit' => route('shifts.edit',  ['shift' => '%shift%']),
                'update' => route('shifts.update',  ['shift' => '%shift%']),
                'destroy' => route('shifts.destroy', ['shift' => '%shift%']),
                'showWorker' => route('workers.show',  ['worker' => '%worker%'])
            ],
            'options' => [
                'statuses' => $this->shiftBLL->getStatusesOptions(),
                'shiftTypes' => $this->shiftBLL->getShiftsOptions()
            ]
        ]);
    }

    public function store(CreateEditShiftRequest $request)
    {
        $data = $request->all();

        $this->shiftBLL->createShift($data);

        return response()->json([
            'message' => 'Shift successfully added'
        ]);
    }

    public function edit(Shift $shift)
    {
        $shift->load('worker');
        return inertia('Shift/CreateEdit',[
            'shift' => $shift,
            'links' => [
                'create' => route('shifts.create'),
                'store' => route('shifts.store'),
                'list' => route('shifts.list'),
                'edit' => route('shifts.edit',  ['shift' => '%shift%']),
                'update' => route('shifts.update',  ['shift' => '%shift%']),
                'destroy' => route('shifts.destroy', ['shift' => '%shift%']),
                'showWorker' => route('workers.show',  ['worker' => '%worker%'])
            ],
            'options' => [
                'statuses' => $this->shiftBLL->getStatusesOptions(),
                'shiftTypes' => $this->shiftBLL->getShiftsOptions()
            ]
        ]);
    }

    public function update(Shift $shift, CreateEditShiftRequest $request)
    {
        $data = $request->all();

        $this->shiftBLL->updateShift($shift, $data);

        return response()->json([
            'message' => 'Shift successfully updated'
        ]);
    }

    public function destroy(Shift $shift)
    {
        $this->shiftBLL->delete($shift);

        return response()->json([
            'message' => 'Shift successfully deleted'
        ]);

    }
}
