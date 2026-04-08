<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sport_articles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('brand');
            $table->float('price');
            $table->integer('year');
            $table->string('image')->nullable();//A coluna "image" é do tipo string e pode ser nula, ou seja, um artigo esportivo pode não ter uma imagem associada a ele.
            $table->integer('amount');
            $table->foreignUuid('category_id')->constrained('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sport_articles');
    }
};
