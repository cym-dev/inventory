import fetch from "../../fetch.js";
$("body").on("click", ".edit-btn", async (e) => {
    state.onShow($(e.currentTarget).data("index"));
});
$("body").on("click", ".btn-delete", async (e) =>
    state.onDestroy($(e.currentTarget).data("index"))
);

const state = {
    entity: {
        name: "item",
        attributes: ["name", "section"],
        actions: {
            find: ["fa fa-edit", "Edit", "info"],
            delete: ["fa fa-trash", "Delete", "danger"],
        },
        baseUrl: "../api",
    },

    models: [],
    organizers: [],
    criteria: [],
    activeIndex: 0,
    btnUpdate: null,
    btnEngrave: document.getElementById("engrave"),
    btnUpdate: null,
    btnDelete: null,
    btnNew: document.getElementById("btn-new"),
    key: document.getElementById("key"),
    look: document.getElementById("look"),
    init: async () => {
        state.btnEngrave.addEventListener("click", state.onStore);
        state.btnEngrave.disable = false;
        state.btnNew.addEventListener("click", state.onCreate);
        state.btnNew.disable = false;
        await state.ask();
    },
    ask: async () => {
        state.models = await fetch.translate(state.entity);
        if (state.models)
            await state.models.forEach(
                async (model, i) => await state.writter(model, i)
            );
    },

    handleAddCreteria: async () => {
        const { value: value } = await Swal.fire({
            title: "Add Selection",
            input: "text",
            inputLabel: "Name",
            inputPlaceholder: "Enter your email address",
        });

        if (value) {
            let criteria = await fetch.store(
                { name: "criteria", baseUrl: "../api" },
                [{ name: "name", value }]
            );
            state.criteria.push(criteria);
            state.init();
            await state.option();
        }
    },

    writter: async (model, i) => {
        let tr = $("<tr>", { class: `${(i + 1) % 2 == 1 ? "odd" : "even"}` });
        $("<td>", { html: i + 1 }).appendTo(tr);
        $("<td>", { html: model.name, class: "text-capitalize" }).appendTo(tr);
        $("<td>", {
            html: `${model.qnty} ${model.unit}`,
            class: "text-capitalize",
        }).appendTo(tr);
        $("<td>", { html: model.category, class: "text-capitalize" }).appendTo(
            tr
        );
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
        console.log(state.models[i]);
        state.activeIndex = i;
        state.btnEngrave.innerHTML = "Update";
        state.btnEngrave.addEventListener("click", state.onUpdate);
        state.btnEngrave.removeEventListener("click", state.onStore);
        state.btnEngrave.setAttribute("data-id", state.models[i].id);
        fetch.setModal(state.models[i]);
    },
    onUpdate: async () => {
        let params = $("#set-Model").serializeArray();
        let pk = state.btnEngrave.getAttribute("data-id");
        let models = await fetch.update(state.entity, pk, params);
        if (models) {
            state.ask();
            $("#main-modal").modal("hide");
        }
    },
    onStore: async (e) => {
        e.preventDefault();
        let params = $("#set-Model").serializeArray();
        console.log(params);
        let models = await fetch.store(state.entity, params);
        state.models.push(models);
        state.ask();
        $("#modal-main").modal("hide");
    },
    onDestroy: async (i) => {
        let pk = state.models[i].id;
        let del = await fetch.destroy(state.entity, pk);
        if (del) {
            state.models.slice(i, 1);
        }
        state.ask();
    },
};
window.addEventListener("load", state.init);
