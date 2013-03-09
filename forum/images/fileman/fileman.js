var ie = (document.all)? true:false;

function CheckAll(cb)
{
    var fmobj = window.top.mainfrm.document.frm_main ;
	var count = 0;
	var total_space = 0;
	var num_selected = 0;
	if (typeof(fmobj.dparent) != 'undefined')
		count = 1;

	for (var i=0;i<fmobj.elements.length;i++)
	{
		var e = fmobj.elements[i];
		if ((e.name != 'allbox') && (e.type=='checkbox')) //count the checkbox
			count++;

		if ((e.name != 'allbox') && (e.type=='checkbox') && (!e.disabled)) {			
			e.checked = fmobj.allbox.checked;
			if (e.checked && !isNaN(parseInt(eval('fmobj.size'+count).value)))
				total_space = total_space + parseInt(eval('fmobj.size'+count).value);

			if (ie)	{
				if (e.checked) {					
					hL(e);
					num_selected++;
				}
				else {
					dL(e);
				}
			}
			else {
				if (fmobj.allbox.checked) 
					num_selected++;
			}
		}
	}
	top.mainfrm.show_msg(print_filesize(total_space),num_selected);
}

function outputComma(number) {
    number = '' + number
    if (number.length > 3) {
        var mod = number.length%3;
        var output = (mod > 0 ? (number.substring(0,mod)) : '');
        for (i=0 ; i < Math.floor(number.length/3) ; i++) {
            if ((mod ==0) && (i ==0))
                output+= number.substring(mod+3*i,mod+3*i+3);
            else
                output+= ',' + number.substring(mod+3*i,mod+3*i+3);
        }
        return (output);
    }
    else return number;
}

function print_filesize(size) {	
	var formatted_size = 0;

	if (size > 0)
	    formatted_size = parseInt(size / 1000);
	else 
		return 0;

	if (formatted_size == 0) 
		return size + ' bytes';
	else {		
		return outputComma(formatted_size) + ' kb';
	}
}

function hL(E){
	if (ie)	{
		while (E.tagName!="TR")
		{E=E.parentElement;}
	}
	else {
		while (E.tagName!="TR")
		{E=E.parentNode;}
	}
	E.className = "bg_format";
}

function dL(E){
	if (ie)	{
		while (E.tagName!="TR")
			{E=E.parentElement;}
	}
	else {
		while (E.tagName!="TR")
		{E=E.parentNode;}
	}
	E.className = "text_format";
}

function CheckCheckAll(cb) {
	if (ie) {
		if (cb.checked)
			hL(cb);
		else
			dL(cb);
	}
    var fmobj = window.top.mainfrm.document.frm_main ;
	var TotalBoxes = 0;
	var TotalOn = 0;
	var total_space = 0;
	var count = 0;
	if (typeof(fmobj.dparent) != 'undefined')
		count = 1;
	for (var i=0;i<fmobj.elements.length;i++) {
		var e = fmobj.elements[i];
		if ((e.name != 'allbox') && (e.type=='checkbox')) {
			TotalBoxes++;
			count++;
			if (e.checked) {
				TotalOn++;
				if (!isNaN(parseInt(eval('fmobj.size'+count).value)))
					total_space = total_space + parseInt(eval('fmobj.size'+count).value);
			}
		}
	}
	if (TotalBoxes==TotalOn)
		{fmobj.allbox.checked=true;}
	else
		{fmobj.allbox.checked=false;}
	top.mainfrm.show_msg(print_filesize(total_space),TotalOn);	
}

function check_selected(multi) {
	var fmobj = window.top.mainfrm.document.frm_main ;
	var count = 0;
	var _checked;
   	for (var i=0;i<fmobj.elements.length;i++)
       	{
    	var e = fmobj.elements[i];
		if ((e.name != 'allbox') && (e.type=='checkbox')&& (e.checked)) {
			_checked = true;
			count++;
		}
		if (count>1) {break}
    }
	if (! _checked) {
		if (multi) {return 'Please select the files or directories.';}
		else {return 'Please select a file.';}
	}
	if (count > 1 && multi == false) {
		return 'Can not execute the command because the selected file more than one.'
	}
	return;
}

