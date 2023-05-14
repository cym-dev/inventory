import fetch from "../../fetch.js";
$("body").on("click", ".edit-btn", async (e) => {
    state.onShow($(e.currentTarget).data("index"));
});
$("body").on("click", ".btn-delete", async (e) =>
    state.onDestroy($(e.currentTarget).data("index"))
);
$("body").on("click", ".btn-add-item", async (e) =>
    state.handleSubmitItem($(e.currentTarget).data("index"))
);
$("body").on("keyup", ".input", async (e) =>
    state.handleEditQnty(
        $(e.currentTarget).data("index"),
        e.currentTarget.value
    )
);

const state = {
    entity: {
        name: "recipe",
        attributes: ["name", "section"],
        actions: {
            find: ["fa fa-edit", "Edit", "info"],
            delete: ["fa fa-trash", "Delete", "danger"],
        },
        baseUrl: "../api",
    },

    models: [],
    items: [],
    selectedItems: [],
    item: {
        id: 0,
        qnty: 0,
    },
    activeIndex: 0,
    selectedIndex: 0,
    btnUpdate: null,
    btnEngrave: document.getElementById("engrave"),
    btnUpdate: null,
    btnDelete: null,
    btnNew: document.getElementById("btn-new"),
    key: document.getElementById("key"),
    look: document.getElementById("look"),
    select: document.getElementById("select-0"),
    init: async () => {
        state.btnEngrave.addEventListener("click", state.onStore);
        state.btnEngrave.disable = false;
        state.btnNew.addEventListener("click", state.onCreate);
        state.btnNew.disable = false;
        state.select.addEventListener("change", (e) =>
            state.handleSetSelect(e.target.value)
        );
        state.btnNew.disable = false;
        await state.ask();
    },
    ask: async () => {
        state.models = await fetch.translate(state.entity);
        state.items = await fetch.ask("../api/items");
        if (state.models)
            await state.models.forEach(
                async (model, i) => await state.writter(model, i)
            );
        if (state.items)
            await state.items.forEach(
                async (model, i) => await state.handleAddItem(model, i, 0)
            );
    },

    handleSetSelect: async (i) => {
        state.item.id = i;
        state.selectedIndex = i;
    },

    handleEditQnty: async (i, val) => {
        state.selectedItems[i].qnty = await val;
    },

    handleSubmitItem: async (i) => {
        await state.handleOption(i + 1);
        await state.selectedItems.push({
            id: state.item.id,
            qnty: $(`#input-${i}`).val(),
        });
        await document
            .getElementById(`select-${i + 1}`)
            .addEventListener("change", async (e) => {
                await state.handleSetSelect(e.target.value);
            });
        document.getElementById(`button-${i}`).remove();
        var newArr = await state.items.filter((e) => {
            return parseInt(e.id) !== parseInt(state.selectedIndex);
        });
        state.items = newArr;
        await newArr.forEach(
            async (model, index) =>
                await state.handleAddItem(model, parseInt(model.id), i + 1)
        );
    },

    handleOption: async (i) => {
        var div = $("<div>", { class: "input-group input-group-lg mb-2" });
        var select = $("<select>", {
            id: `select-${i}`,
            class: " form-control border border-info-subtle rounded w-25",
        });
        $("<option>", {
            disabled: true,
            selected: true,
            value: "",
            html: "Select Item",
        }).appendTo(select);
        div.append(select);
        $("<input>", {
            class: "input form-control border border-info-subtle rounded w-25",
            type: "number",
            id: `input-${i}`,
            "data-index": i,
            placeholder: "Quanty",
            required: true,
        }).appendTo(div);
        $("<button>", {
            type: "button",
            "data-index": i,
            id: `button-${i}`,
            class: "btn btn-success form-control btn-add-item",
            html: "Add",
        }).appendTo(div);
        await $("#from_group").append(div);
    },

    handleAddItem: async (model, index, i) => {
        var opt = $("<option>", {
            html: model.name,
            value: parseInt(model.id),
        });
        await $(`#select-${i}`).append(opt);
    },

    writter: async (model, i) => {
        var arr = [];
        model.list.forEach((item) => {
            arr.push(`${item.name}-${item.qnty}`);
        });
        let tr = $("<tr>", { class: `${(i + 1) % 2 == 1 ? "odd" : "even"}` });
        $("<td>", { html: i + 1 }).appendTo(tr);
        $("<td>", { html: model.name, class: "text-capitalize" }).appendTo(tr);
        $("<td>", {
            html: arr.join(", "),
            class: "text-capitalize",
        }).appendTo(tr);
        var td = $("<td>");
        $("<button>", {
            "data-index": i,
            "data-bs-target": "#main-modal",
            "data-bs-toggle": "modal",
            class: "btn btn-info edit-btn px-3 py-2 me-1",
            html: `<i class="bi bi-pen"></i>`,
        }).appendTo(td);
        $("<button>", {
            "data-index": i,
            class: "btn btn-danger px-3 py-2 me-1 btn-delete",
            html: `<i class="bi bi-trash"></i>`,
        }).appendTo(td);
        tr.append(td);
        await $("#tbody").append(tr);
    },
    onCreate: async () => {
        state.btnEngrave.innerHTML = "Save";
        state.btnEngrave.removeEventListener("click", state.onUpdate);
        state.btnEngrave.addEventListener("click", state.onStore);
        fetch.showModal();
    },
    onShow: async (i) => {
        state.activeIndex = i;
        state.btnEngrave.innerHTML = "Update";
        let index = 0;
        state.btnEngrave.addEventListener("click", state.onUpdate);
        state.btnEngrave.removeEventListener("click", state.onStore);
        state.btnEngrave.setAttribute("data-id", state.models[i].id);
        fetch.setModal(state.models[i]);
        state.selectedItems = state.models[i].list;
        while (index < state.models[i].list.length) {
            await state.handleOption(index + 1);
            var newArr = await state.items.filter((e) => {
                return (
                    parseInt(e.id) !== parseInt(state.models[i].list[index].id)
                );
            });
            await document
                .getElementById(`select-${index + 1}`)
                .addEventListener("change", async (e) => {
                    await state.handleSetSelect(e.target.value);
                });
            state.items = await newArr;
            await state.items.forEach(
                async (model) =>
                    await state.handleAddItem(model, model.id, index + 1)
            );
            await $(`#input-${index}`).val(state.models[i].list[index].qnty);
            await $(`#select-${index}`).val(
                parseInt(state.models[i].list[index].id)
            );
            $(`#select-${index}`).prop("disabled", true);
            document.getElementById(`button-${index}`).remove();
            await $(`#input-${index}`).val(state.models[i].list[index].qnty);
            index++;
        }
    },
    onUpdate: async () => {
        let params = [
            { name: "name", value: $("#name").val() },
            { name: "items", value: state.selectedItems },
        ];
        let pk = state.btnEngrave.getAttribute("data-id");
        let models = await fetch.update(state.entity, pk, params);
        if (models) {
            console.log(models);
            state.models[state.activeIndex] = models;
            $("tbody").empty();
            if (state.models)
                await state.models.forEach(
                    async (model, i) => await state.writter(model, i)
                );

            $("#modal-main").modal("hide");
        }
    },
    onStore: async (e) => {
        e.preventDefault();
        let params = $("#name").val();
        let models = await fetch.store(state.entity, [
            { name: "name", value: params },
            { name: "items", value: state.selectedItems },
        ]);
        state.models.push(models);
        $("tbody").empty();
        if (state.models)
            await state.models.forEach(
                async (model, i) => await state.writter(model, i)
            );
        $("#modal-main").modal("hide");
    },
    onDestroy: async (i) => {
        let pk = state.models[i].id;
        let del = await fetch.destroy(state.entity, pk);
        if (del) {
            state.models.slice(i, 1);
            $("tbody").empty();
            await state.models.forEach(
                async (model, i) => await state.writter(model, i)
            );
        }
        state.ask();
    },
};
window.addEventListener("load", state.init);
