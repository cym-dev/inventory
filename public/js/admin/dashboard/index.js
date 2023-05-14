import fetch from "../../fetch.js";

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

    init: async () => {
        await state.ask();
    },
    ask: async () => {
        state.models = await fetch.translate(state.entity);
        if (state.models)
            await state.models.forEach(
                async (model, i) => await state.writter(model, i)
            );
    },

    handleStock: (stock) => {
        if (stock < 5) {
            return "text-danger";
        } else if (stock < 15) {
            return "text-warning";
        } else {
            return "text-success";
        }
    },

    writter: async (model, i) => {
        var col = $("<div>", { class: "col-md-2 mb-2" });
        var card = $("<div>", { class: "card" }).appendTo(col);
        var cardH = $("<div>", {
            class: "card-header d-flex justify-content-between",
        }).appendTo(card);
        $("<span>", { html: model.name }).appendTo(cardH);
        $("<span>", {
            html: model.qnty,
            class: `${state.handleStock(model.qnty)} pe-auto`,
            title: `f`,
        }).appendTo(cardH);
        await $("#container").append(col);
    },
};
window.addEventListener("load", state.init);
