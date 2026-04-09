<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SportArticleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});


/*É possível simplificar todas as rotas utilizando um comando só do Laravel, que é o Route::apiResource.
    Ele cria automaticamente as rotas para os métodos index, store, show, update e destroy do controlador CategoryController.
    Route::apiResource('/category', CategoryController::class);
    Route::apiResource('/sport-articles', SportArticleController::class);
*/

//É possível colocar o middleware de autenticação e autorização em todas as rotas de uma vez só, utilizando o método group do Route. Dessa forma, não é necessário colocar o middleware em cada rota individualmente.
Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/category', CategoryController::class)->except(['index', 'show']);
    Route::apiResource('/sport-articles', SportArticleController::class)->except(['index', 'show', 'buy']);
    //O método except é usado para excluir as rotas index e show do recurso category ou sport-articles, ou seja, essas rotas não estarão protegidas pelo middleware de autenticação e autorização.
});

Route::get('/category', [CategoryController::class, 'index']);
Route::get('/category/{id}', [CategoryController::class, 'show']);

Route::get('/sport-articles', [SportArticleController::class, 'index']);
Route::get('/sport-articles/{id}', [SportArticleController::class, 'show']);

//Rota para comprar um artigo esportivo, onde {id} é o ID do artigo a ser comprado.
//O método buy do controlador SportArticleController será responsável por processar a compra do artigo esportivo.
Route::post('/sport-articles/{id}', [SportArticleController::class, 'buy']);

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
