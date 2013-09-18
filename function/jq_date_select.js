jquery年月日三级无刷新联动[可兼容IE9]

js文件：

/*

 * jQuery Date Selector Plugin

 * 日期联动选择插件

 * Copyright (c) 2008-2012 QESEN.NET

 * Demo:

        $("#dateSelector").DateSelector({

                ctlYearId: <年控件id>,

                ctlMonthId: <月控件id>,

                ctlDayId: <日控件id>,

                defYear: <默认年>,

                defMonth: <默认月>,

                defDay: <默认日>,

                minYear: <最小年|默认为1882年>,

                maxYear: <最大年|默认为本年>

        });


   HTML:<SELECT id=idYear></SELECT>年 <SELECT id=idMonth></SELECT>月 <SELECT id=idDay></SELECT>日

 */

(function ($) {

    //SELECT控件设置函数

    function setSelectControl(oSelect, iStart, iLength, iIndex) {

        oSelect.empty();

        for (var i = 0; i < iLength; i++) {

            if ((parseInt(iStart) + i) == iIndex)

                oSelect.append("<option selected='selected' value='" + (parseInt(iStart) + i) + "'>" + (parseInt(iStart) + i) + "</option>");

            else

                oSelect.append("<option value='" + (parseInt(iStart) + i) + "'>" + (parseInt(iStart) + i) + "</option>");

        }

    }


    $.fn.DateSelector = function (options) {

        options = options || {};


        //初始化

        this._options = {

            ctlYearId: null,

            ctlMonthId: null,

            ctlDayId: null,

            defYear: 0,

            defMonth: 0,

            defDay: 0,

            minYear: 1882,

            maxYear: new Date().getFullYear()

        }


        for (var property in options) {

            this._options[property] = options[property];

        }


        this.yearValueId = $("#" + this._options.ctlYearId);

        this.monthValueId = $("#" + this._options.ctlMonthId);

        this.dayValueId = $("#" + this._options.ctlDayId);


        var dt = new Date(),

        iMonth = parseInt(this._options.defMonth),

        iDay = parseInt(this._options.defDay),

        iMinYear = parseInt(this._options.minYear),

        iMaxYear = parseInt(this._options.maxYear);


        this.Year = parseInt(this._options.defYear) || dt.getFullYear();

        this.Month = 1 <= iMonth && iMonth <= 12 ? iMonth : dt.getMonth() + 1;

        this.Day = iDay > 0 ? iDay : dt.getDate();

        this.minYear = iMinYear && iMinYear < this.Year ? iMinYear : this.Year;

        this.maxYear = iMaxYear && iMaxYear > this.Year ? iMaxYear : this.Year;


        //初始化控件

        //设置年

        setSelectControl(this.yearValueId, this.minYear, this.maxYear - this.minYear + 1, this.Year);

        //设置月

        setSelectControl(this.monthValueId, 1, 12, this.Month);

        //设置日

        var daysInMonth = new Date(this.Year, this.Month, 0).getDate(); //获取指定年月的当月天数[new Date(year, month, 0).getDate()]

        if (this.Day > daysInMonth) { this.Day = daysInMonth; };

        setSelectControl(this.dayValueId, 1, daysInMonth, this.Day);


        var oThis = this;

        //绑定控件事件

        this.yearValueId.change(function () {

            oThis.Year = $(this).val();

            setSelectControl(oThis.monthValueId, 1, 12, oThis.Month);

            oThis.monthValueId.change();

        });

        this.monthValueId.change(function () {

            oThis.Month = $(this).val();

            var daysInMonth = new Date(oThis.Year, oThis.Month, 0).getDate();

            if (oThis.Day > daysInMonth) { oThis.Day = daysInMonth; };

            setSelectControl(oThis.dayValueId, 1, daysInMonth, oThis.Day);

        });

        this.dayValueId.change(function () {

            oThis.Day = $(this).val();

        });

    }

})(jQuery);

在调用此js时必须加载jquery-1.4.2.min.js文件。

调动实例：

<script language="javascript" type="text/javascript">

        $(document).ready(function () {

            var myDate = new Date();

            $("#dateSelector").DateSelector({

                    ctlYearId: 'idYear',

                    ctlMonthId: 'idMonth',

                    ctlDayId: 'idDay',

                    defYear: myDate.getFullYear(),

                    defMonth: (myDate.getMonth()+1),

                    defDay: myDate.getDate(),

                    minYear: myDate.getFullYear(),

                    maxYear: (myDate.getFullYear()+1)

            });

        });

</script>

html：

<select id="idYear" name="idYear"></select>年 <select id="idMonth" name="idMonth"></select>月 <select id="idDay" name="idDay"></select>日


在后台调动时用Request通过name取值：

string nian = Request["idYear"].ToString();

string yue = Request["idMonth"].ToString();

string ri = Request["idDay"].ToString();

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