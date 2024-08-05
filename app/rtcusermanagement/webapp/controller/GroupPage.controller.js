sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("rtcusermanagement.controller.GroupPage", {
        onInit: async function () {
            var groupliststring = await this.getGroupList();
            var grouplist = JSON.parse(groupliststring);

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({ groups: grouplist });

            this.getView().setModel(oModel, "groupModel");
        },

        getGroupList: async function() {
            var oModel = this.getOwnerComponent().getModel("RTCUserManagementService");
            var oContext = oModel.bindContext("/readGroups(...)");

            var groups;
            await oContext.execute().then(function() {
                groups = oContext.getBoundContext().getObject();
                console.log("Group list fetched successfully!");
            });

            return groups.value; 
        },

        onAddButtonPress: function (oEvent) {
            var oView = this.getView();

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "rtcusermanagement.view.fragments.AddGroup",
                    controller: this
                }).then(function(oDialog) {
                    // Set the model with initial data
                    var oModel = new sap.ui.model.json.JSONModel({
                        groupName: "",
                        displayName: "",
                        description: "",
                        groupType: ""
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
                    groupName: "",
                    displayName: "",
                    description: "",
                    groupType: ""
                });
                oDialog.open();
            });
        },

        onSavePress: async function() {
            var oView = this.getView();
            var oModel = this.getOwnerComponent().getModel("RTCUserManagementService");
            var oContext = oModel.bindContext("/addGroup(...)");

            var oDialog = this.byId("addGroupDialog");
            var oDialogModel = oDialog.getModel();
            var oData = oDialogModel.getData();

            var oUserGroupData = {
                groupName: oData.groupName || undefined,
                displayName: oData.displayName || undefined,
                description: oData.description || undefined,
                groupType: oData.groupType || undefined,
            };

            oContext.setParameter("usergroup", oUserGroupData);
            await oContext.execute().then(
                async function () {
                    MessageToast.show("User Group successfully created!");
                    
                    // Clear the model data and close the dialog
                    oDialogModel.setData({
                        groupName: "",
                        displayName: "",
                        description: "",
                        groupType: ""
                    });
                    
                    this._pDialog.then(function(oDialogInstance) {
                        oDialogInstance.close();
                    });

                    // Grup listesini güncelle
                    var oModel = this.getView().getModel("groupModel");
                    var groups = oModel.getData().groups;
                    groups.push(oUserGroupData);
                    oModel.setProperty("/groups", groups);
                }.bind(this),
                function () {
                    MessageToast.show("Failed to create User Group.");
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
