    var nm_block_delay=false;
    var nm_block_area=false;
    var nm_delay=30;
    var nm_random_starting=true

    var nm_empty_zones=[0,0,0];
	try{
    if (jQuery('#nm_zone_inner_1')[0].innerHTML.indexOf("bannerid=0") > 0){
        nm_empty_zones[0]=1;
    }
	}catch(error){}
	
	try{
    if (jQuery('#nm_zone_inner_2')[0].innerHTML.indexOf("bannerid=0") > 0){
        nm_empty_zones[1]=1;
    }
	}catch(error){}

        try{
    if (jQuery('#nm_zone_inner_3')[0].innerHTML.indexOf("bannerid=0") > 0){
        nm_empty_zones[2]=1;
    }
        }catch(error){}


    var elements = document.getElementsByClassName("nm_zones");
    nm_num_ads=elements.length;
    nm_number_of_zones=elements.length;
    nm_number_active_zones=nm_empty_zones.reduce(function(total,x){return x==0 ? total+1 : total}, 0);

    if(nm_number_active_zones<=1){
        nm_block_delay=true;
    }

    if(nm_random_starting==true){
        nm_inicial_ads=Math.floor(Math.random() * nm_number_of_zones) + 1;
    }else{
        nm_inicial_ads=1;
    }


    var nm_scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var nm_body = document.body,
       nm_html = document.documentElement;
    var nm_height = Math.max( nm_body.scrollHeight, nm_body.offsetHeight, nm_html.clientHeight, nm_html.scrollHeight, nm_html.offsetHeight );
    var nm_distancia=(nm_height/nm_number_active_zones);
    nm_scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    nm_offsetTop1=document.querySelector('#nm_zone_1').getBoundingClientRect().top + nm_scrollTop;

    var nm_rango=[];
    for (i = 0; i <= nm_number_active_zones; i++) { 
        nm_rango[i]=nm_distancia*i;
    }

    nm_activate_ads_pos(nm_inicial_ads,nm_number_of_zones);

    window.onresize = function(event) {
        nm_scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        nm_offsetTop1=document.querySelector('#nm_zone_1').getBoundingClientRect().top + nm_scrollTop;
        nm_activate_ads_pos(nm_active_pos,nm_number_of_zones);
    };


    nm_actual_position=1;
    window.onscroll = nm_scroll;

    function nm_scroll () {
        nm_countTime=nm_delay;
        nm_scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        nm_offsetTop1=document.querySelector('#nm_zone_1').getBoundingClientRect().top + nm_scrollTop;
        document.querySelector('#nm_zone_inner_' + nm_active_pos).style.top=Math.max((nm_offsetTop1 - nm_scrollTop),20)  + "px";

        if(nm_block_area==false){
            for (j = 1; j <= nm_number_of_zones; j++) {
                if(nm_scrollTop>=nm_rango[j-1] && nm_scrollTop<nm_rango[j]){
                    if(nm_actual_position==j){
                        if (nm_scrollTop < nm_offsetTop1 ) {
                            document.querySelector('#nm_zone_inner_' + nm_active_pos).style.top=Math.max((nm_offsetTop1 - nm_scrollTop),20)  + "px";
                        }
                    }else{
                        nm_pos_to_active=next_ads_pos(nm_active_pos, nm_num_ads);
                        document.querySelector('#nm_zone_inner_' + j).removeAttribute("style");
                        nm_activate_ads_pos(nm_pos_to_active,nm_number_of_zones);
                        nm_actual_position=j;
                    }
                }
            }
        }
    }


    var nm_countTime;
    var nm_windowTimer = null
	
	//window.onload = nm_startDelay(nm_delay);
	
    function nm_slowDownDelay(thatImg)
    {    
        
        nm_countTime=nm_delay*4;
        jQuery('#nm_zone_inner_' + nm_active_pos).animate({opacity: '1'},500);
        
    }  

    function nm_speedUpDelay()
    {
        nm_countTime=nm_delay;
    }  


    function nm_startDelay(nm_delay)
    {    
        if(!nm_block_delay){
            nm_countTime = nm_delay;
			nm_windowTimer = setInterval(function() {nm_count();}, 500);
        }
    }  


   function nm_count()
   {
        nm_countTime=nm_countTime-0.5;
        if (nm_countTime == 0.5)
        {   
            jQuery('#nm_zone_inner_' + nm_active_pos).animate({opacity: '0.2'},500);
        }
        if (nm_countTime == 0)
        {   
            clearInterval(nm_windowTimer);
            nm_countTime = nm_delay;
            creative_action_start(nm_countTime);
        }
    }

    function creative_action_start(nm_delay){
        nm_pos_to_active=next_ads_pos(nm_active_pos, nm_num_ads);
        nm_activate_ads_pos(nm_pos_to_active,nm_num_ads);
        nm_startDelay(nm_delay);
    }


    function find_next_active_pos(active_ads_pos, nm_num_ads){
        
        active=active_ads_pos;
        if(nm_empty_zones[active-1]===0){
            return active;
        } else if(nm_empty_zones.indexOf(0) == -1)
        {
            return active;
        }
        else
        {
            if (nm_empty_zones.indexOf(0,active-1)===-1){
                return nm_empty_zones.indexOf(0) + 1;
            }else{
                return nm_empty_zones.indexOf(0,active-1) + 1;
            }
        }
    }




    function nm_activate_ads_pos(nm_pos_to_active, nm_num_ads){

        nm_pos_to_active=find_next_active_pos(nm_pos_to_active, nm_num_ads);
        
        for (i = 1; i <= nm_num_ads; i++) { 
            if(i!=nm_pos_to_active){
                document.querySelector('#nm_zone_inner_' + i).removeAttribute("style");
                document.querySelector('#nm_zone_inner_' + i).style.opacity="0";
                document.querySelector('#nm_zone_inner_' + i).style.display="none";

            }else{
                //console.log("Cambia " + nm_pos_to_active);
                jQuery('#nm_zone_inner_' + nm_pos_to_active).animate({opacity: '1'},500);
                document.querySelector('#nm_zone_inner_' + nm_pos_to_active).removeAttribute("style");
                document.querySelector('#nm_zone_inner_' + nm_pos_to_active).style.opacity="0";
                document.querySelector('#nm_zone_inner_' + nm_pos_to_active).style.zIndex="20";
                document.querySelector('#nm_zone_inner_' + nm_pos_to_active).style.position="fixed";
                
                document.querySelector('#nm_zone_inner_' + nm_pos_to_active).style.top=Math.max((nm_offsetTop1 - nm_scrollTop),20)  + "px";
            }
        }
        nm_active_pos=nm_pos_to_active;
    }



      function next_ads_pos(nm_active_ads_pos, nm_num_ads){
            return (nm_active_ads_pos%nm_num_ads) + 1;
      }
	  
	jQuery(document).ready(nm_startDelay(nm_delay));
