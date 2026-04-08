<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SportArticle>
 */
class SportArticleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'brand' => fake()->company(), 
            'price' => fake()->randomFloat(2, 50, 1500), // Preço entre 50 e 1500
            'year' => fake()->year(),
            'image' => 'https://picsum.photos/id/' . fake()->numberBetween(1, 100) . '/400/400', // Gera um link aleatório do Picsum para a imagem do artigo esportivo
            'amount' => fake()->numberBetween(0, 25), // Quantidade em estoque 
            // Seleciona uma categoria existente ou cria uma nova se necessário
            'category_id' => Category::factory(),
        ];
    }
}