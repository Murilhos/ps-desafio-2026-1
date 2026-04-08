<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name'
    ];

    public function sportArticles()
    {
        return $this->hasMany(SportArticle::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleting(function(Category $category){
            $category->sportArticles()->each(function(SportArticle $article){
                $article->delete();
            });//Ao excluir uma categoria, o método de exclusão em cascata é acionado para garantir que todos os artigos esportivos associados a essa categoria sejam excluídos automaticamente.
            //Isso é feito usando o método each() para iterar sobre cada artigo esportivo associado à categoria e chamar o método delete() em cada um deles.
        });
    }
}