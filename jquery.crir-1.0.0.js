/*
    CRIR - Checkbox & Radio Input Replacement
    jQuery version 1.0.0
    Author: tcpiptan (http://ptan.info/)
    
    2011/12/28 - version: 1.0.0
*/
/*
    CRIR - Checkbox & Radio Input Replacement
    Author: Chris Erwin (me[at]chriserwin.com)
    www.chriserwin.com/scripts/crir/

    Updated July 27, 2006.
    Jesse Gavin added the AddEvent function to initialize
    the script. He also converted the script to JSON format.

    Updated July 30, 2006.
    Added the ability to tab to elements and use the spacebar
    to check the input element. This bit of functionality was
    based on a tip from Adam Burmister.
*/
(function($) {
    $.fn.crir = function() {
        return this.each(function(i, obj) {
            var id = $(obj).attr('for');

            $('#'+id).each(function(j, targetObj) {
                if ($(targetObj).hasClass('crirHiddenJS')) {
                    $(targetObj).addClass('crirHidden');
                    $(targetObj).removeClass('crirHiddenJS');
                    var type = $(targetObj).attr('type');
                    if (type == 'checkbox') {
                        $(targetObj).click(function() {
                            var targetLabel = $(this).attr('id');
                            $('label[for='+targetLabel+']').each(function(k, labelObj) {
                                if ($(labelObj).hasClass('checkbox_checked')) {
                                    $(targetObj).removeAttr('checked');
                                    $(labelObj).addClass('checkbox_unchecked');
                                    $(labelObj).removeClass('checkbox_checked');
                                }
                                else {
                                    $(targetObj).attr('checked', 'checked');
                                    $(labelObj).addClass('checkbox_checked');
                                    $(labelObj).removeClass('checkbox_unchecked');
                                }
                            });
                        });
                    }
                    else if (type == 'radio') {
                        $(targetObj).click(function() {
                            var targetLabel = $(this).attr('id');
                            var targetName  = $(this).attr('name');
                            $('input[type=radio]')
                                .filter(function() {return $(this).attr('name') == targetName;})
                                .map(function() {return $(this).attr('id');})
                                .each(function(k, val) {
                                    $('label[for='+val+']').each(function() {
                                        $(this).removeAttr('checked');
                                        $(this).addClass('radio_unchecked');
                                        $(this).removeClass('radio_checked');
                                    });
                                });
                            $('label[for='+targetLabel+']').each(function() {
                                $(this).attr('checked', 'checked');
                                $(this).addClass('radio_checked');
                                $(this).removeClass('radio_unchecked')
                            });
                        });
                    }
                }
            });
        });
    };
})(jQuery);

jQuery(function() {
    jQuery('input[type=checkbox]').each(function(i, cbObj) {
        var id = jQuery(cbObj).attr('id');
        
        if (jQuery(cbObj).attr('checked')) {
            jQuery('label[for='+id+']').each(function(j, labelObj) {
                jQuery(labelObj).addClass('checkbox_checked');
            });
        }
        else {
            jQuery('label[for='+id+']').each(function(j, labelObj) {
                jQuery(labelObj).addClass('checkbox_unchecked');
            });
        }
    });
    jQuery('input[type=radio]').each(function(i, cbObj) {
        var id = jQuery(cbObj).attr('id');
        
        if (jQuery(cbObj).attr('checked')) {
            jQuery('label[for='+id+']').each(function(j, labelObj) {
                jQuery(labelObj).addClass('radio_checked');
            });
        }
        else {
            jQuery('label[for='+id+']').each(function(j, labelObj) {
                jQuery(labelObj).addClass('radio_unchecked');
            });
        }
    });
    jQuery('label[for]').crir();
});
