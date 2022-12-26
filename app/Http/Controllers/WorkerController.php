<?php

namespace App\Http\Controllers;

use App\BLL\WorkerBLL;
use App\Models\Worker;

/**
 * @property WorkerBLL $workerBLL
 */
class WorkerController extends Controller
{

    public function __construct(WorkerBLL $workerBLL)
    {
        $this->workerBLL = $workerBLL;
    }

    public function list()
    {
        $workers = $this->workerBLL->get();

        return inertia('Worker/List',[
            'workers' => $workers,
            'links' => [
                'show' => route('workers.show',  ['worker' => '%worker%'])
            ]
        ]);
    }

    public function show(Worker $worker)
    {
        $shifts = $worker->shifts;

        $getLastFivePayments = $shifts->sortByDesc('paid_at')->values()->take(5);

        $averagePayPerHour = $this->workerBLL->getAverageDataByColumn($shifts->toArray(), 'rate_per_hour');
        $averageTotalPay = $this->workerBLL->getAverageDataByColumn($shifts->toArray(), 'total_pay');

        return inertia('Worker/Show',[
            'worker' => $worker,
            'averagePayPerHour' => $averagePayPerHour,
            'averageTotalPay' => $averageTotalPay,
            'lastFivePayments' => $getLastFivePayments,
            'links' => [
                'show' => route('workers.show',  ['worker' => '%worker%'])
            ]
        ]);
    }
}
