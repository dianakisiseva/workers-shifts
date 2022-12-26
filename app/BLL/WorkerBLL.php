<?php

namespace App\BLL;

use App\Models\Worker;

/**
 * @property Worker $model
 */
class WorkerBLL extends BaseBLL
{
    public function __construct(Worker $worker)
    {
        $this->model = $worker;
    }

    public function getAverageDataByColumn($shifts, $column): float
    {
        $allPayPerHours = array_column($shifts, $column);

        $sum = array_sum($allPayPerHours);

        return round($sum / count($shifts), 2);
    }

    public function getOrCreateWorker($workerName)
    {
        $worker = $this->model->query()
            ->where('name', $workerName)
            ->first();

        if (!$worker) {
            $worker = $this->model->create([
                'name' => $workerName
            ]);
        }
        return $worker;

    }

}
