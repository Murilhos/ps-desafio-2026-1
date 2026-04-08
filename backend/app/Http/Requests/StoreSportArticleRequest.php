<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSportArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'min:3', 'max:100'],
            'brand' => ['required', 'min:3', 'max:50'],
            'price' => ['required', 'decimal:2'],
            'year' => ['required', 'integer'],
            'image' => ['required', 'file'],
            'amount' => ['required', 'integer'],
            'category_id' => ['required']
        ];
    }
}
