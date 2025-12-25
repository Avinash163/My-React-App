/* 
 app.jsx
 After Effects ScriptUI Project
 Author: You
*/

(function appMain(thisObj) {

    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel)
            ? thisObj
            : new Window("palette", "My AE App", undefined, { resizeable: true });

        // ================= UI =================
        win.orientation = "column";
        win.alignChildren = ["fill", "top"];

        var header = win.add("statictext", undefined, "AE Utility Panel");
        header.alignment = "center";

        var btnCreateComp = win.add("button", undefined, "Create Composition");
        var btnAddText = win.add("button", undefined, "Add Text Layer");
        var btnAddSolid = win.add("button", undefined, "Add Solid Layer");

        // ================= FUNCTIONS =================

        btnCreateComp.onClick = function () {
            app.beginUndoGroup("Create Comp");

            var comp = app.project.items.addComp(
                "My_Comp",
                1920,
                1080,
                1,
                10,
                30
            );

            comp.openInViewer();
            app.endUndoGroup();
        };

        btnAddText.onClick = function () {
            var comp = app.project.activeItem;
            if (!(comp instanceof CompItem)) {
                alert("Please select a composition.");
                return;
            }

            app.beginUndoGroup("Add Text");

            var textLayer = comp.layers.addText("Hello After Effects");
            textLayer.property("Position").setValue([960, 540]);

            app.endUndoGroup();
        };

        btnAddSolid.onClick = function () {
            var comp = app.project.activeItem;
            if (!(comp instanceof CompItem)) {
                alert("Please select a composition.");
                return;
            }

            app.beginUndoGroup("Add Solid");

            comp.layers.addSolid(
                [1, 0, 0],
                "Red Solid",
                comp.width,
                comp.height,
                1
            );

            app.endUndoGroup();
        };

        win.layout.layout(true);
        return win;
    }

    var myUI = buildUI(thisObj);
    if (myUI instanceof Window) {
        myUI.center();
        myUI.show();
    }

})(this);
