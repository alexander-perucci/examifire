"use strict";
var KTAvatarDemo = function () {
	// Private functions
	var initDemos = function () {
        var avatar3 = new KTAvatar('kt_user_avatar_3');
	}

	return {
		// public functions
		init: function() {
			initDemos();
		}
	};
}();
// Class definition
var UserEdit = function() {

	var saveUserFormAndContinueEvent = function() {
		$("#link-save-and-continue").click(function() {
			$("#save_and_continue").val(true);
			$("#user-edit-form").submit();
		});
	}
	
	var saveUserFormAndCloseEvent = function() {
		$("#link-save-and-close").click(function() {
			$("#save_and_continue").val(false);
			$("#user-edit-form").submit();
		});
	}
	
	var saveNavigationTabActiveLink = function() {
		$("#tab_profile").click(function() {
			$("#navigation_tab_active_link").val("profile");
		});
		$("#tab_account").click(function() {
			$("#navigation_tab_active_link").val("account");
		});
	}
	
	var resetAvatar = function() {
		$("#link-reset-avatar").click(function() {
			$("#reset_avatar").val(true);
			$('.kt-avatar__cancel').click();
			$('.kt-avatar__holder').css("background-image", "url(/my-assets/media/users/default.jpg)");
		});
	}
	var undoResetAvatar = function() {
		$("input[name='profile_avatar']").change(function (){
		   if (this.value.length){
		       $("#reset_avatar").val(false);
		   }else{
			   $('.kt-avatar__cancel').click();
			   
		   }   
		});
	}
	
	return {
		// public functions
		init : function() {
			saveUserFormAndContinueEvent();
			saveUserFormAndCloseEvent();
			saveNavigationTabActiveLink();
			resetAvatar();
			undoResetAvatar();
		}
	};
}();

jQuery(document).ready(function() {
	UserEdit.init();
	KTAvatarDemo.init();
	

	
	if($("#confirm_crud_operation").val() == 'update_succeeded') {
		ExamifireMessageUtil.showMessage("success",false,"fas fa-check","The user has been updated!")
	}	
	if($("#confirm_crud_operation").val() == 'update_failed') {
		ExamifireMessageUtil.showMessage("danger",false,"fas fa-exclamation-triangle","Update failed, please check the errors!")
	}
	
	
	
});