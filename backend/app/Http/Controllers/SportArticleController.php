<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSportArticleRequest;
use App\Http\Requests\UpdateSportArticleRequest;
use App\Models\SportArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SportArticleController extends Controller
{
    protected $sportArticle;

    public function __construct(SportArticle $sportArticle)
    {
        $this->sportArticle = $sportArticle;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $sportArticles = $this->sportArticle->with('category')->get();
        return response()->json($sportArticles, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSportArticleRequest $request): JsonResponse
    {
        $data = $request->validated();
        
        if($request->hasFile('image')){
            $path = $request->file('image')->store('sport-articles', 'public');
            $data['image'] = url('/storage/'.$path);
        }
        $sportArticle = $this->sportArticle->create($data);
        $id = $sportArticle->id;
        $sportArticle_category = $this->sportArticle->with('category')->findOrFail($id);//Recupera o artigo esportivo recém-criado, juntamente com a categoria associada a ele. 

        return response()->json($sportArticle_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $sportArticle = $this->sportArticle->with('category')->findOrFail($id);
        return response()->json($sportArticle, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSportArticleRequest $request, $id): JsonResponse
    {
        $sportArticle = $this->sportArticle->with('category')->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try{
                $image_name = explode ('sport-articles/', $sportArticle['image']);
                Storage::disk('public')->delete('sport-articles/'.$image_name[1]);
            } catch(Throwable) {
                /*Caso o artigo esportivo não tenha uma imagem associada a ele, ou seja, a coluna "image" seja nula, o código dentro do bloco catch será executado.
                Nesse caso, o código simplesmente ignora a tentativa de exclusão da imagem e continua com a atualização do artigo esportivo.*/
            } finally{
                $path = $request->file('image')->store('sport-articles', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $sportArticle->update($data);
        
        return response()->json($sportArticle, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $sportArticle = $this->sportArticle->findOrFail($id);
        $sportArticle->delete();
        return response()->json(['Message' => 'Equipamento deletado com sucesso']);
    }

    /**
     * Compra um artigo esportivo com a quantidade solicitada.
     *
     * Este método processa a compra de um artigo esportivo, validando a quantidade
     * solicitada e verificando se há estoque disponível. Se a quantidade solicitada
     * for menor ou igual ao estoque, decrementa a quantidade e retorna sucesso.
     * Caso contrário, retorna uma mensagem de erro indicando a disponibilidade.
     * 
     * Retorno:
     *         - HTTP_OK (200): Se a compra foi realizada com sucesso,
     *          retorna a mensagem de sucesso e a nova quantidade em estoque
     *         - HTTP_BAD_REQUEST (400): Se a quantidade solicitada não está
     *          disponível ou o produto está fora de estoque
     */
    public function buy(Request $request, $id): JsonResponse
    {  
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]); 
        $qtdRequested = $request->integer('quantity', 1);

        $sportArticle = $this->sportArticle->findOrFail($id);

        if ($sportArticle->amount >= $qtdRequested) {
            $sportArticle->decrement('amount', $qtdRequested);
            
            return response()->json(['Message' => 'Compra realizada com sucesso', 'amount' => $sportArticle->amount], Response::HTTP_OK);

        } else if ($sportArticle->amount > 0) {
            $message = "Quantidade solicitada indisponível. Apenas {$sportArticle->amount} em estoque.";
            return response()->json(['Message' => $message], Response::HTTP_BAD_REQUEST);

        } else {
            $message = "Produto indisponível. Sem unidades em estoque.";
            return response()->json(['Message' => $message], Response::HTTP_BAD_REQUEST);
        }
    }
}
