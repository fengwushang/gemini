<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>JQuery实例 - 生成年月日</title>
 <meta http-equiv="content-type" content="text/html; charset=gbk">
<script type="text/javascript" src="jquery-1.3.1.js"></script>
<script type="text/javascript">
 
$(document).ready(function(){
 var $day1 = $("#day1"); 
 var $month1 = $("#month1"); 
 var $year1 = $("#year1"); 
 <!--出始化年-->
 var dDate = new Date();
 var dCurYear = dDate.getFullYear();
 var str="";
 for(var i=dCurYear-20;i<dCurYear+1;i++)
 {
    if(i==dCurYear){
   str="<option value="+i+" selected=true>"+i+"</option>";
    }else{
   str="<option value="+i+">"+i+"</option>";
    }
    $year1.append(str);
 }

 <!--出始化月-->
 for(var i=1;i<=12;i++){
 
  if(i==(dDate.getMonth()+1))
  {
    str="<option value="+i+" selected=true>"+i+"</option>";
  }else{
    str="<option value="+i+">"+i+"</option>";
  }
  $month1.append(str);
 }
  <!--调用函数出始化日-->
  TUpdateCal($("#year1").val(),$("#month1").val());
 });

 <!--根据年月获取当月最大天数-->
 function TGetDaysInMonth(iMonth, iYear) {
  var dPrevDate = new Date(iYear, iMonth, 0);
  return dPrevDate.getDate();
 }

 function TUpdateCal(iYear, iMonth) {
  var dDate=new Date();
  daysInMonth = TGetDaysInMonth(iMonth, iYear);
  $("#day1").empty();
  for (d = 1; d <= parseInt(daysInMonth); d++) {

  if(d==dDate.getDate()){
   str="<option value="+d+" selected=true>"+d+"</option>";
  }else{
     str="<option value="+d+">"+d+"</option>";
  }
  $("#day1").append(str);
 }
}

</script>

</head>
<body>
<form name="ymd">
<select id="year1" onChange="TUpdateCal(ymd.year1.value,ymd.month1.value)">   
               
</select>年    
<select id="month1" onChange="TUpdateCal(ymd.year1.value,ymd.month1.value)" >   
             
</select>月    
<select id="day1"> 
   
</select>日
</form>
</body>
</html>