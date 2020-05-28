"use strict";

// Class definition
var Avatar = function() {
    var image;
    var $modal;
    var cropper;

    var _initAvatar = function() {
        image = KTUtil.getById('modal_image_avatar');
        $modal = $('#modal');
        
        var addSpinnerAvatar = function(){
        	$('#avatar_account_info').addClass('spinner spinner-center spinner-track spinner-primary spinner-lg');
            $('#avatar_aside').addClass('spinner spinner-center spinner-track spinner-primary spinner-lg');
        };
        
        var removeSpinnerAvatar = function(){
        	$('#avatar_account_info').removeClass('spinner spinner-center spinner-track spinner-primary spinner-lg');
            $('#avatar_aside').removeClass('spinner spinner-center spinner-track spinner-primary spinner-lg');
        };
        
        $("#file_avatar").change(function(e) {
            var files = e.target.files;
            var done = function(url) {
                $("#file_avatar").val('');
                image.src = url;
                $modal.modal('show');
            };
            var reader;
            var file;
            var url;

            if (files && files.length > 0) {
                file = files[0];

                if (URL) {
                    done(URL.createObjectURL(file));
                } else if (FileReader) {
                    reader = new FileReader();
                    reader.onload = function(e) {
                        done(reader.result);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });

        $modal.on('shown.bs.modal', function() {
          cropper = new Cropper(image, {
        		dragMode: 'move',
        	    aspectRatio: 1,
        	    viewMode: 3,
            });
        }).on('hidden.bs.modal', function() {
        	cropper.destroy();
            cropper = null;
        });
        
        // This is the HTML element used for removing the avatar i.e., X
        $("span[data-action='remove']").click(function() {
            addSpinnerAvatar();
            
        	$.ajax(MY_HOST_URL+'/home/profile/avatar/remove', {
                type: "POST",
                processData: false,
                contentType: false,
                beforeSend: function(xhr) {
                	// We need to set the csrf token within our Ajax request.
                    // This token is generated by Spring Security and we read it from within the page header.
                    var token = $("meta[name='_csrf']").attr("content");
                    var header = $("meta[name='_csrf_header']").attr("content");
                    xhr.setRequestHeader(header, token);
                },
                success: function(data) {
                	// force the redirect to the URL contained in data in order to
                	// refresh the page and get the new user image just saved in the DB.
                	// A better solution would be to update the image directly via javascript
                	window.location.href = MY_HOST_URL + data;
                },
                error: function(data) {
                    // in case of error the refresh of the page shouldn't be needed,
                	// it should be enought remove the spinner.
                	// However, at the moment we force it to be sure
                    window.location.href = MY_HOST_URL + data;
                    //removeSpinnerAvatar();
                }
            });
        });

        $("#modal_change_avatar").click(function() {
        	var initialAvatarURL;
            var canvas;
            
            addSpinnerAvatar();
            $modal.modal('hide');
            

            if (cropper) {
                canvas = cropper.getCroppedCanvas({
                    width: 160,
                    height: 160,
                });

                canvas.toBlob(function(blob) {
                    var formData = new FormData();
                    formData.append('avatar', blob);

                    $.ajax(MY_HOST_URL+'/home/profile/avatar/change', {
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        beforeSend: function(xhr) {
                        	// We need to set the csrf token within our Ajax request.
                            // This token is generated by Spring Security and we read it from within the page header.
                            var token = $("meta[name='_csrf']").attr("content");
                            var header = $("meta[name='_csrf_header']").attr("content");
                        	xhr.setRequestHeader(header, token);
                        },
                        success: function(data) {
                        	// force the redirect to the URL contained in data in order to
                        	// refresh the page and get the new user image just saved in the DB.
                        	// A better solution would be to update the image directly via javascript
                        	window.location.href = MY_HOST_URL + data;
                        },
                        error: function(data) {
                            // in case of error the refresh of the page shouldn't be needed,
                        	// it should be enought remove the spinner.
                        	// However, at the moment we force it to be sure
                        	window.location.href = MY_HOST_URL + data;
                            // removeSpinnerAvatar();
                        }
                    });

                });
            }
        });
    }


    return {
        // public functions
        init: function() {
            _initAvatar();
        }
    };
}();


var AccountInfo = function() {
    // Private functions
    var _handleSubmitForm = function (){
    	var validation;
        var form = KTUtil.getById('profile_form');

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validation = FormValidation.formValidation(
			form,
			{
				fields: {
					firstname: {
						validators: {
							notEmpty: {
								message: '- Firstname is required'
							},
							stringLength: {
		                        max: 45,
		                        message: '- Maximum 45 characters'
		                    },
						}
					},
					lastname: {
						validators: {
							notEmpty: {
								message: '- Lastname is required'
							},
							stringLength: {
		                        max: 45,
		                        message: '- Maximum 45 characters'
		                    },
						}
					},
					email: {
                        validators: {
							notEmpty: {
								message: '- Email address is required'
							},
							emailAddress: {
	                            message: '- Invalid email address'
	                        },
						}
					},
                    
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);
        
        $("#form_submit").click(function() {
            validation.validate().then(function(status) {
                if (status == 'Valid') {
                    form.submit();
                } else {
                    MessageUtil.showValidationErrorMessage();
                }
            });
        });     
    }

    return {
        // public functions
        init: function() {
            _handleSubmitForm();
        }
    };
}();

jQuery(document).ready(function() {
	AccountInfo.init();
    Avatar.init();
    
    if($("#confirm_crud_operation").val() == 'update_succeeded') {
		MessageUtil.showMessage("success",false,"flaticon2-checkmark","Update successful")
	}	
	if($("#confirm_crud_operation").val() == 'update_failed') {
		MessageUtil.showMessage("danger",false,"flaticon-exclamation","Update failed")
	}
});