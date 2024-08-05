sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("rtcusermanagement.controller.RTCUserManagement", {
        onInit: function () {
            // Initialization code
            
        },
        onRTCUserManagementCardPress: function (oEvent) {
            var oSource = oEvent.getSource();
            this.getView().byId("idIconTabBar").setSelectedKey("RTCUserManagementPage");
        },

        onRTCUserGroupsCardPress: function (oEvent) {
            var oSource = oEvent.getSource();        
            this.getView().byId("idIconTabBar").setSelectedKey("RTCUserGroupsPage");
        },

        onRTCRolesCardPress: function (oEvent) {
            var oSource = oEvent.getSource();        
            this.getView().byId("idIconTabBar").setSelectedKey("RTCRolesPage");
        },

        onRTCRoleCollectionsCardPress: function (oEvent) {
            var oSource = oEvent.getSource();        
            this.getView().byId("idIconTabBar").setSelectedKey("RTCRoleCollectionsPage");
        }
    });
});
