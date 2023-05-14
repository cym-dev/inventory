@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <h1>{{ __('Recipes') }}</h1>
                    <button id="btn-new"  data-bs-target= "#main-modal" data-bs-toggle= "modal" type="button" class="btn btn-info">+</button>
                </div>
               
                <div class="card-body">
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
         <table class="table table-striped table-hover table-bordered">
            <thead>
                <th>#</th>
                <th>Name</th>
                <th>Ingridients</th>
                <th>Action</th>
            </thead>
            <tbody id="tbody">
              
            </tbody>
             </table>
                </div>
                    @include('pages.admin.recipes.modal')

                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('javascript')    
    <script  type="module" src="{{ asset('js/admin/recipe/index.js') }}"></script>
@endsection