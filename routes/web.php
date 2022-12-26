<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [App\Http\Controllers\ShiftController::class, 'uploadShifts']);


Route::prefix('shifts')
    ->group(function () {
        Route::post('/import', [App\Http\Controllers\ShiftController::class, 'importShifts'])
            ->name('shifts.import');
        Route::get('/', [App\Http\Controllers\ShiftController::class, 'list'])->name('shifts.list');
        Route::post('/', [App\Http\Controllers\ShiftController::class, 'store'])->name('shifts.store');
        Route::get('/create', [App\Http\Controllers\ShiftController::class, 'create'])->name('shifts.create');
        Route::get('{shift}', [App\Http\Controllers\ShiftController::class, 'show'])->name('shifts.show');
        Route::put('{shift}', [App\Http\Controllers\ShiftController::class, 'update'])->name('shifts.update');
        Route::get('{shift}/edit', [App\Http\Controllers\ShiftController::class, 'edit'])->name('shifts.edit');
        Route::delete('{shift}', [App\Http\Controllers\ShiftController::class, 'destroy'])->name('shifts.destroy');

    });

Route::prefix('workers')
    ->group(function () {
        Route::get('/', [App\Http\Controllers\WorkerController::class, 'list'])->name('workers.list');
        Route::get('{worker}',  [App\Http\Controllers\WorkerController::class, 'show'])->name('workers.show');

    });


