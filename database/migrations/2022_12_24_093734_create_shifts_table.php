<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShiftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->unsignedBigInteger('worker_id');
            $table->string('company');
            $table->integer('hours');
            $table->decimal('rate_per_hour');
            $table->boolean('taxable');
            $table->unsignedBigInteger('status');
            $table->unsignedBigInteger('shift_type');
            $table->decimal('total_pay')->nullable();
            $table->dateTime('paid_at')->nullable();
            $table->timestamps();

            $table->foreign('worker_id')->references('id')->on('workers')
                ->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shifts');
    }
}
