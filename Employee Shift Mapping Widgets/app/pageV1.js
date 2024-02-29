
var maximumcount=0;
ZOHO.CREATOR.init().then(function (data) {
  getCarerClientFunc().then(carerdata=>{
    // console.log("carerdata:",carerdata);
    CarerDataList=carerdata;
    getEmpFunc().then(dataval => {
      console.log("dataval:",dataval);
      var comparedEmpList=[];
      Employee_Shift_List= dataval;
      var EMPArr=[];
      dataval.forEach(element => {
        const empName = element.EmpName.trim();
        const clientName = element.client.trim();
        var tempemp={
          "carerName":empName,
          "clientName":clientName
        };
        EMPArr.push(tempemp);
      });
      var newArray = filterObjectsByCarerName(EMPArr, carerdata);
      const uniqueData = removeDuplicatesByKey(EMPArr, 'carerName');
      newArray.forEach(carerelement => {
        const empName = carerelement.carerName;
        const tr2 = document.createElement('tr');
        tr2.className = "EMP_tr";
        tr2.innerText =empName;
        const td = document.createElement('td');
        $("#emp_tr").prepend(tr2);
      });
      uniqueData.forEach(Empelement => {
        const empName = Empelement.carerName;
        const tr2 = document.createElement('tr');
        tr2.className = "EMP_tr";
        tr2.innerText =empName;
        const td = document.createElement('td');
        $("#emp_tr").prepend(tr2);
      });
      uniqueData.reverse().forEach(Empelement => {
        const empName = Empelement.carerName;
        const clientName = Empelement.clientName;
        const carefaciName = Empelement.care_facilitator;
        PostShiftFun(dataval,empName,clientName,carefaciName,0,0,0);
      });
      newArray.reverse().forEach(carerelement => {
        const empName = carerelement.carerName;
        PostEmptyShiftFunc(empName);
      });
      var tr1 = document.createElement('div');
      tr1.className = "empty";
      tr1.innerHTML = "Thoughtlogik";
      $("#emp_tr").prepend(tr1);
    });
  });
});
//  **********************************************************************************
// Filter data by carer name and client name starts

