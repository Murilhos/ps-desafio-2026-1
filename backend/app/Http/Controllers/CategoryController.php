<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    protected $category; //Variavel para armazenar a instância do modelo Category

    public function __construct(Category $category)
    {
        $this->category = $category;
    }
    /**m
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categories = $this->category->with('sportArticles')->get();//Recupera todas as categorias do banco de dados, juntamente com os artigos esportivos relacionados a cada categoria, usando o método with para carregar a relação sportArticles.
        return response()->json($categories, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $category = $this->category->create($data);
        return response()->json($category, Response::HTTP_CREATED);//HTTP_CREATED: Código de status HTTP para indicar que um recurso foi criado com sucesso
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse /*: JsonResponse*/ //Indica que o método show retorna uma resposta JSON
    {
        $category = $this->category->findOrFail($id); //Recupera a categoria com o ID fornecido usando o método findOrFail do modelo Category. Se a categoria não for encontrada, uma exceção será lançada.
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        $data = $request->validated();
        $category->update($data);
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        $category->delete();
        return response()->json(['Message' => 'Categoria deletada com sucesso']);
    }
}
//Qualquer métood que eu for criar, seja de validação ou não, tem que ser criado dentro da classe CategoryController.