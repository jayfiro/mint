if (!window.frappe) window.frappe = {};

frappe.provide = function (namespace) {
    // docs: create a namespace //
    var nsl = namespace.split(".");
    var parent = window;
    for (var i = 0; i < nsl.length; i++) {
        var n = nsl[i];
        if (!parent[n]) {
            parent[n] = {};
        }
        parent = parent[n];
    }
    return parent;
};

frappe.provide("locals");
frappe.provide("frappe.flags");
frappe.provide("frappe.settings");
frappe.provide("locals.DocType");
frappe.provide("frappe.model")
frappe.provide("frappe.defaults")
frappe.provide("frappe.meta")

// model/sync.js is a copy of the desk's, so update_in_locals() reaches for
// frappe.meta.get_field and frappe.model.table_fields when it merges an incoming doc
// into an entry locals already holds. Both live in desk bundles this standalone app
// never loads, so without them the first duplicate doc in frappe.boot.docs throws
// before React mounts. Resolve fields out of the DocType docs useDocType() caches in
// locals; an unknown doctype yields undefined, which update_in_locals already handles.
frappe.meta.get_field = function (doctype, fieldname) {
    let fields = locals.DocType[doctype] && locals.DocType[doctype].fields;
    return fields && fields.find((df) => df.fieldname === fieldname);
};

frappe.model.table_fields = ["Table", "Table MultiSelect"];