function init_chmod() {
	var frm = top.bottomfrm.document.frm_footer;
	var u_mod=0,g_mod=0,w_mod =0,a_mod=0;

	if (frm.ar.checked) {a_mod = 4;}
	if (frm.ur.checked) {u_mod = 4;}
	if (frm.gr.checked) {g_mod = 4;}
	if (frm.wr.checked) {w_mod = 4;}

	if (frm.aw.checked) {a_mod += 2;}
	if (frm.uw.checked) {u_mod += 2;}
	if (frm.gw.checked) {g_mod += 2;}
	if (frm.ww.checked) {w_mod += 2;}

	if (frm.ax.checked) {a_mod++;}
	if (frm.ux.checked) {u_mod++;}
	if (frm.gx.checked) {g_mod++;}
	if (frm.wx.checked) {w_mod++;}
	
	frm.txt_input.value = a_mod + '' + u_mod + '' + g_mod + '' + w_mod ;
}

function js_show_chmod(name,perm) {	
   	var fmobj = window.top.mainfrm.document.frm_main ;
	
    for (var i=0;i<fmobj.elements.length;i++) {
    	var e = fmobj.elements[i];
		if (e.checked)
			if (ie)
				dL(e)
		if ((e.name != 'allbox') && (e.type=='checkbox')&&(e.value == name)) {
	    	e.checked = true;
			if (ie)
				hL(e);
		}
        else {
            e.checked = false;
        }
    }
		
	fmobj.status.value  = '<font color=green>chmod of <b>' + name + '</font></b>';	

	js_cmd_chmod();	

	if (perm.length == 16) {
		if (perm.substr(0,1) == 'r') {window.top.bottomfrm.document.frm_footer.ar.checked =true}
		if (perm.substr(1,1) == 'w') {window.top.bottomfrm.document.frm_footer.aw.checked =true}
		if (perm.substr(2,1) == 'x') {window.top.bottomfrm.document.frm_footer.ax.checked =true}
		if (perm.substr(4,1) == 'r') {window.top.bottomfrm.document.frm_footer.ur.checked =true}
		if (perm.substr(5,1) == 'w') {window.top.bottomfrm.document.frm_footer.uw.checked =true}
		if (perm.substr(6,1) == 'x') {window.top.bottomfrm.document.frm_footer.ux.checked =true}
		if (perm.substr(8,1) == 'r') {window.top.bottomfrm.document.frm_footer.gr.checked =true}
		if (perm.substr(9,1) == 'w') {window.top.bottomfrm.document.frm_footer.gw.checked =true}
		if (perm.substr(10,1) == 'x') {window.top.bottomfrm.document.frm_footer.gx.checked =true}
		if (perm.substr(12,1) == 'r') {window.top.bottomfrm.document.frm_footer.wr.checked =true}
		if (perm.substr(13,1) == 'w') {window.top.bottomfrm.document.frm_footer.ww.checked =true}
		if (perm.substr(14,1) == 'x') {window.top.bottomfrm.document.frm_footer.wx.checked =true}
	}
	else {
		if (perm.substr(0,1) == 'r') {window.top.bottomfrm.document.frm_footer.ur.checked =true}
		if (perm.substr(1,1) == 'w') {window.top.bottomfrm.document.frm_footer.uw.checked =true}
		if (perm.substr(2,1) == 'x') {window.top.bottomfrm.document.frm_footer.ux.checked =true}
		if (perm.substr(4,1) == 'r') {window.top.bottomfrm.document.frm_footer.gr.checked =true}
		if (perm.substr(5,1) == 'w') {window.top.bottomfrm.document.frm_footer.gw.checked =true}
		if (perm.substr(6,1) == 'x') {window.top.bottomfrm.document.frm_footer.gx.checked =true}
		if (perm.substr(8,1) == 'r') {window.top.bottomfrm.document.frm_footer.wr.checked =true}
		if (perm.substr(9,1) == 'w') {window.top.bottomfrm.document.frm_footer.ww.checked =true}
		if (perm.substr(10,1) == 'x') {window.top.bottomfrm.document.frm_footer.wx.checked =true}
	}
	init_chmod();		
	top.mainfrm.show_msg('0',1);
}

