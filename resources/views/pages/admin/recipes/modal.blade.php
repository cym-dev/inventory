<div class="modal fade" id="main-modal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 id="modal-title">Add Recipe</h1>
            </div>
            <div class="modal-body">
                <form id="set-Model" class="form-horizontal">
                    <input type="hidden" name="updated_by" value="{{ Auth::user()->id }}">
                <div class="form-group" id="from_group">
                    <div class="input-group input-group-lg mb-2">
                        <input  class="form-control border border-info-subtle rounded w-100" type="text" name="name" id="name" placeholder="Item Name" required>
                    </div> 
                    <div class="input-group input-group-lg mb-2">
                        <select id="select-0"  class=" form-control border border-info-subtle rounded w-25"  placeholder="Item Name" required>
                            <option disabled selected value=""> Select Item </option>
                        </select>
                        <input data-index=0 id="input-0"  class="input form-control border border-info-subtle rounded w-25" type="number" placeholder="Item Name" required>
                        <button id="button-0"  c type="button" data-index=0   class="btn btn-success form-control btn-add-item" data-id=0>Save</button>
                    </div> 
                </div>
                </form>
                <div class="modal-footer">
                <button type="button"    data-bs-target= "#main-modal"
                        data-bs-toggle= "modal" id="engrave" class="btn btn-success form-control" data-id=0>Save</button>
                </div>
            </div>
        </div>
    </div>
</div>