$(document).delegate('.carerdataDD, .clientdataDD', 'change', function(){
    console.log("Carer dropdown changed");
    // $(".EMP_tr").remove();
    // $(".EMP_tr1").remove();
    // $(".empty").remove();
      
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
    console.log("filteredData:",resultData);
    console.log("result length:",resultData.length);
  
    if (resultData.length>0)
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
  
      $(".EMP_tr").remove();
      $(".EMP_tr1").remove();
      $(".empty").remove();
      var uniqueDataArr = [];
      var newCarerArray =[];
      var uniqueDataArrsp=[];
  
      resultData.forEach(element=>{
        var jsonObject = JSON.parse(element);
        // console.log("jsonObject:",jsonObject);
        var propertiesToCheckcarefaci = ['carername', 'carefaciname'];
        var propertiesToCheck = ['carername', 'clientname'];
        // **** Carer Data and Care Facilitator data script part ****
        if (checkProperties(jsonObject, propertiesToCheckcarefaci))
        {
          var carerName = jsonObject.carername;
          var carefaciName = jsonObject.carefaciname;
          var keyProperties = ['carerName', 'care_facilitator'];
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
        else
        {
          console.log("carername not found");
        }
      });
      console.log("uniqueDataArr:",uniqueDataArrsp);
      console.log("newCarerArray:",newCarerArray);
      const newCarerArrVal=filterObjectsByCarerName(uniqueDataArrsp, newCarerArray);
      console.log("newCarerArrval:",newCarerArrVal);
      if (uniqueDataArr.length > 0)
      {
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
          const empName = Empelement.carerName;
          const tr2 = document.createElement('tr');
          tr2.className = "EMP_tr";
          tr2.innerText =empName;
          const td = document.createElement('td');
          $("#emp_tr").prepend(tr2);
        });
        uniqueDataArr.reverse().forEach(Empelement => {
          const empName = Empelement.carerName;
          const clientName = Empelement.clientName;
          const carefaciName = Empelement.care_facilitator;
          const carerData = Empelement.carerData;
          const clientData = Empelement.clientData;
          const carefaciData = Empelement.carefaciData;
          PostShiftFun(Employee_Shift_List,empName,clientName,carefaciName,carerData,clientData,carefaciData);
        });
        if (newCarerArrVal.length>0)
        {
          newCarerArrVal.reverse().forEach(carerelement => {
            const empName = carerelement.carerName;
            PostEmptyShiftFunc(empName);
          });
        }
      }
      else
      {
        console.log("newCarerArrInside:",newCarerArrVal);
        console.log("****** no record found ******");
        if (newCarerArrVal.length>0)
        {
          console.log("newCarerArray:",newCarerArray);
          newCarerArrVal.forEach(carerelement => {
            console.log("carerelement val:",carerelement);
            const empName = carerelement.carerName;
            const tr2 = document.createElement('tr');
            tr2.className = "EMP_tr";
            tr2.innerText =empName;
            const td = document.createElement('td');
            $("#emp_tr").prepend(tr2);
          });
          // newCarerArray.reverse().forEach(carerelement => {
          //   const empName = carerelement[0].carerName;
          //   PostEmptyShiftFunc(empName);
          // });
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
      console.log("No data selected");
    }
    var tr1 = document.createElement('div');
    tr1.className = "empty";
    tr1.innerHTML = "Thoughtlogik";
    $("#emp_tr").prepend(tr1);
  
  });