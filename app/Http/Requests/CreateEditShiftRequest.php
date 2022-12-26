<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEditShiftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'date' => 'required|date_format:m/d/Y',
            'worker' => 'required',
            'company' => 'required',
            'hours' => 'required|numeric',
            'rate_per_hour' => 'required|numeric',
            'status' => 'required',
            'shift_type' => 'required',
            'paid_at' => 'required_if:status,==,1',
        ];
    }

    public function messages()
    {
        return [
            'paid_at.required_if' => 'Paid at field is required when status is Completed'
        ];
    }
}