function check_command() {	
	if (typeof(window.top.mainfrm.frm_main) == 'unknown' || typeof(window.top.mainfrm.document.frm_main) == 'undefined') {
		alert("Please return to main screen and execute the command again");
		return false
	}
	var msg
	var act = new Array(9);
	act[0] = 'cmd_copy';
	act[1] = 'cmd_delete';
	act[2] = 'cmd_move';
	act[3] = 'cmd_chmod';
	act[5] = 'cmd_perl';
	act[6] = 'cmd_tar';
	act[7] = 'cmd_download';
	act[4] = 'cmd_tail';
    act[8] = 'cmd_diff';
	var cmd_do = window.top.bottomfrm.document.frm_footer.cmd_do.value
	for (ii=0; ii< 9; ii++) {
		if (act[ii] == cmd_do) {
			if (cmd_do == 'cmd_tail') {
				if (typeof(window.top.mainfrm.document.frm_main.type) == 'undefined') {msg = check_selected(false)}
			}
            else if (cmd_do == 'cmd_diff') {
				if (typeof(window.top.mainfrm.document.frm_main.type) == 'undefined') {msg = check_selected(false)}
			}
            else if (cmd_do == 'cmd_perl'){
                if (typeof(window.top.mainfrm.document.frm_main.type) == 'undefined') {msg = check_selected(true)}
            }
			else {msg = check_selected(true)}
			if (msg){
				alert(msg)
				return false;
			}
			break
		}
	}	
	if (cmd_do != 'cmd_perl' && cmd_do != 'cmd_uncompress') {msg = top.bottomfrm.check_input();}
	if (msg){
		alert(msg)
		return false;
	}
	if (cmd_do == 'cmd_tar' && typeof(window.top.bottomfrm.document.frm_footer.opt_gz) != 'undefined') {
		if ( window.top.bottomfrm.document.frm_footer.opt_gz.checked) 
			window.top.mainfrm.document.frm_main.opt_gz.value = 1
	}
	
	if (cmd_do == 'cmd_search' || cmd_do == 'cmd_replace') {
		window.top.mainfrm.document.frm_main.scope.value = 0
		if (window.top.bottomfrm.document.frm_footer.scope.selectedIndex == 1) 
			window.top.mainfrm.document.frm_main.scope.value = 1
		
		if (window.top.bottomfrm.document.frm_footer.c_case.checked)
			window.top.mainfrm.document.frm_main.c_case.value = 1
		
		if (window.top.bottomfrm.document.frm_footer.c_regex.checked)
			window.top.mainfrm.document.frm_main.c_regex.value = 1
		
		if (cmd_do == 'cmd_search' && window.top.bottomfrm.document.frm_footer.c_content.checked)
			window.top.mainfrm.document.frm_main.c_content.value = 1

		if (cmd_do == 'cmd_replace') {
			if (window.top.bottomfrm.document.frm_footer.c_word.checked)
				window.top.mainfrm.document.frm_main.c_word.value = 1
			if (window.top.bottomfrm.document.frm_footer.c_bak.checked)
				window.top.mainfrm.document.frm_main.c_bak.value = 1
			window.top.mainfrm.document.frm_main.txt_with.value = window.top.bottomfrm.document.frm_footer.txt_with.value;		
		}
	}
	if (cmd_do == 'cmd_tail') {
		var objtime = window.top.bottomfrm.document.frm_footer.retime.options
		window.top.mainfrm.document.frm_main.retime.value = objtime[objtime.selectedIndex].value
	}
	
	window.top.mainfrm.document.frm_main.cmd_do.value	 = cmd_do;
	window.top.mainfrm.document.frm_main.txt_input.value = window.top.bottomfrm.document.frm_footer.txt_input.value;	
	window.top.mainfrm.document.frm_main.submit();	
	if (cmd_do != 'cmd_tail') {window.top.bottomfrm.document.frm_footer.txt_input.value = '';}
	return false
}


