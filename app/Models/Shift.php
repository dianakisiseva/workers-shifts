<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public const COMPLETE = 1;
    public const PENDING = 2;
    public const PROCESSING = 3;
    public const FAILED = 4;

    public const STATUSES = [
        self::COMPLETE => 'Complete',
        self::PENDING => 'Pending',
        self::PROCESSING => 'Processing',
        self::FAILED => 'Failed',
    ];

    public const DAY_SHIFT = 1;
    public const NIGHT_SHIFT = 2;
    public const HOLIDAY = 3;

    public const SHIFT_TYPES = [
        self::DAY_SHIFT => 'Day',
        self::NIGHT_SHIFT => 'Night',
        self::HOLIDAY => 'Holiday',
    ];

    public function worker()
    {
        return $this->belongsTo(Worker::class);
    }
}
