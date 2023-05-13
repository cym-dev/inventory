<div class="modal fade" id="main-modal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 id="modal-title">Add Item</h1>
            </div>
            <div class="modal-body">
                <form id="set-Model" class="form-horizontal">
                    <input type="hidden" name="updated_by" value="{{ Auth::user()->id }}">
                <div class="form-group">
                    <div class="input-group input-group-lg mb-2">
                        <input  class="form-control border border-info-subtle rounded w-100" type="text" name="name" id="name" placeholder="Item Name" required>
                    </div> 
                     <div class="input-group input-group-lg mb-2">
                        <input  class="form-control border border-info-subtle rounded w-100" type="number" name="qnty" id="qnty" placeholder="Item mesurement" required>
                    </div> 
                     <div
                        class="mb-3 d-flex"
                    >
                        <select
                            name="unit"
                            class="form-select"
                            id="unit"
                        >
                        <option selected disabled>
                            Select unit
                        </option>
                        <option value="g/s">
                           Grams
                        </option>
                        <option value="kg/s">
                           Kilogram
                        </option>
                        </select>
                    </div>
                     <div
                        class="mb-3 d-flex"
                    >
                        <select
                            name="category"
                            class="form-select"
                            id="category"
                        >
                        <option selected disabled>
                            Select category
                        </option>
                        <option value="fruit">
                           Fruit
                        </option>
                        <option value="vegtables">
                           Vegtables
                        </option>
                        <option value="meat">
                           Meat
                        </option>
                        <option value="seassoning">
                           Seassoning
                        </option>
                        </select>
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