sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("rtcusermanagement.controller.UsersandAuthorizationPage", {
        onInit: async function () {
            var userliststring = await this.getUserList();
            var userlist = JSON.parse(userliststring);

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({ users: userlist });

            
            this.getView().setModel(oModel, "userModel");
        },

        getUserList: async function() {
            var oModel = this.getOwnerComponent().getModel("RTCUserManagementService");
            var oContext = oModel.bindContext("/readUsers(...)");
            var oData = {
                userID: "1"
            };
            var users;
            oContext.setParameter("userID", oData.userID);
            await oContext.execute().then(function() {
                users = oContext.getBoundContext().getObject();
                console.log("User list fetched successfully!");
            });

            return users.value; 
        },

        onAddButtonPress: function (oEvent) {
            var oView = this.getView();

            // Check if the fragment already exists
            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "rtcusermanagement.view.fragments.AddUser",
                    controller: this
                }).then(function(oDialog) {
                    // Set the model with initial data
                    var oModel = new sap.ui.model.json.JSONModel({
                        firstName: "",
                        lastName: "",
                        email: "",
                        loginName: "",
                        ID: ""
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
                    firstName: "",
                    lastName: "",
                    email: "",
                    loginName: "",
                    ID: ""
                });
                oDialog.open();
            });
        },

        onSavePress: async function() {
            var oView = this.getView();
            var oModel = this.getOwnerComponent().getModel("RTCUserManagementService");
            var oContext = oModel.bindContext("/addUser(...)");

            var oDialog = this.byId("addUserDialog");
            var oDialogModel = oDialog.getModel();
            var oData = oDialogModel.getData();

            var oUserData = {
                firstName: oData.firstName || undefined,
                lastName: oData.lastName || undefined,
                emailAddress: oData.email || undefined,
                loginName: oData.loginName || undefined,
                userType : "Employee",
            };

            oContext.setParameter("user", oUserData);
            await oContext.execute().then(
                async function () {
                    MessageToast.show("User successfully created!");
                    
                    // Clear the model data and close the dialog
                    oDialogModel.setData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        loginName: "",
                        ID: ""
                    });
                    
                    this._pDialog.then(function(oDialogInstance) {
                        oDialogInstance.close();
                    });

                    // Kullanıcı listesini yeniden getir ve modeli güncelle
                    var userliststring = await this.getUserList();
                    var userlist = JSON.parse(userliststring);
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData({ users: userlist });
                    this.getView().setModel(oModel, "userModel");

                }.bind(this),
                function () {
                    MessageToast.show("Failed to create user.");
                }
            );
        },

        onCancelPress: function() {
            this._pDialog.then(function(oDialog) {
                oDialog.close();
            });
        },

        onUserPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var oCtx = oItem.getBindingContext("userModel");
            var sFirstName = oCtx.getProperty("firstName");
            var sLastName = oCtx.getProperty("lastName");
            var sEmail = oCtx.getProperty("emailAddress");
            var sLoginName = oCtx.getProperty("loginName");
            var sID = oCtx.getProperty("ID");

            MessageToast.show("User clicked: " + sFirstName + " " + sLastName + " (" + sEmail + ")");
        }
    });
});
