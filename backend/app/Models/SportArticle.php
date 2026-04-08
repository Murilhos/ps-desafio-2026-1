<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class SportArticle extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'year',
        'image',
        'amount',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleted(function(SportArticle $sportArticle){
            try{
                $image_name = explode('sport-articles/', $sportArticle['image']);
                Storage::disk('public')->delete('sport-articles/'.$image_name[1]);
            }catch (Throwable){}
        });
    }
}