function js_cmd_edit() {
	if (typeof(window.top.mainfrm.frm_main) == 'unknown' || typeof(window.top.mainfrm.document.frm_main) == 'undefined' || typeof(window.top.mainfrm.document.frm_main.main_screen) == 'undefined') {
		alert("Please return to main screen and execute the command again");
		return
	}
	var msg = check_selected(false)
	if (msg) {
		alert(msg)
		return
	}
	window.top.mainfrm.document.frm_main.cmd_do.value = 'cmd_edit';
	window.top.mainfrm.document.frm_main.submit();	
}

function js_cmd_delete() {
	if (typeof(window.top.mainfrm.frm_main) == 'unknown' || typeof(window.top.mainfrm.document.frm_main) == 'undefined' || typeof(window.top.mainfrm.document.frm_main.main_screen) == 'undefined') {
		alert("Please return to main screen and execute the command again");
		return
	}
	var msg;
	msg = check_selected(true);
	if (msg) {
		alert(msg);
		return
	}
	if (confirm('Do you really want to delete the selected files and directories?')) {
		window.top.mainfrm.document.frm_main.cmd_do.value = 'cmd_delete';
		window.top.mainfrm.document.frm_main.submit();
	}
}

function js_run_command (){ 
    var msg;
    if (typeof(window.top.mainfrm.document.frm_main.type) == 'undefined') {msg = check_selected(false)}
    if (msg){
				alert(msg)
				return false;
			}
    window.top.mainfrm.document.frm_main.cmd_do.value	 = window.top.bottomfrm.document.frm_footer.cmd_do.value;
	window.top.mainfrm.document.frm_main.txt_input.value = window.top.bottomfrm.document.frm_footer.txt_input.value;	
	window.top.mainfrm.document.frm_main.submit();	
}

function js_cmd_multi_upload() {
	var objmain = top.mainfrm.document.frm_main;
	objmain.cmd_do.value = 'cmd_show'
	objmain.page.value = 'multi_upload.html'
	objmain.submit();
	return
}

function load_progress_bar (pxs,percent,msg) {
	if (ie) {
		var img = window.top.bottomfrm.document.images.progess;
		if (typeof(img) != 'undefined') {
			var wimg = img.width;
			img.width = Number(pxs);
			if (pxs == '-1' || img.width>500 ) {
				img.width = 496;
				window.top.bottomfrm.document.frm.percent.value = "100%"
				window.top.bottomfrm.document.frm.msg.value = "The selected files has been copied"
			} else { 		
				window.top.bottomfrm.document.frm.percent.value = percent + '%'
				window.top.bottomfrm.document.frm.msg.value = "Processing... "+msg
			}
		}
	} else {
		window.top.bottomfrm.document.frm.msg.value = msg
	}
}

function additem(objright,objleft,flag){
//--------------------------------
	if (flag == 1) {// add all
		var src  = eval(objleft);
		var rows = src.options.length
		for (ii=1; ii< rows ; ii++) {
			moveitem(eval(objleft),eval(objright),1);		
		}
	}
	else 
		moveitem(eval(objleft),eval(objright));	
}

function removeitem(objright,objleft,flag){
//------------------------------------
	if (flag == 1) {// move all
		var src  = eval(objright);
		var rows = src.options.length
		for (ii=1; ii< rows ; ii++) {
			moveitem(eval(objright),eval(objleft),1);	
		}
	}
	else 
		moveitem(eval(objright),eval(objleft));	
}

function moveitem (src,tar,index) {
	li_rows  = tar.options.length
	if (index > 0)
		li_index = index
	else 
		li_index = src.selectedIndex
	var objs = 0;

	if (li_index <= 0) {
		alert("Please select an item.")
		return 
	}
	// get value & text from objright
	text = src.options[li_index].text
	value = src.options[li_index].value
		
	// add item into lbleft from lbright.
	if (li_rows==0) {
		tar.options[0] = new Option(text,value);
	} else {
		tar.options[li_rows] = new Option(text,value);		
		tar.options[li_rows].selected = true
	}
							
	for (m=src.options.length-1;m>=0;m--) 
	{
		if (src.options[m].value==value) 	src.options[m]=null
	}
}