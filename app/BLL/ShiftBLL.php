<?php

namespace App\BLL;

use App\Models\Shift;
use Carbon\Carbon;

/**
 * @property Shift $model
 * @property WorkerBLL $workerBLL
 */
class ShiftBLL extends BaseBLL
{

    public function __construct(Shift $shift, WorkerBLL $workerBLL)
    {
        $this->model = $shift;
        $this->workerBLL = $workerBLL;
    }

    public function importShifts($shifts)
    {
        foreach($shifts as $shift){
            $data = [
                'date' => $shift[0],
                'worker_name' => $shift[1],
                'company_name' => $shift[2],
                'hours' => $shift[3],
                'rate_per_hour' => ltrim($shift[4], '£'),
                'taxable' => $shift[5] == 'Yes',
                'status' => $this->getShiftStatus($shift[6]),
                'shift_type' => $this->getShiftType($shift[7]),
                'paid_at' => $shift[8] ?: null,
            ];

            $worker = $this->workerBLL->getOrCreateWorker($data['worker_name']);

            $this->model->create([
                'date' => $data['date'],
                'worker_id' => $worker->id,
                'company' => $data['company_name'],
                'hours' => $data['hours'],
                'rate_per_hour' => ltrim($data['rate_per_hour'], '£'),
                'taxable' => $data['taxable'],
                'status' => $data['status'],
                'shift_type' => $data['shift_type'],
                'paid_at' => $data['paid_at'],
                'total_pay' => $data['hours'] * ltrim($data['rate_per_hour'], '£')
            ]);
        }
    }

    public function getAllShifts()
    {
//        return $this->model->with('worker')->get();
       return $this->model->with('worker')->get()->take(20); //for faster testing
    }

    public function getShiftStatus($status)
    {
        switch ($status) {
            case 'Complete':
                return Shift::COMPLETE;
            case 'Pending':
                return Shift::PENDING;
            case 'Processing':
                return Shift::PROCESSING;
            default:
                return Shift::FAILED;
        }
    }
    public function getShiftType($type)
    {
        switch ($type) {
            case 'Day':
                return Shift::DAY_SHIFT;
            case 'Night':
                return Shift::NIGHT_SHIFT;
            default:
                return Shift::HOLIDAY;
        }
    }

   public function getStatusesOptions()
   {
        return array_values(array_map(function ($value) {
            return [
                'label' => $value,
                'value' => array_search($value, Shift::STATUSES)
            ];
        }, Shift::STATUSES));
   }

    public function getShiftsOptions()
    {
        return array_values(array_map(function ($value) {
            return [
                'label' => $value,
                'value' => array_search($value, Shift::SHIFT_TYPES)
            ];
        }, Shift::SHIFT_TYPES));
    }

    public function createShift($data)
    {
        $worker = $this->workerBLL->getOrCreateWorker($data['worker']);

        $this->model->create($this->getData($worker, $data));
    }

    public function updateShift($shift, $data)
    {
        $worker = $this->workerBLL->getOrCreateWorker($data['worker']);

        $shift->update($this->getData($worker, $data));
    }

    public function getData($worker, $data)
    {
        return [
            'date' => Carbon::parse($data['date'])->format('Y-m-d'),
            'worker_id' => $worker->id,
            'company' => $data['company'],
            'hours' => $data['hours'],
            'rate_per_hour' => $data['rate_per_hour'],
            'taxable' => $data['taxable'] === 'true' ? 1 : 0,
            'status' => $data['status'],
            'shift_type' => $data['shift_type'],
            'total_pay' => $data['hours'] * $data['rate_per_hour'],
            'paid_at' =>  $data['paid_at'] ?  Carbon::parse($data['paid_at'])->format('Y-m-d h:m:s') : null,
        ];
    }
}
