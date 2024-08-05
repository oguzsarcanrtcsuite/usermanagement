sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("rtcusermanagement.controller.RoleCollectionsPage", {
        onInit: async function () {
            var userlist = await this.getUserList();
        },

        getUserList: async function() {
            return 
        },

        onAddButtonPress: function (oEvent) {

            var oView = this.getView();

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "rtcusermanagement.view.fragments.AddRoleCollection",
                    controller: this
                }).then(function(oDialog) {
                    // Set the model with initial data
                    var oModel = new sap.ui.model.json.JSONModel({
                        roleCollectionName: "",
                        roleCollectionDescription: ""
                    });
                    oDialog.setModel(oModel);
                    
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._pDialog.then(function(oDialog) {
                // Clear the model data before opening the dialog
                var oModel = oDialog.getModel();
                oModel.setData({
                    roleCollectionName: "",
                    roleCollectionDescription: ""
                });
                oDialog.open();
            });
        },

        onSavePress: async function() {
            var oView = this.getView();
            var oModel = this.getOwnerComponent().getModel("RTCUserManagementService");
            var oContext = oModel.bindContext("/addRoleCollection(...)");

            var oDialog = this.byId("addUserDialog");
            var oDialogModel = oDialog.getModel();
            var oData = oDialogModel.getData();

            var oRoleCollectionData = {
                roleCollectionName: oData.roleCollectionName || undefined,
                roleCollectionDescription: oData.roleCollectionDescription || undefined
            };

            oContext.setParameter("rolecollection", oRoleCollectionData);
            await oContext.execute().then(
                function () {
                    MessageToast.show("Role Collection successfully created!");
                    
                    // Clear the model data and close the dialog
                    oDialogModel.setData({
                        roleCollectionName: "",
                        roleCollectionDescription: ""
                    });
                    
                    this._pDialog.then(function(oDialogInstance) {
                        oDialogInstance.close();
                    });
                }.bind(this),
                function () {
                    MessageToast.show("Failed to create Role Collection.");
                }
            );
        },

        onCancelPress: function() {
            this._pDialog.then(function(oDialog) {
                oDialog.close();
            });
        }
    });
});