var changeEventTriggered = false;
$(document).delegate('.carerdataDD, .clientdataDD, .carefacidataDD', 'change', function(){
  var CarerOptions = $(".carerdataDD").select2('data');
  var carernameValues = CarerOptions.map(function (option) {
    return { carername: option.element.getAttribute('carer_name') };
  });
  var ClientOptions = $(".clientdataDD").select2('data');
  var clientnameValues = ClientOptions.map(function (option) {
    return { clientname: option.element.getAttribute('client_name') };
  });
  var CareFaciOptions = $(".carefacidataDD").select2('data');
  var carefaciValues = CareFaciOptions.map(function (option) {
    return { carefaciname: option.element.getAttribute('care_facilitier_name') };
  });
  var resultData = generateCombinations(carernameValues, clientnameValues, carefaciValues);
  resultData = resultData.filter(function(item) {
    return item.trim() !== '{}';
  });

  if (resultData.length>0)
  {
    changeEventTriggered = false;
    var EMPArr=[];
    Employee_Shift_List.forEach(elementval =>{
      const empName = elementval.EmpName.trim();
      const clientName = elementval.client.trim();
      var care_facilitators=elementval.care_facilitators.trim();
      var tempemp=[];
      tempemp["carerName"]=empName;
      tempemp["clientName"]=clientName;
      tempemp["care_facilitator"]=care_facilitators;
      EMPArr.push(tempemp);
    });

    $(".EMP_tr").remove();
    $(".EMP_tr1").remove();
    $(".empty").remove();
    var uniqueDataArr = [];
    var newCarerArray =[];
    var uniqueDataArrsp=[];

    resultData.forEach(element=>{
      var jsonObject = JSON.parse(element);
      var propertiesToCheckcarefaci = ['carername', 'carefaciname'];
      var propertiesToCheck = ['carername', 'clientname'];
      // **** Carer Data and Care Facilitator data script part ****
      if (checkProperties(jsonObject, propertiesToCheckcarefaci))
      {
        var carerName = jsonObject.carername;
        var carefaciName = jsonObject.carefaciname;
        var keyProperties = ['carerName','clientName','care_facilitator'];
        var uniqueArray = removeDuplicates(EMPArr, keyProperties);
        const uniqueDataFaci = uniqueArray.filter(item => item.carerName === carerName && item.care_facilitator === carefaciName);
        if (uniqueDataFaci.length>0)
        {
          uniqueDataFaci.forEach(element => {
            console.log("uniqueDataFaci element:",element);
            var newspvalue=element.carerData=0;
            var newspvalue=element.clientData=clientName;
            var newspvalue=element.carefaciData=0;
            uniqueDataArr.push(element); 
            uniqueDataArrsp.push(element); 
          });  
        }
        const Carer_Faci_uniqueData = CarerDataList.filter(item => item.care_faci === carefaciName && item.carerName === carerName);
        const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
        if (newCarerArr.length>0)
        {
          newCarerArr.forEach(clientarr=>{
            console.log("clientarr:",clientarr);
            newCarerArray.push(clientarr);
          }); 
        }
      }
      // Carer Data and Care Facilitator data script part ends
      // Carer Name and Client Name script part
      else if (checkProperties(jsonObject, propertiesToCheck))
      {
        var carerName = jsonObject.carername;
        var clientName = jsonObject.clientname;
        var keyProperties = ['carerName', 'clientName'];
        var uniqueArray = removeDuplicates(EMPArr, keyProperties);
        var uniqueDataFaci = uniqueArray.filter(item=> item.carerName === carerName && item.clientName === clientName);
        if (uniqueDataFaci.length>0)
        {
          uniqueDataFaci.forEach(element => {
            console.log("uniqueDataFaci element:",element);
            var newspvalue=element.carerData=carerName;
            var newspvalue=element.clientData=clientName;
            var newspvalue=element.carefaciData=0;
            uniqueDataArr.push(element); 
            uniqueDataArrsp.push(element); 
          });   
        }
        var clientcareruniqueData=removeDuplicates(ClientCarerReportList, keyProperties);
        const Carer_Faci_uniqueData = clientcareruniqueData.filter(item => item.clientName ==clientName && item.carerName === carerName);
        const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
        if (newCarerArr.length>0)
        {
          newCarerArr.forEach(clientarr=>{
            console.log("clientarr:",clientarr);
            newCarerArray.push(clientarr);
          });  
        }
      }
      // Carer Name and Client Name script part ends
      // Carer Name script part
      else if (jsonObject.hasOwnProperty('carername'))
      {
        var carername = jsonObject.carername;
        console.log("carername found:",carername);
        const uniqueDataTemp = removeDuplicatesByKey(EMPArr, 'carerName');
        // console.log("uniqueDataTemp:",uniqueDataTemp);
        var uniqueDataFaci = uniqueDataTemp.filter(item => item.carerName === carername);
        // console.log("uniqueDataFaci:",uniqueDataFaci);
        if (uniqueDataFaci.length>0)
        {
          uniqueDataFaci.forEach(element => {
            console.log("uniqueDataFaci element:",element);
            var newspvalue=element.carerData=carername;
            var newspvalue=element.clientData=0;
            var newspvalue=element.carefaciData=0;
            uniqueDataArr.push(element); 
            uniqueDataArrsp.push(element);
            return false; 
          });  
        }
        const Carer_Faci_uniqueData = CarerDataList.filter(item =>item.carerName === carername);
        const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
        if (newCarerArr.length>0)
        {
          newCarerArr.forEach(clientarr=>{
            console.log("clientarr:",clientarr);
            newCarerArray.push(clientarr);
          }); 
        }
      }
      // Carer Name script part ends
      // Client Name script part
      else if (jsonObject.hasOwnProperty('clientname'))
      {
        var clientName = jsonObject.clientname;
        console.log("clientName:",clientName);
        var keyProperties = ['carerName', 'clientName'];
        var uniqueDataTemp = removeDuplicates(EMPArr, keyProperties);
        const uniqueDataFaci = uniqueDataTemp.filter(item => item.clientName === clientName);
        console.log("uniqueDataFaci:",uniqueDataFaci);
        if (uniqueDataFaci.length>0)
        {
          uniqueDataFaci.forEach(element => {
            console.log("uniqueDataFaci element:",element);
            var newspvalue=element.carerData=0;
            var newspvalue=element.clientData=clientName;
            var newspvalue=element.carefaciData=0;
            uniqueDataArr.push(element); 
            uniqueDataArrsp.push(element); 
          }); 
        }
        // console.log("ClientCarerReportList:",ClientCarerReportList);
        var clientcareruniqueData=removeDuplicates(ClientCarerReportList, keyProperties);
        const Carer_Faci_uniqueData = clientcareruniqueData.filter(item => item.clientName ==clientName);
        const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
        console.log("newCarerArr:",newCarerArr);
        if (newCarerArr.length>0)
        {
          // newCarerArray.length = 0;
          newCarerArr.forEach(clientarr=>{
            console.log("clientarr:",clientarr);
            newCarerArray.push(clientarr);
          });  
        }
      }
      // Client Name script part ends
      // Care facilitator script part
      else if (jsonObject.hasOwnProperty('carefaciname'))
      {
        var carefaciName = jsonObject.carefaciname;
        var keyProperties = ['carerName','clientName','care_facilitator'];
        var uniqueDataTemp = removeDuplicates(EMPArr, keyProperties);
        const uniqueDataFaci = uniqueDataTemp.filter(item => item.care_facilitator === carefaciName);
        if (uniqueDataFaci.length>0)
        {
          uniqueDataFaci.forEach(element => {
            var newspvalue=element.carerData=0;
            var newspvalue=element.clientData=0;
            var newspvalue=element.carefaciData=carefaciName;
            uniqueDataArr.push(element); 
            uniqueDataArrsp.push(element); 
          }); 
        }
        // // console.log("ClientCarerReportList:",ClientCarerReportList);
        var clientcareruniqueData=removeDuplicates(ClientCarerReportList, keyProperties);
        const Carer_Faci_uniqueData = CarerDataList.filter(item => item.care_faci === carefaciName);
        const newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
        if (newCarerArr.length>0)
        {
          // newCarerArray.length = 0;
          newCarerArr.forEach(clientarr=>{
            newCarerArray.push(clientarr);
          });  
        }
      }
      // Care facilitator script part ends
    });
    const newCarerArrVal=filterObjectsByCarerName(uniqueDataArrsp, newCarerArray);
    if (uniqueDataArr.length > 0)
    {
      // Call the function to group items by carerName
      var result = groupByCarerName(uniqueDataArrsp);
      // Display the result
      uniqueDataArr = Object.keys(result);
      if (newCarerArrVal.length>0)
      {
        newCarerArrVal.forEach(carerelement => {
          const empName = carerelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
      }
      uniqueDataArr.forEach(Empelement => {
        const empName = Empelement;
        const tr2 = document.createElement('tr');
        tr2.className = "EMP_tr";
        tr2.innerText =empName;
        const td = document.createElement('td');
        $("#emp_tr").prepend(tr2);
      });
      uniqueDataArr.reverse().forEach(Empelement => {
        PostShiftFunsp(Employee_Shift_List,Empelement,result);
      });
      if (newCarerArrVal.length>0)
      {
        newCarerArrVal.reverse().forEach(carerelement => {
          PostEmptyShiftFunc(carerelement.carerName);
        });
      }
    }
    else
    {
      if (newCarerArrVal.length>0)
      {
        newCarerArrVal.forEach(carerelement => {
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =carerelement.carerName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        newCarerArray.reverse().forEach(carerelement => {
          PostEmptyShiftFunc(carerelement.carerName);
        });
      }
      else
      {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "No Records Found",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  }
  else
  {
    if (!changeEventTriggered) {
      $(".EMP_tr").remove();
      $(".EMP_tr1").remove();
      $(".empty").remove();
      console.log("No data selected");
      getEmpFunc().then(dataval => {
        var comparedEmpList=[];
        Employee_Shift_List= dataval;
        var EMPArr=[];
        dataval.forEach(element => {
          var tempemp={
            "carerName":element.EmpName.trim(),
            "clientName":element.client.trim()
          };
          EMPArr.push(tempemp);
        });
        var newArray = filterObjectsByCarerName(EMPArr, CarerDataList);
        const uniqueData = removeDuplicatesByKey(EMPArr, 'carerName');
        newArray.forEach(carerelement => {
          const empName = carerelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueData.forEach(Empelement => {
          const empName = Empelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueData.reverse().forEach(Empelement => {
          const empName = Empelement.carerName;
          const clientName = Empelement.clientName;
          const carefaciName = Empelement.care_facilitator;
          PostShiftFun(dataval,empName,clientName,carefaciName,0,0,0);
        });
        newArray.reverse().forEach(carerelement => {
          const empName = carerelement.carerName;
          PostEmptyShiftFunc(empName);
        });
        var tr1 = document.createElement('div');
        tr1.className = "empty";
        tr1.innerHTML = "Thoughtlogik";
        $("#emp_tr").prepend(tr1);
      });

      changeEventTriggered = true;
    }
  }
  var tr1 = document.createElement('div');
  tr1.className = "empty";
  tr1.innerHTML = "Thoughtlogik";
  $("#emp_tr").prepend(tr1);
});

$(document).delegate('.flt_btn', 'click', function(){
  var carerData=$("#dropdownname_cr option:selected").attr("carer_name") ||0;
  var clientData=$("#dropdownname_cl option:selected").attr("client_name") ||0;
  var carefacilitatorData=$("#dropdownname_cf option:selected").attr("care_facilitier_name") ||0;
  console.log("Employee_Shift_List:",Employee_Shift_List);
  console.log("CarerDataList:",CarerDataList);
  if (carerData != 0 || clientData != 0 || carefacilitatorData !=0)
  {
    $(".EMP_tr").remove();
    $(".EMP_tr1").remove();
    $(".empty").remove();
    if (Employee_Shift_List.length>0)
    {
      var EMPArr=[];
      Employee_Shift_List.forEach(elementval =>{
        const empName = elementval.EmpName.trim();
        const clientName = elementval.client.trim();
        var care_facilitators=elementval.care_facilitators.trim();
        var tempemp=[];
        tempemp["carerName"]=empName;
        tempemp["clientName"]=clientName;
        tempemp["care_facilitator"]=care_facilitators;
        EMPArr.push(tempemp);
      });
      var uniqueDataFaci = 0;
      var newCarerArr =0;

      if (carefacilitatorData !=0 && clientData != 0)
      {
        console.log("*******");
        var keyProperties = ['carerName', 'care_facilitator'];
        var uniqueArray = removeDuplicates(EMPArr, keyProperties);
      }
      // Filter based on carefacilitator and carer name
      else if (carefacilitatorData !=0 && carerData != 0)
      {
        var keyProperties = ['carerName', 'care_facilitator'];
        var uniqueArray = removeDuplicates(EMPArr, keyProperties);
        uniqueDataFaci = uniqueArray.filter(item => item.carerName === carerData && item.care_facilitator === carefacilitatorData);
        const Carer_Faci_uniqueData = CarerDataList.filter(item => item.care_faci === carefacilitatorData && item.carerName === carerData);
        newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
      }
      else if (carerData != 0 && clientData != 0)
      {
        var keyProperties = ['carerName', 'clientName'];
        var uniqueArray = removeDuplicates(EMPArr, keyProperties);
        console.log("uniqueArray:",uniqueArray);
        // Function to filter the array based on carerName and clientName
        function filterArrayByName(carerName, clientName) {
          return uniqueArray.filter(function(item) {
            return item.carerName === carerName && item.clientName === clientName;
          });
        }
        uniqueDataFaci = filterArrayByName(carerData,clientData);
        const Carer_Faci_uniqueData = CarerDataList.filter(item =>item.carerName === carerData);
        newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
        console.log("newCarerArr:",newCarerArr);
      }
      else if (carerData != 0)
      {
        const uniqueDataTemp = removeDuplicatesByKey(EMPArr, 'carerName');
        console.log("uniqueDataTemp:",uniqueDataTemp);
        uniqueDataFaci = uniqueDataTemp.filter(item => item.carerName === carerData);
        // console.log("uniqueData:",uniqueData);
        const Carer_Faci_uniqueData = CarerDataList.filter(item =>item.carerName === carerData);
        newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
        console.log("newCarerArr:",newCarerArr);
      }
      else if (clientData != 0)
      {
        var keyProperties = ['carerName', 'clientName'];
        var uniqueDataTemp = removeDuplicates(EMPArr, keyProperties);
        uniqueDataFaci = uniqueDataTemp.filter(item => item.clientName === clientData);
        var clientcareruniqueData=removeDuplicates(ClientCarerReportList, keyProperties);
        const Carer_Faci_uniqueData = clientcareruniqueData.filter(item => item.clientName ==clientData);
        newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
      }

      // Filter based on carefacilitator only
      else if (carefacilitatorData !=0)
      {
        var keyProperties = ['carerName', 'care_facilitator'];
        var uniqueArray = removeDuplicates(EMPArr, keyProperties);
        uniqueDataFaci = uniqueArray.filter(item => item.care_facilitator === carefacilitatorData);
        const Carer_Faci_uniqueData = CarerDataList.filter(item => item.care_faci === carefacilitatorData);
        newCarerArr=filterObjectsByCarerName(uniqueDataFaci, Carer_Faci_uniqueData);
      }
      // Script part to Append Data to UI part
      if (uniqueDataFaci.length > 0)
      {
        console.log("*****************************");
        if (newCarerArr.length>0)
        {
          newCarerArr.forEach(carerelement => {
            const empName = carerelement.carerName;
            const tr2 = document.createElement('tr');
            tr2.className = "EMP_tr";
            tr2.innerText =empName;
            const td = document.createElement('td');
            $("#emp_tr").prepend(tr2);
          });
        }
        uniqueDataFaci.forEach(Empelement => {
          const empName = Empelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueDataFaci.reverse().forEach(Empelement => {
          const empName = Empelement.carerName;
          const clientName = Empelement.clientName;
          const carefaciName = Empelement.care_facilitator;
          PostShiftFun(Employee_Shift_List,empName,clientName,carefaciName,carerData,clientData,carefacilitatorData);
        });
        if (newCarerArr.length>0)
        {
          newCarerArr.reverse().forEach(carerelement => {
            const empName = carerelement.carerName;
            PostEmptyShiftFunc(empName);
          });
        }
      }
      else
      {
        console.log("newCarerArrInside:",newCarerArr);
        console.log("****** no record found ******");
        if (newCarerArr.length>0)
        {
          newCarerArr.forEach(carerelement => {
            const empName = carerelement.carerName;
            const tr2 = document.createElement('tr');
            tr2.className = "EMP_tr";
            tr2.innerText =empName;
            const td = document.createElement('td');
            $("#emp_tr").prepend(tr2);
          });
          newCarerArr.reverse().forEach(carerelement => {
            const empName = carerelement.carerName;
            PostEmptyShiftFunc(empName);
          });
        }
        else
        {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "No Records Found",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    }
    var tr1 = document.createElement('div');
    tr1.className = "empty";
    tr1.innerHTML = "Thoughtlogik";
    $("#emp_tr").prepend(tr1);
  }
});
// Filter Reset button script
$(document).delegate('.resetfilter', 'click', function(){
  console.log("resetfilter button clicked");
  $("#dropdownname_cr").val(0);
  $("#dropdownname_cl").val(0);
  $("#dropdownname_cf").val(0);
  $(".EMP_tr").remove();
  $(".empty").remove();
  $(".EMP_tr1").remove();
  getEmpFunc().then(dataval => {
    var comparedEmpList=[];
    console.log("dataval:",dataval);
    Employee_Shift_List= dataval;
    var EMPArr=[];
    dataval.forEach(element => {
      const empName = element.EmpName.trim();
      const clientName = element.client.trim();
      var tempemp={
        "carerName":empName,
        "clientName":clientName
      };
      EMPArr.push(tempemp);
    });
    var carerdata=CarerDataList;
    var newArray = filterObjectsByCarerName(EMPArr, carerdata);
    const uniqueData = removeDuplicatesByKey(EMPArr, 'carerName');
    newArray.forEach(carerelement => {
      const empName = carerelement.carerName;
      const tr2 = document.createElement('tr');
      tr2.className = "EMP_tr";
      tr2.innerText =empName;
      const td = document.createElement('td');
      $("#emp_tr").prepend(tr2);
    });
    uniqueData.forEach(Empelement => {
      const empName = Empelement.carerName;
      const tr2 = document.createElement('tr');
      tr2.className = "EMP_tr";
      tr2.innerText =empName;
      const td = document.createElement('td');
      $("#emp_tr").prepend(tr2);
    });
    uniqueData.reverse().forEach(Empelement => {
      const empName = Empelement.carerName;
      const clientName = Empelement.clientName;
      const carefaciName = Empelement.care_facilitator;
      PostShiftFun(dataval,empName,clientName,carefaciName,0,0,0);
    });
    newArray.reverse().forEach(carerelement => {
      const empName = carerelement.carerName;
      PostEmptyShiftFunc(empName);
    });
    var tr1 = document.createElement('div');
    tr1.className = "empty";
    tr1.innerHTML = "Thoughtlogik";
    $("#emp_tr").prepend(tr1);
  });
});
// Filter Reset button script ends

// ************************************************************************************

// Popup Window Script part starts
var popup = document.querySelector('.overlay');
$(document).delegate('.empdiv', 'click', function(){
  var sh_attributeValue = this.getAttribute("shift_name");
  $('#dropdownname_sht').val(sh_attributeValue);
  var p_attributeValue = this.getAttribute("present_date");
  var change_frm = moment(p_attributeValue).format("YYYY-MM-DD");
  $('#st_date_emp').val(change_frm);
  $('#ed_date_emp').val(change_frm);
  const cl_name = this.getAttribute("client_name");
  const cr_name = this.getAttribute("carer_name");
  $("#dropdownname_cl_popup").val(cl_name);
  $("#dropdownname_cr_popup").val(cr_name);
  var sud_id = this.getAttribute("sub_ID");
  $('#recid').val(sud_id);
  Onloadfilter(cl_name,sh_attributeValue,cr_name);
  popup.style.display = 'block';
  var shiftname= this.getAttribute("shift_name");
  // console.log("hk",shiftname);
  if(shiftname=="+")
  {
    const carer_name = this.getAttribute("carer_name");
    var per_attributeValue = this.getAttribute("present_date");
    config_val = {
      appName : "hcd-admin",
      reportName : "Shift_Report", 
      criteria : '(CarerName =="'+carer_name+'" && Start_Date =="'+per_attributeValue+'"&& End_Date == "'+per_attributeValue+'")',
    page : 1,
    pageSize : 10
    }
    console.log(config_val);  
    ZOHO.CREATOR.API.getAllRecords(config_val).then(function(response){
      console.log(response);
      if(response.code == 3000){
        var carer_ID = response.data[0].ID;
        $('#Emp_recid').val(carer_ID);
      }
    });
  }
  else{
    $('#Emp_recid').val('0');
  }
});

$(document).delegate('.empbtn', 'click', function(){

  $('#Emp_recid').val("");
  var sh_attributeValue = this.getAttribute("shift_name");
  $('#dropdownname_sht').val(sh_attributeValue);
  var p_attributeValue = this.getAttribute("present_date");
  var change_frm = moment(p_attributeValue).format("YYYY-MM-DD");
  $('#st_date_emp').val(change_frm);
  $('#ed_date_emp').val(change_frm);
  const cl_name = this.getAttribute("client_name");
  const cr_name = this.getAttribute("carer_name");
  $("#dropdownname_cl_popup").val(cl_name);
  $("#dropdownname_cr_popup").val(cr_name);
  var sud_id = this.getAttribute("sub_ID");
  $('#recid').val(sud_id);
  Onloadfilter(cl_name,sh_attributeValue,cr_name);
  popup.style.display = 'block';
  var shiftname= this.getAttribute("shift_name");
  console.log(shiftname);
  if(shiftname == null)
  {
    const carer_name = this.getAttribute("carer_name");
    var per_attributeValue = this.getAttribute("present_date");
    config_val = {
      appName : "hcd-admin",
      reportName : "Shift_Report", 
      criteria : '(CarerName =="'+carer_name+'" && Start_Date =="'+per_attributeValue+'"&& End_Date == "'+per_attributeValue+'")',
    page : 1,
    pageSize : 10
    }
    console.log(config_val);  
    ZOHO.CREATOR.API.getAllRecords(config_val).then(function(response){
      console.log(response);
      if(response.code == 3000){
        var carer_ID = response.data[0].ID;
        $('#Emp_recid').val(carer_ID);
      }
    });
  }
  else{
    $('#Emp_recid').val('0');
  }
});

$(".close").click(function(){
  popup.style.display = 'none';
});
// Popup Window Script part ends

// ************************************************************************************

// Page popup script save button part starts
$(document).delegate('.btn-sve', 'click', function(){
  console.log("save button clicked");
  // ****** dropdown value ******
  var carerData=$("#dropdownname_cr option:selected").attr("carer_name") ||0;
  var clientData=$("#dropdownname_cl option:selected").attr("client_name") ||0;
  var carefacilitatorData=$("#dropdownname_cf option:selected").attr("care_facilitier_name") ||0;
  // ****** dropdown value ******
  var st_date = $("#st_date_emp").val();
  var ed_date = $("#ed_date_emp").val();
  var s_date = moment(st_date).format("YYYY-MM-DD");
  var e_date = moment(ed_date).format("YYYY-MM-DD");
  const date1 = new Date(s_date);
  const date2 = new Date(e_date);
  const differenceMs = Math.abs(date2 - date1);
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.floor(differenceMs / millisecondsInDay);
  var subformID = $("#recid").val() || 0;
  var mainform_ID = $("#Emp_recid").val() || 0;
  console.log("subformID:",subformID,"Emp ID:",mainform_ID);

  // ***** Popup data *****
  var client_id = $("#dropdownname_cl_popup option:selected").attr("cl_rec_id");                                                                             
  var carer_id =  $("#dropdownname_cr_popup option:selected").attr("cr_rec_id");
  var Shift_start = $("#st_date_emp").val();
  var Shift_end =  $("#ed_date_emp").val();
  // console.log("Shift_end",Shift_end)
  var Shift_id =  $("#dropdownname_sht option:selected").attr("shift_rec_id");
  // ***** Popup data *****

  if(mainform_ID == 0 && subformID == 0)
  {
    var lineItems =[];
    var lineItem = {Clients:client_id,Shift:Shift_id};
    lineItems.push(lineItem);
    console.log("lineItems:",lineItems);
    formData = {
      "data" : {
      "Carers": carer_id,
      "Start_Date":moment(Shift_start).format("DD-MMM-YYYY"),
      "End_Date":moment(Shift_end).format("DD-MMM-YYYY"),
      "Shift_Assign":lineItems
      }
    };
    console.log("formData:",formData);
    CreateEmpShiftFunc(formData).then(empshiftResp=>{
      console.log("empshiftResp",empshiftResp);
      if (empshiftResp == 3000)
      {
        Swal.fire({
          title: "Record added successfully",
          icon: "success",
          showConfirmButton :false,
          timer: 1000
        });
      }
      else
      {
        Swal.fire({
          title: "Record not added successfully",
          icon: "error",
          showConfirmButton :false,
          timer: 1000
        });
      }
      var popup = document.querySelector('.overlay');
      popup.style.display = 'none';
      $(".EMP_tr").remove();
      $(".EMP_tr1").remove();
      $(".empty").remove();
      FilterSPFunc(carerData,clientData,carefacilitatorData);
    });
  }
  else if (daysDifference > 0)
  {
    console.log("daysDifference found");
    var lineItems =[];
    var lineItem = {Clients:client_id,Shift:Shift_id};
    lineItems.push(lineItem);
    formData = {
      "data" : {
        "Carers": carer_id,
        "Start_Date":moment(Shift_start).format("DD-MMM-YYYY"),
        "End_Date":moment(Shift_end).format("DD-MMM-YYYY"),
        "Shift_Assign":lineItems
      }
    };
    CreateEmpShiftFunc(formData).then(empshiftResp=>{
      console.log("empshiftResp",empshiftResp);
      if (empshiftResp == 3000)
      {
        Swal.fire({
          title: "Record added successfully",
          icon: "success",
          showConfirmButton :false,
          timer: 1000
        });
      }
      else
      {
        Swal.fire({
          title: "Record not added successfully",
          icon: "error",
          showConfirmButton :false,
          timer: 1000
        });
      }
      var popup = document.querySelector('.overlay');
      popup.style.display = 'none';
      $(".EMP_tr").remove();
      $(".EMP_tr1").remove();
      $(".empty").remove();
      FilterSPFunc(carerData,clientData,carefacilitatorData);
    });
  }
  else if (subformID !=0)
  {
    console.log("daysDifference not found");
    formData = {
      "data" : {
        "Clients": client_id,
        "Shift": Shift_id
      }
    };
    UpdateShiftAssignFunc(formData,subformID).then(shiftassignResp=>{
      console.log("shiftassignResp",shiftassignResp);
      if (shiftassignResp == 3000)
      {
        Swal.fire({
          title: "Record Updated successfully",
          icon: "success",
          showConfirmButton :false,
          timer: 1000
        });
      }
      else
      {
        Swal.fire({
          title: "Record not Updated successfully",
          icon: "error",
          showConfirmButton :false,
          timer: 1000
        });
      }
      var popup = document.querySelector('.overlay');
      popup.style.display = 'none';
      $(".EMP_tr").remove();
      $(".EMP_tr1").remove();
      $(".empty").remove();
      FilterSPFunc(carerData,clientData,carefacilitatorData);
    });
  }
  else if (mainform_ID !=0)
  {
    formData = {
      "data" : {
      "Clients":client_id,
      "Shift": Shift_id,
      "Employee_Shift":mainform_ID
      }
    };
    CreateShiftAssignFunc(formData).then(shiftassignResp=>{
      console.log("shiftassignResp",shiftassignResp);
      if (shiftassignResp == 3000)
      {
        Swal.fire({
          title: "Record Updated successfully",
          icon: "success",
          showConfirmButton :false,
          timer: 1000
        });
      }
      else
      {
        Swal.fire({
          title: "Record not Updated successfully",
          icon: "error",
          showConfirmButton :false,
          timer: 1000
        });
      }
      var popup = document.querySelector('.overlay');
      popup.style.display = 'none';
      $(".EMP_tr").remove();
      $(".EMP_tr1").remove();
      $(".empty").remove();
      FilterSPFunc(carerData,clientData,carefacilitatorData);
    });

  }
});
// Page popup script save button part ends here

// Page popup script delete button part starts
$(document).delegate('.del_btn', 'click', function(){
  console.log("Employee_Shift_List:",Employee_Shift_List);
  // ****** dropdown value ******
  var carerData=$("#dropdownname_cr option:selected").attr("carer_name") ||0;
  var clientData=$("#dropdownname_cl option:selected").attr("client_name") ||0;
  var carefacilitatorData=$("#dropdownname_cf option:selected").attr("care_facilitier_name") ||0;
  // ****** dropdown value ******
  var subformID = $("#recid").val();
  var st_date = $("#st_date_emp").val();
  var ed_date = $("#ed_date_emp").val();
  var client_id = $("#dropdownname_cl_popup option:selected").attr("cl_rec_id");
  var carer_id = $("#dropdownname_cr_popup option:selected").attr("cr_rec_id");
  var carerName = $("#dropdownname_cr_popup option:selected").attr("carer_name");
  console.log("carerName:",carerName);
  var Shift_id =  $("#dropdownname_sht option:selected").attr("shift_rec_id");
  var ShiftName =  $("#dropdownname_sht option:selected").attr("shift_name");
  var s_date = moment(st_date).format("YYYY-MM-DD");
  var e_date = moment(ed_date).format("YYYY-MM-DD");
  const format = 'DD-MMM-YYYY'; // Desired format
  const date1 = new Date(s_date);
  const date2 = new Date(e_date);
  const differenceMs = Math.abs(date2 - date1);
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.floor(differenceMs / millisecondsInDay);
  // console.log(daysDifference);
  function getDatesFormatted(startDate, endDate, format) {
    const dates = [];
    let currentDate = moment(startDate);
    
    while (currentDate <= moment(endDate)) {
      dates.push(currentDate.format(format));
      currentDate.add(1, 'days');
    }
    
    return dates;
  }
  const datesInRangeFormatted = getDatesFormatted(s_date, e_date, format);
  const lengthTotal=datesInRangeFormatted.length;
  for(var dat in datesInRangeFormatted)
  {
    var dates1 = datesInRangeFormatted[dat];
    console.log("dates1:",dates1);
    var record_count=0;
    // script part to find records to delete
    const foundItems = findDateInRangeDelete(Employee_Shift_List, dates1,carerName,ShiftName);
    console.log("foundItems:",foundItems);
    DeleteShiftAssignFunc(dates1,carerName,ShiftName).then(DeleShiftAssigntResp=>{
      console.log("DeleShiftAssigntResp",DeleShiftAssigntResp);
      record_count++;
      console.log("record_count:",record_count);
      console.log("lengthTotal:",lengthTotal);
      if (parseInt(record_count) == parseInt(lengthTotal))
      {
        Swal.fire({
          title: "Record Deleted successfully",
          icon: "success",
          showConfirmButton :false,
          timer: 1000
        });
        var popup = document.querySelector('.overlay');
        popup.style.display = 'none';
        $(".EMP_tr").remove();
        $(".EMP_tr1").remove();
        $(".empty").remove();
        FilterSPFunc(carerData,clientData,carefacilitatorData);
      }
    }); 
  }
});
// Page popup script delete button part ends
// ************************************************************************************
