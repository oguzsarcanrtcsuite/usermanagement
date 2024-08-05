sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("rtcusermanagement.controller.RoleAssignments", { // Use correct controller name
        onInit: async function () {
            try {
                var userlist = await this.getUserList();
                // Set user list to the model
                var oUserModel = new sap.ui.model.json.JSONModel({ users: userlist });
                this.getView().setModel(oUserModel, "userModel");
            } catch (error) {
                console.error("Error fetching user list: ", error);
            }
        },

        getUserList: async function() {
            var oModel = this.getOwnerComponent().getModel("RTCUserManagementService");
            var oContext = oModel.bindContext("/readUsers(...)");
            var oData = { userID: "1" };
            var users;

            oContext.setParameter("userID", oData.userID);
            await oContext.execute().then(function() {
                users = oContext.getBoundContext().getObject();
                console.log("User list fetched successfully!");
            });

            return users.value; 
        },

        // Other methods...
    });
});
