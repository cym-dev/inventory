@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <h1>{{ __('Inventory') }}</h1>
                    <button   data-bs-target= "#main-modal" data-bs-toggle= "modal" type="button" class="btn btn-info">+</button>
                </div>
               
                <div class="card-body">
                    
         <table class="table table-striped table-hover table-bordered">
            <thead>
                <th>#</th>
                <th>Name</th>
                <th>Mesurement</th>
                <th>Update By</th>
                <th>Action</th>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>sample</td>
                    <td>23kilo</td>
                    <td>sample</td>
                    <td style="width:30%" >
                       <div class="btn-group w-100 mx-auto" role="group" aria-label="Basic mixed styles example">
                            <button   data-bs-target= "#main-modal"
                        data-bs-toggle= "modal"type="button" class="btn btn-warning w-50">Edit</button>
                            <button type="button" class="btn btn-danger w-50">Delete</button>
                        </div>
                    </td>
                </tr>
                  <tr>
                    <td>2</td>
                    <td>sample</td>
                    <td>23kilo</td>
                    <td>sample</td>
                    <td style="width:30%" >
                       <div class="btn-group w-100 mx-auto" role="group" aria-label="Basic mixed styles example">
                            <button   data-bs-target= "#main-modal"
                        data-bs-toggle= "modal"type="button" class="btn btn-warning w-50">Edit</button>
                            <button type="button" class="btn btn-danger w-50">Delete</button>
                        </div>
                    </td>
                </tr>
                  <tr>
                    <td>3</td>
                    <td>sample</td>
                    <td>23kilo</td>
                    <td>sample</td>
                    <td style="width:30%" >
                       <div class="btn-group w-100 mx-auto" role="group" aria-label="Basic mixed styles example">
                            <button   data-bs-target= "#main-modal"
                        data-bs-toggle= "modal"type="button" class="btn btn-warning w-50">Edit</button>
                            <button type="button" class="btn btn-danger w-50">Delete</button>
                        </div>
                    </td>
                </tr>
                  <tr>
                    <td>4</td>
                    <td>sample</td>
                    <td>23kilo</td>
                    <td>sample</td>
                    <td style="width:30%" >
                       <div class="btn-group w-100 mx-auto" role="group" aria-label="Basic mixed styles example">
                            <button   data-bs-target= "#main-modal"
                        data-bs-toggle= "modal"type="button" class="btn btn-warning w-50">Edit</button>
                            <button type="button" class="btn btn-danger w-50">Delete</button>
                        </div>
                    </td>
                </tr>
                  <tr>
                    <td>5</td>
                    <td>sample</td>
                    <td>23kilo</td>
                    <td>sample</td>
                    <td style="width:30%" >
                       <div class="btn-group w-100 mx-auto" role="group" aria-label="Basic mixed styles example">
                            <button   data-bs-target= "#main-modal"
                        data-bs-toggle= "modal"type="button" class="btn btn-warning w-50">Edit</button>
                            <button type="button" class="btn btn-danger w-50">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
             </table>
                    @include('pages.admin.inventories.modal')

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
