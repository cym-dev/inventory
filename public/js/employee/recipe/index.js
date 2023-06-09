import fetch from "../../fetch.js";
$("body").on("click", ".edit-btn", async (e) => {
    state.onShow($(e.currentTarget).data("index"));
});

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
    subEntity: {
        name: "items/recipe",
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
    key: document.getElementById("key"),
    look: document.getElementById("look"),
    init: async () => {
        state.btnEngrave.addEventListener("click", state.onStore);
        state.btnEngrave.disable = false;
        await state.ask();
    },
    ask: async () => {
        state.models = await fetch.translate(state.entity);
        state.items = await fetch.ask("../api/items");
        if (state.models)
            await state.models.forEach(
                async (model, i) => await state.writter(model, i)
            );
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
            html: `<i class="fa-solid fa-clipboard"></i>`,
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
        state.btnEngrave.innerHTML = "Input Servings";
        state.selectedItems = state.models[i].list;
        state.btnEngrave.addEventListener("click", state.onStore);
        state.btnEngrave.setAttribute("data-id", state.models[i].id);
        fetch.setModal(state.models[i]);
    },
    onUpdate: async () => {
        let params = $("#set-Model").serializeArray();
        let pk = state.btnEngrave.getAttribute("data-id");
        let models = await fetch.update(state.entity, pk, params);
        console.log(models);
        if (models) {
            $("#modal-main").modal("hide");
        }
    },
    onStore: async (e) => {
        e.preventDefault();
        let models = await fetch.store(state.subEntity, [
            { name: "items", value: state.selectedItems },
            { name: "servings", value: $("#servings").val() },
        ]);
        var isLow = false;
        if (models) {
            await models.forEach(async (model, i) => {
                if (!isLow && model.qnty < 3) {
                    isLow = true;
                }
                await state.updateWritter(model, i, isLow);
            });
        }
        $("#update-modal").modal("show");
        // $("#modal-main").modal("show");
    },
    updateWritter: async (model, i, isLow) => {
        let tr = $("<tr>", { class: `${(i + 1) % 2 == 1 ? "odd" : "even"}` });
        $("<td>", { html: i + 1 }).appendTo(tr);
        $("<td>", { html: model.name, class: "text-capitalize" }).appendTo(tr);
        $("<td>", { html: model.qnty, class: "text-capitalize" }).appendTo(tr);

        await $("#body").append(tr);
        if (isLow) {
            await $("#para").html(
                "Some ingridients is Low or not enougth to serve this order please aware the manager/admin to check the out of stock or running low!"
            );
        }
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
